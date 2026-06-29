import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-artist-skeleton',
  imports: [SkeletonModule],
  templateUrl: './artist.skeleton.html',
  styleUrl: '../artist.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistSkeletonPage {
  readonly tracks = Array.from({ length: 5 }, (_, i) => `Track #${i}`);
}
