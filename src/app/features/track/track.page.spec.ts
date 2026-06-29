import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackPage } from './track.page';

describe('PlayerPage', () => {
  let component: TrackPage;
  let fixture: ComponentFixture<TrackPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackPage],
    }).compileComponents();

    fixture = TestBed.createComponent(TrackPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
