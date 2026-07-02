import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { LibraryService } from '@core/services/library.service';
import { SearchService } from '@core/services/search.service';
import { PlaylistFormComponent } from './playlist-form.component';

describe('PlaylistFormComponent', () => {
  let component: PlaylistFormComponent;
  let fixture: ComponentFixture<PlaylistFormComponent>;

  const libraryServiceMock = {
    createPlaylistWithTracks: vi.fn(),
    updatePlaylist: vi.fn(),
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
      imports: [PlaylistFormComponent],
      providers: [
        { provide: LibraryService, useValue: libraryServiceMock },
        { provide: SearchService, useValue: searchServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Playlist Form component', () => {
    expect(component).toBeTruthy();
  });
});
