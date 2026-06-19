import { ChangeDetectionStrategy, Component, inject, model, output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibraryService } from '@core/services/library.service';
import { PlaylistResponse } from '@shared/interfaces/playlist.interface';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-playlist-form',
  imports: [
    ToastModule,
    ButtonModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    TextareaModule,
    FloatLabelModule,
    FormsModule,
  ],
  providers: [MessageService],
  templateUrl: './playlist-form.component.html',
  styleUrl: './playlist-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistFormComponent {
  private readonly libraryService = inject(LibraryService);
  private readonly messageService = inject(MessageService);
  private readonly fb = inject(FormBuilder);

  readonly visible = model<boolean>(false);
  readonly created = output<PlaylistResponse>();

  readonly creationForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.maxLength(200)]],
  });

  get name() {
    return this.creationForm.controls.name;
  }

  get description() {
    return this.creationForm.controls.description;
  }

  async onSubmit(): Promise<void> {
    if (this.creationForm.invalid) {
      this.creationForm.markAllAsTouched();
      return;
    }
    const { name, description } = this.creationForm.getRawValue();

    try {
      const playlist = await this.libraryService.createPlaylist({ name, description });
      this.created.emit(playlist);
      this.visible.set(false);

      this.creationForm.reset();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Created playlist',
      });
    } catch {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to create playlist',
      });
    }
  }
}
