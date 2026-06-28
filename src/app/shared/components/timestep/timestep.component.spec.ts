import { ComponentFixture, TestBed } from '@angular/core/testing';

import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MusicPlayerService } from '@core/services/music-player.service';
import { DurationPipe } from '@shared/pipes/duration.pipe';
import { TimestepComponent } from './timestep.component';

describe('TimestepComponent', () => {
  let component: TimestepComponent;
  let fixture: ComponentFixture<TimestepComponent>;

  const DEFAULT_TIME_SECONDS = 65;
  const DEFAULT_DURATION = 180;

  const currentTime = signal(DEFAULT_TIME_SECONDS);
  const duration = signal(DEFAULT_DURATION);

  const playerServiceMock = {
    currentTime,
    duration,
    seekTo: vi.fn(),
  };

  beforeEach(async () => {
    currentTime.set(DEFAULT_TIME_SECONDS);
    duration.set(DEFAULT_DURATION);
    playerServiceMock.seekTo.mockClear();

    await TestBed.configureTestingModule({
      imports: [TimestepComponent],
      providers: [{ provide: MusicPlayerService, useValue: playerServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(TimestepComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose current time and duration values', () => {
    expect(component.formattedCurrentTime()).toBe(65);
    expect(component.formattedDuration()).toBe(180);
  });

  it('should update formatted values when player state changes', () => {
    currentTime.set(90);
    duration.set(160);

    expect(component.formattedCurrentTime()).toBe(90);
    expect(component.formattedDuration()).toBe(160);
  });

  it('should render formatted current time and duration', () => {
    const durationPipe = new DurationPipe();
    const timestepElements = fixture.debugElement.queryAll(By.css('.timestep__time'));

    fixture.detectChanges();

    expect(timestepElements[0].nativeElement.textContent).toBe(
      durationPipe.transform(DEFAULT_TIME_SECONDS),
    );
    expect(timestepElements[1].nativeElement.textContent).toBe(
      durationPipe.transform(DEFAULT_DURATION),
    );
  });

  it('should seek to selected value', () => {
    component.onSeek(20);

    expect(playerServiceMock.seekTo).toHaveBeenCalledOnce();
    expect(playerServiceMock.seekTo).toHaveBeenCalledWith(20);
  });

  it('should call seek when slider value changes', () => {
    const pSlider = fixture.debugElement.query(By.css('.p-slider'));

    pSlider.triggerEventHandler('ngModelChange', 48);

    fixture.detectChanges();

    expect(playerServiceMock.seekTo).toHaveBeenCalledOnce();
    expect(playerServiceMock.seekTo).toHaveBeenCalledWith(48);
  });
});
