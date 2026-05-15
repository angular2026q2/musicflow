import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideHouse, LucideMusic2 } from '@lucide/angular';
import { APP_ROUTES } from '@shared/constants/routes';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, LucideMusic2, LucideHouse],
  templateUrl: './not-found.page.html',
  styleUrl: './not-found.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage {
  readonly homeRoute = APP_ROUTES.HOME.route;
}
