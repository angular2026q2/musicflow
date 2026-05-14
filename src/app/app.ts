import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '@core/components/sidebar/sidebar.component';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from '@core/components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, HeaderComponent, SidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly isDemoTextVisible = signal(false);

  toggleDemoText(): void {
    this.isDemoTextVisible.update((value) => !value);
  }
}
