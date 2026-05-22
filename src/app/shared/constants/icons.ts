import {
  LucideBell,
  LucideHeart,
  LucideHouse,
  LucideLibraryBig,
  LucideListMusic,
  LucidePause,
  LucidePlay,
  LucideRepeat,
  LucideRepeat1,
  LucideSearch,
  LucideSettings,
  LucideShuffle,
  LucideSkipBack,
  LucideSkipForward,
  LucideUser,
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
  bell: {
    icon: LucideBell,
    label: 'Notifications',
  },
  house: {
    icon: LucideHouse,
    label: 'Home',
  },
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
  library: {
    icon: LucideLibraryBig,
    label: 'Library List',
  },
  search: {
    icon: LucideSearch,
    label: 'Search',
  },
  settings: {
    icon: LucideSettings,
    label: 'Settings',
  },
  user: {
    icon: LucideUser,
    label: 'Profile',
  },
} as const satisfies Record<string, IconConfig>;

export type IconKey = keyof typeof ICONS;
