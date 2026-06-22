import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Input,
  model,
  output,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibraryService } from '@core/services/library.service';
import { SearchService } from '@core/services/search.service';
import { HistoryRequest } from '@shared/interfaces/history';
import { Message } from '@shared/interfaces/message';
import { PlaylistResponse } from '@shared/interfaces/playlist.interface';
import { Track } from '@shared/interfaces/track.interface';
import { toHistoryRequest } from '@shared/utils/toHistorRequest';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { TextareaModule } from 'primeng/textarea';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-playlist-form',
  imports: [
    ButtonModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    TextareaModule,
    MessageModule,
  ],
  templateUrl: './playlist-form.component.html',
  styleUrl: './playlist-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistFormComponent {
  private readonly libraryService = inject(LibraryService);
  private readonly fb = inject(FormBuilder);
  private readonly searchService = inject(SearchService);

  private _playlist: PlaylistResponse | null = null;

  readonly visible = model<boolean>(false);
  readonly created = output<PlaylistResponse>();
  readonly updated = output<PlaylistResponse>();
  readonly toast = output<Message>();

  readonly isLoading = signal<boolean>(false);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.maxLength(200)]],
  });

  readonly selectedTracks = signal<HistoryRequest[]>([]);
  readonly tracksValid = computed(() => this.selectedTracks().length >= 1);

  readonly queryInput = signal('');
  readonly query = toSignal(
    toObservable(this.queryInput).pipe(debounceTime(300), distinctUntilChanged()),
    { initialValue: '' },
  );

  readonly searchResource = this.searchService.searchTracks(this.query);

  readonly searchResults = computed(() => {
    const added = new Set(this.selectedTracks().map((t) => t.track_id));
    return (this.searchResource.value()?.data ?? []).filter((t) => !added.has(t.id));
  });

  @Input()
  set playlist(value: PlaylistResponse | null) {
    this._playlist = value;

    if (this._playlist) {
      this.form.setValue({
        name: this._playlist.name,
        description: this._playlist.description ?? '',
      });
      this.selectedTracks.set((this._playlist.tracks ?? []).map((t) => toHistoryRequest(t)));
    } else {
      this.clearForm();
    }
  }

  get playlist(): PlaylistResponse | null {
    return this._playlist;
  }

  get name() {
    return this.form.controls.name;
  }

  get description() {
    return this.form.controls.description;
  }

  onSearchInput(value: string): void {
    this.queryInput.set(value);
  }

  addTrack(track: Track): void {
    const mapped = toHistoryRequest(track);
    this.selectedTracks.update((list) =>
      list.some((t) => t.track_id === mapped.track_id) ? list : [...list, mapped],
    );
  }

  removeTrack(trackId: string): void {
    this.selectedTracks.update((list) => list.filter((t) => t.track_id !== trackId));
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid || !this.tracksValid()) {
      this.form.markAllAsTouched();
      return;
    }

    const editing = this.playlist;

    try {
      this.isLoading.set(true);

      const payload = {
        ...this.form.getRawValue(),
        tracks: this.selectedTracks(),
      };

      if (editing) {
        const updated = await this.libraryService.updatePlaylist(editing.id, payload);

        this.updated.emit(updated);

        this.toast.emit({
          severity: 'success',
          summary: 'Success',
          detail: 'Playlist updated',
        });
      } else {
        const playlist = await this.libraryService.createPlaylistWithTracks(payload);

        this.created.emit(playlist);

        this.toast.emit({
          severity: 'success',
          summary: 'Success',
          detail: 'Playlist created',
        });
      }

      this.reset();
    } catch {
      this.toast.emit({
        severity: 'error',
        summary: 'Error',
        detail: editing ? 'Failed to update playlist' : 'Failed to create playlist',
      });
    } finally {
      this.isLoading.set(false);
    }
  }

  clearForm(): void {
    this.form.reset();
    this.queryInput.set('');
    this.selectedTracks.set([]);
  }

  reset(): void {
    this.visible.set(false);
    this.clearForm();
  }
}
