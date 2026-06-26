import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { HomePage } from '@features/home/home.page';
import { HomeService } from '@core/services/home.service';

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomePage>;
  let component: HomePage;
  let httpTestingController: HttpTestingController;
  let homeService: HomeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;

    httpTestingController = TestBed.inject(HttpTestingController);
    homeService = TestBed.inject(HomeService);

    vi.spyOn(homeService, 'getTracksUrl').mockReturnValue('/tracks');
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('Trending tracks resource', () => {
    it('should load trending tracks with correct params', () => {
      component.limit.set(10);
      component.offset.set(0);

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

      expect(component.trendingTracksResource.value()?.data.length).toBe(1);
    });

    it('should reload tracks when offset changes', () => {
      fixture.detectChanges();

      let req = httpTestingController.expectOne((request) => request.params.get('offset') === '0');

      req.flush({
        data: [],
        meta: {},
      });

      component.offset.set(20);

      fixture.detectChanges();

      req = httpTestingController.expectOne((request) => request.params.get('offset') === '20');

      req.flush({
        data: [],
        meta: {},
      });
    });
  });
});
