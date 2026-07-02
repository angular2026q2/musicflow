import { TestBed } from '@angular/core/testing';

import { LibraryService } from './library.service';
import { MusicPlayerService } from './music-player.service';

describe('MusicPlayerService', () => {
  let service: MusicPlayerService;
  const libraryServiceMock = {
    incrementPlayCount: vi.fn(),
    addToHistory: vi.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: LibraryService, useValue: libraryServiceMock }],
    });
    service = TestBed.inject(MusicPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
