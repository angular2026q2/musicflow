import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'app-submit-button',
  imports: [ProgressSpinner],
  templateUrl: './submit-button.component.html',
  styleUrl: './submit-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmitButtonComponent {
  readonly label = input.required<string>();
  readonly isLoading = input<boolean>(false);
  readonly disabled = input<boolean>(false);
}
