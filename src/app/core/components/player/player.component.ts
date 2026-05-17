import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ControlButtonComponent } from '../../../shared/components/control-button/control-button.component';
import { ControlsBarComponent } from '../../../shared/components/controls-bar/controls-bar.component';
import { MetaComponent } from '../../../shared/components/meta/meta.component';
import { VolumeComponent } from '../../../shared/components/volume/volume.component';

@Component({
  selector: 'app-player',
  imports: [VolumeComponent, ControlsBarComponent, MetaComponent, ControlButtonComponent],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent {
  protected readonly title = signal('Song name');
  protected readonly primaryDesc = signal('Artist name');
  protected readonly isFavorite = signal<boolean>(false);

  protected readonly isActive = signal<boolean>(false);

  toggleFavorite(): void {
    this.isFavorite.update((v) => !v);
  }

  onPlayToggle(isPlaying: boolean): void {
    this.isActive.set(isPlaying);
  }
}
