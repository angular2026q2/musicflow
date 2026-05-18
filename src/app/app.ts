import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@core/components/header/header.component';
import { PlayerComponent } from '@core/components/player/player.component';
import { SidebarComponent } from '@core/components/sidebar/sidebar.component';
import { CoverCardComponent } from '@shared/components/cover-card/cover-card.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, PlayerComponent, CoverCardComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly isDemoTextVisible = signal(false);

  toggleDemoText(): void {
    this.isDemoTextVisible.update((value) => !value);
  }
}
