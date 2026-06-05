import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogCardComponent } from './catalog-card.component';

describe('CatalogCardComponent', () => {
  let component: CatalogCardComponent;
  let fixture: ComponentFixture<CatalogCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
