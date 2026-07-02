import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { signal } from '@angular/core';

import { MusicPlayerService } from '@core/services/music-player.service';
import { isMobileService } from '@core/services/isMobile.service';

import { TrackCardsComponent } from '@shared/components/track-cards/track-cards.component';
import { Track } from '@shared/interfaces/track.interface';

const tracks: Track[] = [
  { id: '1', name: 'Track 1' } as Track,
  { id: '2', name: 'Track 2' } as Track,
  { id: '3', name: 'Track 3' } as Track,
];

describe('TrackCardsComponent', () => {
  let component: TrackCardsComponent;
  let fixture: ComponentFixture<TrackCardsComponent>;

  let playerService: {
    playQueue: ReturnType<typeof vi.fn>;
    togglePlay: ReturnType<typeof vi.fn>;
    currentTrack: ReturnType<typeof vi.fn>;
    isPlaying: ReturnType<typeof vi.fn>;
  };

  const isMobileServiceMock = {
    isMobile: signal(false),
  };

  beforeEach(async () => {
    playerService = {
      playQueue: vi.fn(),
      togglePlay: vi.fn(),
      currentTrack: vi.fn(),
      isPlaying: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [TrackCardsComponent],
      providers: [
        {
          provide: MusicPlayerService,
          useValue: playerService,
        },
        {
          provide: isMobileService,
          useValue: isMobileServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TrackCardsComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('tracks', tracks);
    fixture.detectChanges();
  });

  describe('Logic', () => {
    it('should toggle play when clicked track is current', () => {
      playerService.currentTrack.mockReturnValue(tracks[1]);

      component.togglePlay(tracks[1]);

      expect(playerService.togglePlay).toHaveBeenCalledTimes(1);

      expect(playerService.playQueue).not.toHaveBeenCalled();
    });

    it('should play queue when clicked track is not current', () => {
      playerService.currentTrack.mockReturnValue(tracks[0]);

      component.togglePlay(tracks[2]);

      expect(playerService.playQueue).toHaveBeenCalledTimes(1);

      expect(playerService.togglePlay).not.toHaveBeenCalled();
    });

    it('should pass correct queue and index to playQueue', () => {
      playerService.currentTrack.mockReturnValue(tracks[0]);

      component.togglePlay(tracks[2]);

      expect(playerService.playQueue).toHaveBeenCalledWith(tracks, 2);
    });
  });

  describe('Template', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should render tracks', () => {
      const cards = fixture.nativeElement.querySelectorAll('.track-cards__content-card');

      expect(cards.length).toBe(3);
    });

    it('should show title when provided', () => {
      fixture.componentRef.setInput('title', 'Popular tracks');

      fixture.detectChanges();

      const title = fixture.nativeElement.querySelector('.track-cards__title');

      expect(title.textContent).toContain('Popular tracks');
    });

    it('should not show title when empty', () => {
      const title = fixture.nativeElement.querySelector('.track-cards__title');

      expect(title).toBeNull();
    });

    it('should show desktop cover card on desktop', () => {
      isMobileServiceMock.isMobile.set(false);

      fixture.detectChanges();

      const desktopCard = fixture.debugElement.query(By.css('app-cover-card'));

      const mobileCard = fixture.debugElement.query(By.css('app-mobile-cover-card'));

      expect(desktopCard).toBeTruthy();
      expect(mobileCard).toBeNull();
    });

    it('should show mobile cover card on mobile', () => {
      isMobileServiceMock.isMobile.set(true);

      fixture.detectChanges();

      const desktopCard = fixture.debugElement.query(By.css('app-cover-card'));

      const mobileCard = fixture.debugElement.query(By.css('app-mobile-cover-card'));

      expect(mobileCard).toBeTruthy();
      expect(desktopCard).toBeNull();
    });

    it('should call togglePlay when play button emits', () => {
      vi.spyOn(component, 'togglePlay');

      const playButton = fixture.debugElement.query(By.css('app-play-button'));

      playButton.triggerEventHandler('playToggle', null);

      expect(component.togglePlay).toHaveBeenCalledWith(tracks[0]);
    });

    it('should pass playing state to play button', () => {
      playerService.currentTrack.mockReturnValue({
        id: '1',
      });

      playerService.isPlaying.mockReturnValue(true);

      fixture = TestBed.createComponent(TrackCardsComponent);
      component = fixture.componentInstance;

      fixture.componentRef.setInput('tracks', tracks);

      fixture.detectChanges();

      const buttons = fixture.debugElement.queryAll(By.css('app-play-button'));

      expect(buttons[0].componentInstance.playing()).toBe(true);
    });
  });
});
