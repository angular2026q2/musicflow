import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ForgotPasswordModalComponent } from '@core/components/forgot-password-modal/forgot-password-modal.component';
import { HeaderComponent } from '@core/components/header/header.component';
import { SidebarComponent } from '@core/components/sidebar/sidebar.component';
import { SignInModalComponent } from '@core/components/sign-in-modal/sign-in-modal.component';
import { SignUpModalComponent } from '@core/components/sign-up-modal/sign-up-modal.component';
import { ModalService } from '@core/services/modal.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    SignInModalComponent,
    SignUpModalComponent,
    ForgotPasswordModalComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly modalService = inject(ModalService);
}
