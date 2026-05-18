import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SmallCardComponent } from '@shared/components/small-card/small-card.component';

@Component({
  selector: 'app-home',
  imports: [SmallCardComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {}
