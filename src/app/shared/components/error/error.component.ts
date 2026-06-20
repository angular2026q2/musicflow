import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { LucideDynamicIcon } from '@lucide/angular';
import { ICONS } from '@shared/constants/icons';

@Component({
  selector: 'app-error',
  imports: [MessageModule, LucideDynamicIcon],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {
  readonly message = input.required<string>();
  readonly retry = output<void>();
  protected readonly ICONS = ICONS;
}
