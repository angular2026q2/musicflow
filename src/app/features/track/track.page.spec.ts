import { vi } from 'vitest';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { isMobileService } from '@core/services/isMobile.service';
import { MusicPlayerService } from '@core/services/music-player.service';

import { TrackPage } from './track.page';

describe('PlayerPage', () => {
  let fixture: ComponentFixture<TrackPage>;
  let component: TrackPage;

  beforeEach(async () => {
    const musicPlayerServiceMock = {
      currentTrack: vi.fn().mockReturnValue(null),
      isPlaying: vi.fn().mockReturnValue(false),
      isShuffle: vi.fn().mockReturnValue(false),
      repeatMode: vi.fn().mockReturnValue('none'),
      queue: vi.fn().mockReturnValue([]),

      togglePlay: vi.fn(),
      playTrack: vi.fn(),
      playQueue: vi.fn(),
      previous: vi.fn(),
      next: vi.fn(),
      toggleShuffle: vi.fn(),
      toggleRepeat: vi.fn(),
    };
    const isMobileServiceMock = {
      isMobile: signal(false),
    };
    await TestBed.configureTestingModule({
      imports: [TrackPage],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: MusicPlayerService, useValue: musicPlayerServiceMock },
        { provide: isMobileService, useValue: isMobileServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TrackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
