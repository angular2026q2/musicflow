import { effect, inject, Injectable, signal } from '@angular/core';
import type { Track } from '@shared/interfaces/track.interface';
import { LibraryService } from './library.service';

export type RepeatMode = 'none' | 'one' | 'all';

const REPEAT_NEXT: Record<RepeatMode, RepeatMode> = {
  none: 'all',
  all: 'one',
  one: 'none',
};

/**
 * @description Service responsible for managing music playback state.
 *
 * It handles the current track, queue, playback index, and play/pause state
 * using Angular signals. It provides methods to control playback
 * (play queue, play single track, toggle, next, previous).
 *
 * Exposes readonly signals for consumption by UI components.
 */
@Injectable({
  providedIn: 'root',
})
export class MusicPlayerService {
  private readonly libraryService = inject(LibraryService);

  private readonly audio = new Audio();
  // * эти приватные – только внутри сервиса
  private readonly _currentTrack = signal<Track | null>(null);
  private readonly _queue = signal<Track[]>([]);
  private readonly _currentIndex = signal<number>(0);
  private readonly _isPlaying = signal<boolean>(false);
  private readonly _isShuffle = signal<boolean>(false);
  private readonly _repeatMode = signal<RepeatMode>('none');
  private readonly _currentTime = signal<number>(0);
  private readonly _duration = signal<number>(0);
  private _playCounted = false;

  // * эти внешние - для всех потребителей
  readonly currentTrack = this._currentTrack.asReadonly();
  readonly queue = this._queue.asReadonly();
  readonly currentIndex = this._currentIndex.asReadonly();
  readonly isPlaying = this._isPlaying.asReadonly();
  readonly isShuffle = this._isShuffle.asReadonly();
  readonly repeatMode = this._repeatMode.asReadonly();
  readonly currentTime = this._currentTime.asReadonly();
  readonly duration = this._duration.asReadonly();

  constructor() {
    effect(() => {
      const track = this._currentTrack();
      this._playCounted = false;
      if (track) {
        this.audio.src = track.audio;
        this.audio.play().catch(() => {
          /* empty */
        });
      } else {
        this.audio.pause();
        this.audio.src = '';
      }
    });

    this.audio.addEventListener('timeupdate', () => {
      this._currentTime.set(this.audio.currentTime);

      const threshold = Math.min(30, this.audio.duration * 0.5);

      if (!this._playCounted && this.audio.currentTime >= threshold) {
        const track = this._currentTrack();
        if (track) {
          this._playCounted = true;
          void this.libraryService.incrementPlayCount(track);
        }
      }
    });
    this.audio.addEventListener('loadedmetadata', () => {
      this._duration.set(this.audio.duration);
    });
    this.audio.addEventListener('ended', () => {
      this.handleTrackEnd();
    });
  }

  playQueue(tracks: Track[], startIndex = 0): void {
    this._queue.set(tracks);
    this._currentIndex.set(startIndex);
    this._currentTrack.set(tracks[startIndex] ?? null);
    this._isPlaying.set(true);
    this.libraryService.addToHistory(tracks[startIndex]);
  }

  playTrack(track: Track): void {
    this.playQueue([track], 0);
  }

  togglePlay(): void {
    if (this.audio.paused) {
      this.audio.play().catch(() => {
        /* empty */
      });
      this._isPlaying.set(true);
    } else {
      this.audio.pause();
      this._isPlaying.set(false);
    }
  }

  private handleTrackEnd(): void {
    if (this._repeatMode() === 'one') {
      this.audio.currentTime = 0;
      this.audio.play().catch(() => {
        /* empty */
      });
      return;
    }
    const nextIndex = this._currentIndex() + 1;
    if (nextIndex < this._queue().length) {
      this._currentIndex.set(nextIndex);
      this._currentTrack.set(this._queue()[nextIndex]);
      this._isPlaying.set(true);
    } else if (this._repeatMode() === 'all') {
      this._currentIndex.set(0);
      this._currentTrack.set(this._queue()[0]);
      this._isPlaying.set(true);
    } else {
      this._isPlaying.set(false);
    }
  }

  next(): void {
    const queue = this._queue();
    if (!queue.length) return;

    let nextIndex: number;
    if (this._isShuffle()) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else {
      nextIndex = this._currentIndex() + 1;
      if (nextIndex >= queue.length) {
        if (this._repeatMode() === 'all') {
          nextIndex = 0;
        } else {
          return;
        }
      }
    }
    this._currentIndex.set(nextIndex);
    this._currentTrack.set(queue[nextIndex]);
    this._isPlaying.set(true);
  }

  previous(): void {
    const prev = this._currentIndex() - 1;
    if (prev >= 0) {
      this._currentIndex.set(prev);
      this._currentTrack.set(this._queue()[prev]);
      this._isPlaying.set(true);
    } else if (this._repeatMode() === 'all') {
      const last = this._queue().length - 1;
      this._currentIndex.set(last);
      this._currentTrack.set(this._queue()[last]);
      this._isPlaying.set(true);
    }
  }

  toggleShuffle(): void {
    this._isShuffle.update((v) => !v);
  }

  toggleRepeat(): void {
    this._repeatMode.update((mode) => REPEAT_NEXT[mode]);
  }

  setVolume(value: number): void {
    this.audio.volume = value / 100;
  }

  seekTo(seconds: number): void {
    this.audio.currentTime = seconds;
    this._currentTime.set(seconds);
  }
}
