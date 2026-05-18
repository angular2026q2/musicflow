import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-cover-card',
  imports: [CardModule],
  template: `
    <p-card [style.background-image]="'url(' + backgroundImage() + ')'" styleClass="cover-card">
      <ng-content> </ng-content>
    </p-card>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class CoverCardComponent {
  backgroundImage = input<string>('');
}
