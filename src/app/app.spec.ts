import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { signal } from '@angular/core';

import { MusicPlayerService } from '@core/services/music-player.service';
import { LibraryService } from '@core/services/library.service';
import { AuthService } from '@core/services/auth.service';
import { MessageService } from 'primeng/api';
import { isMobileService } from '@core/services/isMobile.service';
import { App } from './app';

describe('App', () => {
  const musicPlayerServiceMock = {
    currentTrack: vi.fn().mockReturnValue(null),
    isPlaying: vi.fn().mockReturnValue(false),
    isShuffle: vi.fn().mockReturnValue(false),
    repeatMode: vi.fn().mockReturnValue('none'),
    queue: vi.fn().mockReturnValue([]),
    currentTime: signal(0),
    duration: signal(0),
    seekTo: vi.fn(),
    setVolume: vi.fn(),
    togglePlay: vi.fn(),
    playQueue: vi.fn(),
    playTrack: vi.fn(),
    previous: vi.fn(),
    next: vi.fn(),
    toggleShuffle: vi.fn(),
    toggleRepeat: vi.fn(),
  };

  const libraryServiceMock = {
    playlists: { value: signal(undefined), reload: vi.fn() },
    history: { value: signal(undefined), reload: vi.fn() },
    addToHistory: vi.fn(),
    incrementPlayCount: vi.fn(),
  };

  const authServiceMock = {
    isAuthenticated: signal(false),
    currentUser: signal(null),
    isGuest: signal(true),
    hasToken: signal(false),
    signIn: vi.fn(),
    signUp: vi.fn(),
    signOut: vi.fn(),
    resetPassword: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        MessageService,
        { provide: MusicPlayerService, useValue: musicPlayerServiceMock },
        { provide: LibraryService, useValue: libraryServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: isMobileService, useValue: { isMobile: signal(false) } },
      ],
    }).compileComponents();
  });

  it('should create App component', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render app layout', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.app-layout')).toBeTruthy();
  });
});
