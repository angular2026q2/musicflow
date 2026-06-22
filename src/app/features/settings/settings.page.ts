import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { STREAMING_QUALITY_OPTIONS } from '@shared/tokens/streaming-quality.token';

import { SelectModule } from 'primeng/select';
import { LucideDynamicIcon } from '@lucide/angular';
import { ICONS } from '@shared/constants/icons';

@Component({
  selector: 'app-settings',
  imports: [FormsModule, SelectModule, LucideDynamicIcon],
  templateUrl: './settings.page.html',
  styleUrl: './settings.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPage {
  readonly qualityOptions = inject(STREAMING_QUALITY_OPTIONS);
  readonly ICONS = ICONS;

  // * -- Audio
  selectedQuality = 'lossless';
  readonly normalizeVolume = signal<boolean>(false);

  // * - Notifications
  readonly notifyNewAlbums = signal<boolean>(true);
  readonly notifyLiveStreams = signal<boolean>(true);
  readonly notifyMarketing = signal<boolean>(false);

  // * -- Privacy
  readonly publicProfile = signal<boolean>(true);
}
