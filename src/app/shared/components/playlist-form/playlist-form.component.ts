import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  model,
  output,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibraryService } from '@core/services/library.service';
import { Message } from '@shared/interfaces/message';
import { PlaylistResponse } from '@shared/interfaces/playlist.interface';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-playlist-form',
  imports: [ButtonModule, ReactiveFormsModule, FloatLabelModule, InputTextModule, TextareaModule],
  templateUrl: './playlist-form.component.html',
  styleUrl: './playlist-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistFormComponent {
  private readonly libraryService = inject(LibraryService);
  private readonly fb = inject(FormBuilder);

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

  @Input()
  set playlist(value: PlaylistResponse | null) {
    this._playlist = value;

    if (this._playlist) {
      this.form.setValue({
        name: this._playlist.name,
        description: this._playlist.description ?? '',
      });
    } else {
      this.form.reset();
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

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { name, description } = this.form.getRawValue();
    const editing = this.playlist;

    try {
      this.isLoading.set(true);

      if (editing) {
        const updated = await this.libraryService.updatePlaylist(editing.id, { name, description });

        this.updated.emit(updated);

        this.toast.emit({
          severity: 'success',
          summary: 'Success',
          detail: 'Playlist updated',
        });
      } else {
        const playlist = await this.libraryService.createPlaylist({ name, description });
        this.created.emit(playlist);

        this.toast.emit({
          severity: 'success',
          summary: 'Success',
          detail: 'Playlist created',
        });
      }

      this.visible.set(false);
      this.form.reset();
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
}
