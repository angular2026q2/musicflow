import { Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MusicPlayerService } from '@core/services/music-player.service';
import { IconKey } from '@shared/constants/icons';
import { ControlButtonComponent } from '../control-button/control-button.component';
import { VolumeComponent } from './volume.component';

@Component({
  selector: 'app-control-button',
  standalone: true,
  template: '',
})
class ControlButtonComponentStub {
  readonly icon = input.required<IconKey>();
}

describe('VolumeComponent', () => {
  let component: VolumeComponent;
  let fixture: ComponentFixture<VolumeComponent>;

  const playerServiceMock = {
    setVolume: vi.fn(),
  };

  beforeEach(async () => {
    playerServiceMock.setVolume.mockClear();

    await TestBed.configureTestingModule({
      imports: [VolumeComponent],
      providers: [{ provide: MusicPlayerService, useValue: playerServiceMock }],
    })
      .overrideComponent(VolumeComponent, {
        remove: {
          imports: [ControlButtonComponent],
        },
        add: {
          imports: [ControlButtonComponentStub],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(VolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default volume', () => {
    expect(component.volume()).toBe(50);
  });

  it('should mute volume', () => {
    component.toggleMute();

    expect(component.volume()).toBe(0);
  });

  it('should restore previous volume after unmute', () => {
    component.volume.set(35);

    component.toggleMute();
    component.toggleMute();

    expect(component.volume()).toBe(35);
  });

  it('should set player volume', () => {
    expect(playerServiceMock.setVolume).toHaveBeenCalledWith(50);
  });
});
