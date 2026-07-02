import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicPlayerService } from '@core/services/music-player.service';
import { ControlsBarComponent } from './controls-bar.component';

describe('ControlsBarComponent', () => {
  let component: ControlsBarComponent;
  let fixture: ComponentFixture<ControlsBarComponent>;

  const playerServiceMock = {
    currentTime: signal(0),
    duration: signal(0),
    seekTo: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlsBarComponent],
      providers: [{ provide: MusicPlayerService, useValue: playerServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ControlsBarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
