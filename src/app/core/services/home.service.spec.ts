import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { HomeService } from './home.service';

describe('HomeService', () => {
  let service: HomeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(HomeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get trending tracks with correct params', () => {
    service.getTrendingTracks().subscribe();

    const req = httpMock.expectOne((request) => request.url === '/api/v1/music/tracks');

    expect(req.request.method).toBe('GET');

    expect(req.request.params.get('search')).toBe('?order=popularity_total');

    expect(req.request.params.get('limit')).toBe('15');

    expect(req.request.params.get('offset')).toBe('0');

    req.flush({
      items: [],
    });
  });

  it('should get new releases with correct params', () => {
    service.getNewReleases().subscribe();

    const req = httpMock.expectOne((request) => request.url === '/api/v1/music/tracks');

    expect(req.request.method).toBe('GET');

    expect(req.request.params.get('search')).toBe('?order=releasedate_desc');

    expect(req.request.params.get('limit')).toBe('10');

    expect(req.request.params.get('offset')).toBe('0');

    req.flush({
      items: [],
    });
  });

  it('should get recently played tracks', () => {
    service.getRecentlyPlayed().subscribe();

    const req = httpMock.expectOne('/api/v1/history');

    expect(req.request.method).toBe('GET');

    req.flush([]);
  });
});
