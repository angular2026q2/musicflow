import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { CatalogService } from '@core/services/catalog.service';
import { AlbumsPage } from './albums.page';

describe('AlbumsPage', () => {
  let component: AlbumsPage;
  let fixture: ComponentFixture<AlbumsPage>;

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
      imports: [AlbumsPage],
      providers: [{ provide: CatalogService, useValue: catalogServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(AlbumsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Albums page', () => {
    expect(component).toBeTruthy();
  });
});
