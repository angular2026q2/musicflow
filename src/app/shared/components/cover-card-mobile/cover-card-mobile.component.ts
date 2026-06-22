import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-mobile-cover-card',
  imports: [CardModule],
  templateUrl: './cover-card-mobile.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './cover-card-mobile.component.scss',
})
export class MobileCoverCardComponent {
  image = input<string>('');
}
