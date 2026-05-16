import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeComponent } from './volume.component';

describe('VolumeComponent', () => {
  let component: VolumeComponent;
  let fixture: ComponentFixture<VolumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolumeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VolumeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
