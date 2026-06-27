import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  inject,
  input,
} from '@angular/core';
import { MusicPlayerService } from '@core/services/music-player.service';

interface Waveform {
  peaks: number[];
}

@Component({
  selector: 'app-wave-form',
  standalone: true,
  template: `<canvas #canvas></canvas>`,
  styles: `
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    canvas {
      width: 100%;
      height: 100%;
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WaveFormComponent implements AfterViewInit, OnDestroy {
  readonly waveform = input<string>();

  private readonly player = inject(MusicPlayerService);

  private readonly currentTime = this.player.currentTime;
  private readonly duration = this.player.duration;

  private readonly barWidth = 3;
  private readonly gap = 1;

  private readonly accentColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-primary-container')
    .trim();

  private readonly mainColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-tertiary')
    .trim();

  private animationId?: number;

  @ViewChild('canvas')
  canvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    this.draw();
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  private draw(): void {
    const rawWaveData = this.waveform();

    if (!rawWaveData) {
      return;
    }

    const waveform: Waveform = JSON.parse(rawWaveData);

    const peaks = waveform.peaks;

    const canvas = this.canvas.nativeElement;

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return;
    }

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    const pixelRatio = window.devicePixelRatio || 1;

    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    const maxPeak = Math.max(...peaks);

    const normalized = peaks.map((value) => value / maxPeak);

    const visibleBars = Math.floor(width / (this.barWidth + this.gap));

    const compressed = Array.from({ length: visibleBars }, (_, i) => {
      const start = Math.floor((i * normalized.length) / visibleBars);

      const end = Math.floor(((i + 1) * normalized.length) / visibleBars);

      return Math.max(...normalized.slice(start, end));
    });

    this.animate(compressed, ctx, width, height);
  }

  private animate(
    peaks: number[],
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
  ): void {
    const frame = () => {
      const duration = this.duration();
      const currentTime = this.currentTime();

      const progress = duration ? currentTime / duration : 0;

      ctx.clearRect(0, 0, width, height);

      peaks.forEach((peak, index) => {
        const maxHeight = height * 0.9;

        const baseHeight = peak * maxHeight;

        const movement = 1 + Math.sin(Date.now() / 500 + index * 0.25) * 0.15;

        const barHeight = baseHeight * movement;

        const x = index * (this.barWidth + this.gap);

        const y = height - barHeight;

        ctx.fillStyle = index / peaks.length <= progress ? this.accentColor : this.mainColor;

        ctx.beginPath();

        ctx.roundRect(x, y, this.barWidth, barHeight, this.barWidth / 2);

        ctx.fill();
      });

      this.animationId = requestAnimationFrame(frame);
    };

    this.animationId = requestAnimationFrame(frame);
  }
}
