import {
  LucideArrowBigLeft,
  LucideBell,
  LucideClock,
  LucideDownload,
  LucideEllipsis,
  LucideHeart,
  LucideHouse,
  LucideInfo,
  LucideLibraryBig,
  LucideListMusic,
  LucidePause,
  LucidePlay,
  LucideRefreshCcw,
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
  arrowBigLeft: {
    icon: LucideArrowBigLeft,
    label: 'Back',
  },
  bell: {
    icon: LucideBell,
    label: 'Notifications',
  },
  clock: {
    icon: LucideClock,
    label: 'Duration',
  },
  house: {
    icon: LucideHouse,
    label: 'Home',
  },
  info: {
    icon: LucideInfo,
    label: 'About',
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
  retry: {
    icon: LucideRefreshCcw,
    label: 'Retry',
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
  download: {
    icon: LucideDownload,
    label: 'Download',
  },
  moreOptions: {
    icon: LucideEllipsis,
    label: 'More options',
  },
} as const satisfies Record<string, IconConfig>;

export type IconKey = keyof typeof ICONS;
