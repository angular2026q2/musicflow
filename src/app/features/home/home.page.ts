import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CoverCardComponent } from '@shared/components/cover-card/cover-card.component';

@Component({
  selector: 'app-home',
  imports: [CoverCardComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {}
