import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import type { IconConfig } from '@shared/interfaces/icon-config';

export interface NavItem extends IconConfig {
  route: string;
}

@Component({
  selector: 'app-nav-item',
  imports: [RouterLink, RouterLinkActive, NgComponentOutlet],
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavItemComponent {
  readonly item = input.required<NavItem>();
}
