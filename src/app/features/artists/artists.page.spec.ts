import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { CatalogService } from '@core/services/catalog.service';
import { ArtistsPage } from './artists.page';

describe('ArtistsPage', () => {
  let component: ArtistsPage;
  let fixture: ComponentFixture<ArtistsPage>;

  const catalogServiceMock = {
    createCatalog: vi.fn().mockReturnValue({
      data: signal([]),
      isInitialLoading: signal(false),
      error: signal(undefined),
      loadMore: vi.fn(),
      reload: vi.fn(),
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistsPage],
      providers: [{ provide: CatalogService, useValue: catalogServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Artists page', () => {
    expect(component).toBeTruthy();
  });
});
