import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-meta',
  imports: [],
  templateUrl: './meta.component.html',
  styleUrl: './meta.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetaComponent {
  // readonly isFavorite = signal(false);
  readonly title = input<string>('');
  readonly primaryDesc = input<string>('');
}
