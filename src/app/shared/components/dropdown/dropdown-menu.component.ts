import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

/**
 * Компонент выпадающего меню с кнопкой-триггером (три точки).
 *
 * Предназначен для многократного использования в приложении как готовый
 * виджет дропдауна: меню + кнопка с настраиваемым направлением иконки
 * и опциональной рамкой вокруг кнопки.
 * @input items - Массив пунктов меню (PrimeNG `MenuItem[]`), отображаемых в выпадающем меню.
 * @input dir - Направление иконки кнопки с тремя точками: `'horizontal'` или `'vertical'`. По умолчанию: `'horizontal'`.
 * @input withBorder - Флаг: показывать круглую рамку вокруг кнопки (`true`) или нет (`false`). По умолчанию: `false`.
 */

type EllipsisDir = 'horizontal' | 'vertical';

@Component({
  selector: 'app-dropdown-menu',
  template: `
    <div>
      <p-menu
        #menu
        [model]="items()"
        [popup]="true"
        [appendTo]="'body'"
        styleClass="dropdown-menu"
      />
      <p-button
        (click)="menu.toggle($event)"
        [icon]="ellipsisIcon"
        [text]="true"
        [styleClass]="buttonClasses"
      />
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-block;
        width: auto;
      }
    `,
  ],
  standalone: true,
  imports: [ButtonModule, MenuModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMenuComponent {
  items = input<MenuItem[]>([]);
  dir = input<EllipsisDir>('horizontal');
  withBorder = input<boolean>(false);

  get ellipsisIcon(): 'pi pi-ellipsis-h' | 'pi pi-ellipsis-v' {
    const dir = this.dir();
    return dir === 'horizontal' ? 'pi pi-ellipsis-h' : 'pi pi-ellipsis-v';
  }
  get buttonClasses(): string {
    const base = 'p-button dropdown-menu-button';
    if (this.withBorder()) {
      return base + ' dropdown-menu-button--bordered';
    }
    return base;
  }
}
