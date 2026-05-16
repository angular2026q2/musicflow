import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@core/components/header/header.component';
import { PlayerComponent } from '@core/components/player/player.component';
import { SidebarComponent } from '@core/components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, PlayerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly isDemoTextVisible = signal(false);

  toggleDemoText(): void {
    this.isDemoTextVisible.update((value) => !value);
  }
}
