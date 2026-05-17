import {
  LucideHeart,
  LucideListMusic,
  LucidePause,
  LucidePlay,
  LucideRepeat,
  LucideRepeat1,
  LucideShuffle,
  LucideSkipBack,
  LucideSkipForward,
  LucideVolume1,
  LucideVolume2,
  LucideVolumeX,
} from '@lucide/angular';
import { IconConfig } from '@shared/interfaces/icon-config';

/**
 * Реестр всех иконок проекта.
 * Может использоваться в ControlButtonComponent и других местах, где нужна иконка.
 */

export const ICONS = {
  play: {
    icon: LucidePlay,
    label: 'Play',
  },
  pause: {
    icon: LucidePause,
    label: 'Pause',
  },
  previousTrack: {
    icon: LucideSkipBack,
    label: 'Previous track',
  },
  nextTrack: {
    icon: LucideSkipForward,
    label: 'Next track',
  },
  shuffle: {
    icon: LucideShuffle,
    label: 'Shuffle',
  },
  repeat: {
    icon: LucideRepeat,
    label: 'Repeat',
  },
  repeatOne: {
    icon: LucideRepeat1,
    label: 'Repeat current track',
  },
  volumeOff: {
    icon: LucideVolumeX,
    label: 'Volume off',
  },
  volumeDown: {
    icon: LucideVolume1,
    label: 'Volume down',
  },
  volumeUp: {
    icon: LucideVolume2,
    label: 'Volume up',
  },
  heart: {
    icon: LucideHeart,
    label: 'Add to favorites',
  },
  playlist: {
    icon: LucideListMusic,
    label: 'Playlist',
  },
} as const satisfies Record<string, IconConfig>;

export type IconKey = keyof typeof ICONS;
