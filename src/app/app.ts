import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ForgotPasswordModalComponent } from '@core/components/auth/forgot-password-modal/forgot-password-modal.component';
import { HeaderComponent } from '@core/components/header/header.component';
import { SidebarComponent } from '@core/components/sidebar/sidebar.component';
import { SignInModalComponent } from '@core/components/auth/sign-in-modal/sign-in-modal.component';
import { SignUpModalComponent } from '@core/components/auth/sign-up-modal/sign-up-modal.component';
import { ModalService } from '@core/services/modal.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    SignInModalComponent,
    SignUpModalComponent,
    ForgotPasswordModalComponent,
    ToastModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly modalService = inject(ModalService);
}
