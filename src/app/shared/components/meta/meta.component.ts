import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterRenderEffect,
  effect,
  input,
  signal,
  untracked,
  viewChild,
} from '@angular/core';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-meta',
  imports: [RouterLink],
  templateUrl: './meta.component.html',
  styleUrl: './meta.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetaComponent {
  readonly title = input<string>('');
  readonly titleLink = input<string | null>(null);
  readonly primaryDesc = input<string>('');
  readonly isScrolling = signal<boolean>(false);
  private readonly containerRef = viewChild<ElementRef<HTMLElement>>('marqueeContainer');

  /** @description
   * - `untracked()` это запись в сигнал внутри `effect()` создаёт циклическую зависимость. Тут `untracked` сообщает ангуляру: "не отслеживай это изменение как реакцию".
   * - `afterRenderEffect` выполняется после того, как ангуляр отрисовал DOM дерево. Вот тут уже можно безопасно читать размеры элементов
   * (`scrollWidth`, `offsetWidth` и т.п.).
   */
  constructor() {
    effect(() => {
      this.title();
      untracked(() => this.isScrolling.set(false));
    });

    afterRenderEffect(() => {
      this.title();
      if (untracked(() => this.isScrolling())) return;
      const el = this.containerRef()?.nativeElement;
      if (el) {
        untracked(() => this.isScrolling.set(el.scrollWidth > el.clientWidth));
      }
    });
  }
}
