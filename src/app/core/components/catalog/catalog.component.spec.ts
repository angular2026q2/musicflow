import { Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CatalogCardComponent } from '@shared/components/catalog-card/catalog-card.component';
import { ErrorComponent } from '@shared/components/error/error.component';
import { CatalogData } from '@shared/types/catalog-data.types';
import { CatalogComponent } from './catalog.component';
import { CatalogSkeleton } from './skeletons/catalog.skeleton';

@Component({
  selector: 'app-catalog-card',
  standalone: true,
  template: '',
})
class CatalogCardComponentStub {
  readonly data = input.required<CatalogData>();
  readonly route = input.required<string>();
}

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogComponent],
    })
      .overrideComponent(CatalogComponent, {
        remove: {
          imports: [CatalogCardComponent],
        },
        add: {
          imports: [CatalogCardComponentStub],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('title', 'Albums');
    fixture.componentRef.setInput('route', '/albums');
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    fixture.componentRef.setInput('title', 'Albums');

    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('.catalog__title'));

    expect(title.nativeElement.textContent.trim()).toBe('Albums');
  });

  it('should render skeleton when initial loading is true', () => {
    fixture.componentRef.setInput('isInitialLoading', true);
    fixture.componentRef.setInput('items', undefined);
    fixture.componentRef.setInput('error', undefined);

    fixture.detectChanges();

    const skeleton = fixture.debugElement.query(By.directive(CatalogSkeleton));
    const cards = fixture.debugElement.queryAll(By.directive(CatalogCardComponentStub));
    const error = fixture.debugElement.query(By.directive(ErrorComponent));

    expect(skeleton).toBeTruthy();
    expect(cards.length).toBe(0);
    expect(error).toBeFalsy();
  });

  it('should render error component when error exists', () => {
    fixture.componentRef.setInput('isInitialLoading', false);
    fixture.componentRef.setInput('items', undefined);
    fixture.componentRef.setInput('error', new Error('Fail to load'));

    fixture.detectChanges();

    const skeleton = fixture.debugElement.query(By.directive(CatalogSkeleton));
    const cards = fixture.debugElement.queryAll(By.directive(CatalogCardComponentStub));
    const error = fixture.debugElement.query(By.directive(ErrorComponent));

    expect(skeleton).toBeFalsy();
    expect(cards.length).toBe(0);
    expect(error).toBeTruthy();
  });

  it('should render catalog cards when items exist', () => {
    const scrollContainer = document.createElement('div');
    scrollContainer.className = 'app-layout__main';
    document.body.appendChild(scrollContainer);

    const mockItems: CatalogData[] = [
      {
        id: '1',
        name: 'Name',
        releasedate: '2026-06-27',
        artist_id: '007',
        artist_name: 'James Bond',
        image: '',
        zip: '',
        shorturl: '',
        shareurl: '',
        zip_allowed: true,
        type: 'album',
      },
      {
        id: '2',
        name: 'Name2',
        releasedate: '2026-06-27',
        artist_id: '777',
        artist_name: 'Rihanna',
        image: '',
        zip: '',
        shorturl: '',
        shareurl: '',
        zip_allowed: true,
        type: 'album',
      },
    ];

    fixture.componentRef.setInput('isInitialLoading', false);
    fixture.componentRef.setInput('items', mockItems);
    fixture.componentRef.setInput('error', undefined);

    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.directive(CatalogCardComponentStub));

    const skeleton = fixture.debugElement.query(By.directive(CatalogSkeleton));
    const error = fixture.debugElement.query(By.directive(ErrorComponent));

    expect(cards.length).toBe(2);
    expect(skeleton).toBeFalsy();
    expect(error).toBeFalsy();
  });

  it('should render empty state when items are empty', () => {
    fixture.componentRef.setInput('isInitialLoading', false);
    fixture.componentRef.setInput('items', []);
    fixture.componentRef.setInput('error', undefined);

    fixture.detectChanges();

    const empty = fixture.debugElement.query(By.css('.catalog__empty'));
    const cards = fixture.debugElement.queryAll(By.directive(CatalogCardComponentStub));

    expect(empty).toBeTruthy();
    expect(empty.nativeElement.textContent).toContain('Nothing found');
    expect(cards.length).toBe(0);
  });

  it('should render empty state when items are undefined', () => {
    fixture.componentRef.setInput('isInitialLoading', false);
    fixture.componentRef.setInput('items', undefined);
    fixture.componentRef.setInput('error', undefined);

    fixture.detectChanges();

    const empty = fixture.debugElement.query(By.css('.catalog__empty'));

    expect(empty).toBeTruthy();
    expect(empty.nativeElement.textContent).toContain('Nothing found');
  });

  afterAll(() => TestBed.resetTestingModule());
});
