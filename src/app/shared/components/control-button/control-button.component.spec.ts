import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconKey } from '@shared/constants/icons';

import { ControlButtonComponent } from './control-button.component';

describe('ControlButtonComponent', () => {
  let component: ControlButtonComponent;
  let fixture: ComponentFixture<ControlButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ControlButtonComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('icon', 'arrowBigLeft' as IconKey);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
