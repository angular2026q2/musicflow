import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimestepComponent } from './timestep.component';

describe('TimestepComponent', () => {
  let component: TimestepComponent;
  let fixture: ComponentFixture<TimestepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimestepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TimestepComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
