import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { signal } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { SearchPage } from '@features/search/search.page';
import { MusicPlayerService } from '@core/services/music-player.service';
import { SearchService } from '@core/services/search.service';
import { isMobileService } from '@core/services/isMobile.service';
import { CatalogResponse } from '@shared/interfaces/catalog.interface';
import { Track } from '@shared/interfaces/track.interface';

describe('Search Page', () => {
  let component: SearchPage;
  let fixture: ComponentFixture<SearchPage>;
  let searchService: SearchService;
  let queryParamMap$: BehaviorSubject<Map<string, string>>;

  beforeEach(async () => {
    queryParamMap$ = new BehaviorSubject(new Map<string, string>());
    await TestBed.configureTestingModule({
      imports: [SearchPage],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: queryParamMap$.asObservable(),
          },
        },
        {
          provide: MusicPlayerService,
          useValue: {
            playQueue: vi.fn(),
            currentTrack: vi.fn(),
            isPlaying: vi.fn(),
          },
        },
        {
          provide: SearchService,
          useValue: {
            fetchTracks: vi.fn(() => of({ data: [] })),
          },
        },
        { provide: isMobileService, useValue: { isMobile: signal(false) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchPage);
    component = fixture.componentInstance;

    searchService = TestBed.inject(SearchService);
  });

  describe('logic', () => {
    it('should initialize search from query param', () => {
      vi.spyOn(component, 'search');

      queryParamMap$.next(new Map([['q', 'metal']]));

      component.ngOnInit();

      expect(component.query()).toBe('metal');

      expect(component.search).toHaveBeenCalledWith('metal', true);
    });

    it('should not search if query and genres are empty', () => {
      vi.spyOn(searchService, 'fetchTracks');

      component.search('');

      expect(searchService.fetchTracks).not.toHaveBeenCalled();
    });

    it('should fetch tracks and update state', () => {
      const tracks = [
        {
          id: '1',
          name: 'Metal song',
        },
      ] as Track[];

      vi.spyOn(searchService, 'fetchTracks').mockReturnValue(
        of({
          data: tracks,
          meta: {},
        } as CatalogResponse<Track>),
      );

      component.search('metal', true);

      expect(searchService.fetchTracks).toHaveBeenCalledWith({
        search: 'metal',
        offset: 0,
        limit: 20,
        tags: [],
      });

      expect(component.rawTracks()).toEqual(tracks);

      expect(component.hasMoreTracks()).toBe(false);
    });

    it('should reset tracks before new search', () => {
      component.rawTracks.set([{ id: 'old' } as Track]);

      vi.spyOn(searchService, 'fetchTracks').mockReturnValue(
        of({
          data: [] as Track[],
          meta: {
            results_count: 0,
            has_more: false,
            next: null,
          },
        } as CatalogResponse<Track>),
      );

      component.search('rock', true);

      expect(component.rawTracks()).toEqual([]);
    });

    it('should stop loading on error', () => {
      vi.spyOn(searchService, 'fetchTracks').mockReturnValue(throwError(() => new Error()));

      component.search('metal');

      expect(component.loading()).toBe(false);
    });

    it('should call search when loadMore called', () => {
      vi.spyOn(component, 'search');

      component.loading.set(false);
      component.hasMoreTracks.set(true);
      component.query.set('metal');

      component.loadMore();

      expect(component.search).toHaveBeenCalledWith('metal', false);
    });

    it('should append tracks when reset is false', () => {
      component.rawTracks.set([{ id: '1', name: 'Track 1' } as Track]);

      vi.spyOn(searchService, 'fetchTracks').mockReturnValue(
        of({
          data: [{ id: '2', name: 'Track 2' } as Track],
          meta: {
            results_count: 0,
            has_more: false,
            next: null,
          },
        }),
      );

      component.search('metal', false);

      expect(component.rawTracks()).toEqual([
        { id: '1', name: 'Track 1' },
        { id: '2', name: 'Track 2' },
      ]);
    });

    it('should not call search when loading', () => {
      vi.spyOn(component, 'search');

      component.loading.set(true);
      component.hasMoreTracks.set(true);

      component.loadMore();

      expect(component.search).not.toHaveBeenCalled();
    });

    it('should not call search when there are no more tracks', () => {
      vi.spyOn(component, 'search');

      component.loading.set(false);
      component.hasMoreTracks.set(false);

      component.loadMore();

      expect(component.search).not.toHaveBeenCalled();
    });
  });

  describe('template', () => {
    beforeEach(() => {
      vi.spyOn(component, 'ngOnInit').mockImplementation(() => {
        /* empty */
      });
    });
    it('should show initial empty state', () => {
      fixture.detectChanges();

      expect(fixture.nativeElement.textContent).toContain('Find your music');
    });

    it('should show loading state as skeleton', () => {
      vi.spyOn(searchService, 'fetchTracks').mockReturnValue(
        new Observable(() => {
          /* empty */
        }),
      );

      // queryParamMap$.next(new Map([['q', 'metal']]));

      fixture.detectChanges();
      component.search('metal', true);
      fixture.detectChanges();

      // expect(fixture.nativeElement.textContent).toContain('Searching...');
      expect(fixture.debugElement.query(By.css('app-search-skeleton'))).toBeTruthy();
    });

    it('should show no results state', () => {
      vi.spyOn(searchService, 'fetchTracks').mockReturnValue(
        of({
          data: [] as Track[],
          meta: {
            results_count: 0,
            has_more: false,
            next: null,
          },
        } as CatalogResponse<Track>),
      );

      queryParamMap$.next(new Map([['q', 'metal']]));

      fixture.detectChanges();

      expect(fixture.nativeElement.textContent).toContain('No results found');
    });

    it('should render tracks', () => {
      vi.spyOn(searchService, 'fetchTracks').mockReturnValue(
        of({
          data: [
            {
              id: '1',
              name: 'Track 1',
              duration: 100,
              artist_name: 'Artist',
              releasedate: '2025-01-01',
            },
            {
              id: '2',
              name: 'Track 2',
              duration: 200,
              artist_name: 'Artist',
              releasedate: '2025-01-01',
            },
          ] as Track[],
          meta: {},
        } as CatalogResponse<Track>),
      );

      queryParamMap$.next(new Map([['q', 'metal']]));

      fixture.detectChanges();

      expect(fixture.debugElement.queryAll(By.css('app-track'))).toHaveLength(2);
    });

    it('should show load more button when more tracks available', () => {
      vi.spyOn(searchService, 'fetchTracks').mockReturnValue(
        of({
          data: Array.from({ length: 20 }, (_, i) => ({
            id: `${i}`,
            name: `Track ${i}`,
            duration: 100,
            artist_name: 'Artist',
            releasedate: '2025-01-01',
          })) as Track[],
          meta: {},
        } as CatalogResponse<Track>),
      );

      queryParamMap$.next(new Map([['q', 'metal']]));

      fixture.detectChanges();

      expect(fixture.nativeElement.textContent).toContain('Load more');
    });

    it('should hide load more button when no more tracks', () => {
      component.hasMoreTracks.set(false);

      fixture.detectChanges();

      expect(fixture.nativeElement.textContent).not.toContain('Load more');
    });

    it('should call loadMore when button clicked', () => {
      const loadMoreSpy = vi.spyOn(component, 'loadMore');

      vi.spyOn(searchService, 'fetchTracks').mockReturnValue(
        of({
          data: Array.from({ length: 20 }, (_, i) => ({
            id: `${i}`,
            name: `Track ${i}`,
            duration: 100,
            artist_name: 'Artist',
            releasedate: '2025-01-01',
          })) as Track[],
          meta: {},
        } as CatalogResponse<Track>),
      );

      queryParamMap$.next(new Map([['q', 'metal']]));

      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('app-submit-button'));

      button.triggerEventHandler('click');

      expect(loadMoreSpy).toHaveBeenCalled();
    });
  });
});
