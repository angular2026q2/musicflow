import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CatalogCardComponent } from './catalog-card.component';

describe('CatalogCardComponent', () => {
  let component: CatalogCardComponent;
  let fixture: ComponentFixture<CatalogCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('route', '/albums');
    fixture.componentRef.setInput('data', { id: '1', name: 'Test Album' });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
