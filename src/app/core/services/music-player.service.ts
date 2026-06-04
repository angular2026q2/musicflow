import { Injectable, signal } from '@angular/core';
import type { Track } from '@shared/interfaces/track.interface';

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
  // * эти приватные – только внутри сервиса
  private readonly _currentTrack = signal<Track | null>(null);
  private readonly _queue = signal<Track[]>([]);
  private readonly _currentIndex = signal<number>(0);
  private readonly _isPlaying = signal<boolean>(false);

  // * эти внешние - для всех потребителей
  readonly currentTrack = this._currentTrack.asReadonly();
  readonly queue = this._queue.asReadonly();
  readonly currentIndex = this._currentIndex.asReadonly();
  readonly isPlaying = this._isPlaying.asReadonly();

  playQueue(tracks: Track[], startIndex = 0): void {
    this._queue.set(tracks);
    this._currentIndex.set(startIndex);
    this._currentTrack.set(tracks[startIndex] ?? null);
    this._isPlaying.set(true);
  }

  playTrack(track: Track): void {
    this.playQueue([track], 0);
  }

  togglePlay(): void {
    this._isPlaying.update((isPlaying) => !isPlaying);
  }

  next(): void {
    const next = this._currentIndex() + 1;
    if (next < this._queue().length) {
      this._currentIndex.set(next);
      this._currentTrack.set(this._queue()[next]);
    }
  }

  previous(): void {
    const prev = this._currentIndex() - 1;
    if (prev >= 0) {
      this._currentIndex.set(prev);
      this._currentTrack.set(this._queue()[prev]);
    }
  }
}
