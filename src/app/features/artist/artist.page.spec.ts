import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { MusicPlayerService } from '@core/services/music-player.service';
import { ArtistPage } from './artist.page';

describe('ArtistPage', () => {
  let component: ArtistPage;
  let fixture: ComponentFixture<ArtistPage>;

  const musicPlayerServiceMock = {
    isPlaying: vi.fn().mockReturnValue(false),
    currentTrack: vi.fn().mockReturnValue(null),
    togglePlay: vi.fn(),
    playQueue: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistPage],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: MusicPlayerService, useValue: musicPlayerServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistPage);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', '123456');
    fixture.detectChanges();
  });

  it('should create Artist page', () => {
    expect(component).toBeTruthy();
  });
});
