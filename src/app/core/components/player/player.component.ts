import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MusicPlayerService } from '@core/services/music-player.service';
import { ControlButtonComponent } from '@shared/components/control-button/control-button.component';
import { ControlsBarComponent } from '@shared/components/controls-bar/controls-bar.component';
import { MetaComponent } from '@shared/components/meta/meta.component';
import { VolumeComponent } from '@shared/components/volume/volume.component';

@Component({
  selector: 'app-player',
  imports: [VolumeComponent, ControlsBarComponent, MetaComponent, ControlButtonComponent],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent {
  private readonly playerService = inject(MusicPlayerService);

  // * я тут использую `computed` для создания реактивных свойств. Если использовать `signal`, то нужно будет обрабатывать изменения вручную
  protected readonly title = computed(
    () => this.playerService.currentTrack()?.name ?? 'Unknown song',
  );
  protected readonly primaryDesc = computed(
    () => this.playerService.currentTrack()?.artist_name ?? 'Unknown artist',
  );
  protected readonly isActive = computed(() => this.playerService.isPlaying());

  // * описание ниже!
  protected readonly isFavorite = signal<boolean>(false);

  onPlayToggle(): void {
    this.playerService.togglePlay();
  }

  /** todo: `isFavorite` и `toggleFavorite` - Это временная заглушка. нужно будет перенести в MusicPlayerService
   *
   * Бэкенд у нас уже имеет полный favorites API (`addFavorite`, `removeFavorite`, `isFavorite` по `trackId`). Но сейчас у нас нет
   * `FavoritesService` на фронтенде, который бы с этим API работал. Локальный signal<boolean>(false) просто визуальная заглушка.
   *
   * В будущем схема должна быть такой: когда меняется currentTrack в MusicPlayerService, то делаем запрос GET
   * `/favorites/:trackId/check`, потом обновляем состояние сердечка. Это отдельная задача.*/
  toggleFavorite(): void {
    this.isFavorite.update((v) => !v);
  }
}
