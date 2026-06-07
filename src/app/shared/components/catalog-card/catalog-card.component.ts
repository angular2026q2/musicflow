import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogData } from '@shared/types/catalog-data.types';
import { CoverCardComponent } from '../cover-card/cover-card.component';

@Component({
  selector: 'app-catalog-card',
  imports: [RouterLink, CoverCardComponent, DatePipe],
  templateUrl: './catalog-card.component.html',
  styleUrl: './catalog-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogCardComponent {
  readonly data = input.required<CatalogData>();
  readonly route = input.required<string>();
}
