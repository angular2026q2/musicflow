import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideRouter } from '@angular/router';
import { MusicPlayerService } from '@core/services/music-player.service';

import { PlayerComponent } from './player.component';

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;

  const musicPlayerServiceMock = {
    currentTrack: vi.fn().mockReturnValue({}),
    isPlaying: vi.fn().mockReturnValue(false),
    isShuffle: vi.fn().mockReturnValue(false),
    repeatMode: vi.fn().mockReturnValue('none'),

    currentTime: signal(0),
    duration: signal(0),
    seekTo: vi.fn(),
    setVolume: vi.fn(),
    togglePlay: vi.fn(),
    previous: vi.fn(),
    next: vi.fn(),
    toggleShuffle: vi.fn(),
    toggleRepeat: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerComponent],
      providers: [
        provideRouter([]),
        { provide: MusicPlayerService, useValue: musicPlayerServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
