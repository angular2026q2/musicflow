import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { LibraryService } from '@core/services/library.service';
import { MusicPlayerService } from '@core/services/music-player.service';
import { SearchService } from '@core/services/search.service';
import { MessageService } from 'primeng/api';
import { PlaylistPage } from './playlist.page';

describe('PlaylistPage', () => {
  let component: PlaylistPage;
  let fixture: ComponentFixture<PlaylistPage>;

  const libraryServiceMock = {
    playlists: {
      value: signal(undefined),
      reload: vi.fn(),
    },
    updatePlaylist: vi.fn(),
    deletePlaylist: vi.fn(),
  };

  const musicPlayerServiceMock = {
    currentTrack: vi.fn().mockReturnValue(null),
    isPlaying: vi.fn().mockReturnValue(false),
    playQueue: vi.fn(),
    togglePlay: vi.fn(),
  };

  const searchServiceMock = {
    searchTracks: vi.fn().mockReturnValue({
      value: signal(undefined),
      isLoading: signal(false),
      error: signal(undefined),
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistPage],
      providers: [
        provideRouter([]),
        { provide: LibraryService, useValue: libraryServiceMock },
        { provide: MusicPlayerService, useValue: musicPlayerServiceMock },
        { provide: SearchService, useValue: searchServiceMock },
        MessageService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistPage);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', '123');
    fixture.detectChanges();
  });

  it('should create Playlist page component', () => {
    expect(component).toBeTruthy();
  });
});
