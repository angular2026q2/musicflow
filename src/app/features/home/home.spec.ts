import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { Router } from '@angular/router';
import { HomePage } from '@features/home/home.page';
import { HomeService } from '@core/services/home.service';
import { MusicPlayerService } from '@core/services/music-player.service';
import { GenreService } from '@core/services/genre.service';
import { AuthService } from '@core/services/auth.service';
import { isMobileService } from '@core/services/isMobile.service';

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { of } from 'rxjs';
import { signal } from '@angular/core';
import { Genre } from '@shared/types/genre.type';
import { RecentTrack } from '@shared/interfaces/recent-track.interface';
import { By } from '@angular/platform-browser';
import { GenresComponent } from './genres/genres.component';

describe('HomePage', () => {
  let fixture: ComponentFixture<HomePage>;
  let component: HomePage;
  let httpTestingController: HttpTestingController;
  let router: Router;
  let playerService: MusicPlayerService;

  let authServiceMock: {
    isAuthenticated: ReturnType<typeof vi.fn>;
  };

  const mockIsMobileService = {
    isMobile: signal(false),
  };

  beforeEach(async () => {
    authServiceMock = {
      isAuthenticated: vi.fn(() => false),
    };

    await TestBed.configureTestingModule({
      imports: [HomePage],

      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        {
          provide: MusicPlayerService,
          useValue: {
            playQueue: vi.fn(),
            currentTrack: vi.fn(),
            isPlaying: vi.fn(),
          },
        },
        {
          provide: HomeService,
          useValue: {
            getTracksUrl: vi.fn(() => '/tracks'),
            getHistoryUrl: vi.fn(() => '/history'),
          },
        },
        {
          provide: GenreService,
          useValue: {
            getGenres: vi.fn(() => of(['Rock', 'Pop'] as Genre[])),
          },
        },
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
        {
          provide: isMobileService,
          useValue: mockIsMobileService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    playerService = TestBed.inject(MusicPlayerService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  const flushTracks = () => {
    httpTestingController
      .match((request) => request.url === '/tracks')
      .forEach((req) => {
        req.flush({
          data: [],
          meta: {},
        });
      });
  };

  describe('logic', () => {
    it('should load trending tracks with correct params', async () => {
      fixture.detectChanges();

      const req = httpTestingController.expectOne(
        (request) =>
          request.url === '/tracks' && request.params.get('search') === '?order=popularity_total',
      );

      expect(req.request.params.get('limit')).toBe('10');
      expect(req.request.params.get('offset')).toBe('0');

      req.flush({
        data: [
          {
            id: '1',
            name: 'Track',
            duration: 200,
          },
        ],
        meta: {},
      });

      const newReleasesReq = httpTestingController.expectOne(
        (request) =>
          request.url === '/tracks' && request.params.get('search') === '?order=releasedate_desc',
      );

      newReleasesReq.flush({
        data: [],
        meta: {},
      });

      await fixture.whenStable();

      expect(component.trendingTracks()).toHaveLength(1);
    });

    it('should load new releases tracks with correct params', async () => {
      fixture.detectChanges();

      const trendingReq = httpTestingController.expectOne(
        (request) =>
          request.url === '/tracks' && request.params.get('search') === '?order=popularity_total',
      );

      trendingReq.flush({
        data: [],
        meta: {},
      });

      const req = httpTestingController.expectOne(
        (request) =>
          request.url === '/tracks' && request.params.get('search') === '?order=releasedate_desc',
      );

      expect(req.request.params.get('limit')).toBe('10');
      expect(req.request.params.get('offset')).toBe('0');

      req.flush({
        data: [
          {
            id: '2',
            name: 'New Track',
            duration: 150,
          },
        ],
        meta: {},
      });

      await fixture.whenStable();

      expect(component.newReleases()).toHaveLength(1);
    });

    it('should not load recent tracks when user is not authenticated', () => {
      authServiceMock.isAuthenticated.mockReturnValue(false);

      fixture.detectChanges();

      httpTestingController.expectNone('/history');

      flushTracks();
    });

    it('should load recent tracks when user is authenticated', async () => {
      authServiceMock.isAuthenticated.mockReturnValue(true);

      fixture.detectChanges();

      const trendingReq = httpTestingController.expectOne(
        (request) =>
          request.url === '/tracks' && request.params.get('search') === '?order=popularity_total',
      );

      trendingReq.flush({
        data: [],
        meta: {},
      });

      const newReleasesReq = httpTestingController.expectOne(
        (request) =>
          request.url === '/tracks' && request.params.get('search') === '?order=releasedate_desc',
      );

      newReleasesReq.flush({
        data: [],
        meta: {},
      });

      const historyReq = httpTestingController.expectOne('/history');

      historyReq.flush([
        {
          id: '1',
          track_name: 'Track',
          duration: 200,
        },
      ]);

      await fixture.whenStable();

      expect(component.recentTracks()).toHaveLength(1);
    });

    it('should navigate to search page with genre', () => {
      const navigateSpy = vi.spyOn(router, 'navigate');

      component.searchByGenre('rock' as Genre);

      expect(navigateSpy).toHaveBeenCalledWith(['/search'], {
        queryParams: {
          tags: 'rock',
        },
      });
    });

    it('should play recent track queue', () => {
      const tracks = [
        {
          id: '1',
          track_name: 'Song 1',
          artist_name: 'Artist',
        },
        {
          id: '2',
          track_name: 'Song 2',
          artist_name: 'Artist',
        },
      ] as RecentTrack[];

      vi.spyOn(component, 'recentTracks').mockReturnValue(tracks);

      const playQueueSpy = vi.spyOn(playerService, 'playQueue');

      component.onTrackPlay(tracks[1]);

      expect(playQueueSpy).toHaveBeenCalledWith(
        [
          expect.objectContaining({
            id: '1',
          }),
          expect.objectContaining({
            id: '2',
          }),
        ],
        1,
      );
    });
  });

  describe('template', () => {
    it('should show loading for trending tracks', () => {
      vi.spyOn(component.trendingTracksResource, 'isLoading').mockReturnValue(true);
      fixture.detectChanges();

      // expect(fixture.nativeElement.textContent).toContain('Loading...');
      expect(fixture.debugElement.query(By.css('p-skeleton'))).toBeTruthy();

      flushTracks();
    });

    it('should show error for trending tracks', async () => {
      fixture.detectChanges();

      const requests = httpTestingController.match((request) => request.url === '/tracks');

      const trendingReq = requests.find(
        (req) => req.request.params.get('search') === '?order=popularity_total',
      );

      const newReleasesReq = requests.find(
        (req) => req.request.params.get('search') === '?order=releasedate_desc',
      );

      trendingReq?.flush(
        {},
        {
          status: 500,
          statusText: 'Server Error',
        },
      );

      newReleasesReq?.flush({
        data: [],
        meta: {},
      });

      await fixture.whenStable();

      fixture.detectChanges();

      expect(fixture.nativeElement.textContent).toContain('Server Error');
    });

    it('should pass genres to GenresComponent', () => {
      fixture.detectChanges();

      const genresComponent = fixture.debugElement.query(By.directive(GenresComponent));

      expect(genresComponent.componentInstance.genres()).toEqual(['Rock', 'Pop']);

      flushTracks();
    });

    it('should not show recently played when user is not authenticated', () => {
      authServiceMock.isAuthenticated.mockReturnValue(false);

      fixture.detectChanges();

      expect(fixture.nativeElement.textContent).not.toContain('Recently Played');

      flushTracks();
    });

    it('should render recent tracks', async () => {
      authServiceMock.isAuthenticated.mockReturnValue(true);

      fixture.detectChanges();

      flushTracks();

      const historyReq = httpTestingController.expectOne('/history');

      historyReq.flush([
        {
          id: '1',
          track_name: 'Song',
          artist_name: 'Artist',
          duration: 200,
        },
      ]);

      await fixture.whenStable();

      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('app-track'))).toBeTruthy();
    });

    it('should play track when recent track emits playTrack', async () => {
      authServiceMock.isAuthenticated.mockReturnValue(true);

      fixture.detectChanges();

      flushTracks();

      const historyReq = httpTestingController.expectOne('/history');

      historyReq.flush([
        {
          id: '1',
          track_name: 'Song',
          artist_name: 'Artist',
          duration: 200,
          album_name: 'Album',
          album_image: '',
          audio: '',
        },
      ]);

      await fixture.whenStable();

      fixture.detectChanges();

      const spy = vi.spyOn(component, 'onTrackPlay');

      const track = fixture.debugElement.query(By.css('app-track'));

      track.triggerEventHandler('playTrack', {
        id: '1',
      });

      expect(spy).toHaveBeenCalled();
    });
  });
});
