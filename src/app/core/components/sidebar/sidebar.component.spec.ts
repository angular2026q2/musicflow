import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal, WritableSignal } from '@angular/core';
import { provideRouter, Router } from '@angular/router';

import { AuthService } from '@core/services/auth.service';
import { NavItemComponent } from '@shared/components/nav-item/nav-item.component';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let hasToken: WritableSignal<boolean>;

  beforeEach(async () => {
    hasToken = signal(false);

    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: { hasToken },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should render title and subtitle with titlecase', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.sidebar__logo-title')?.textContent?.trim()).toBe('Music Flow');
    expect(el.querySelector('.sidebar__logo-subtitle')?.textContent?.trim()).toBe('Free Music');
  });

  it('should render 4 main nav items', () => {
    expect(component.mainNavItems).toHaveLength(4);
  });

  it('should NOT show Library nav item for Guest Users', () => {
    const navItems = fixture.debugElement.queryAll(By.directive(NavItemComponent));
    const routes = navItems.map((el) => (el.componentInstance as NavItemComponent).item().route);
    expect(routes).not.toContain('library');
  });

  it('should show Library nav item for Authenticated Users', () => {
    hasToken.set(true);
    fixture.detectChanges();
    const navItems = fixture.debugElement.queryAll(By.directive(NavItemComponent));
    const routes = navItems.map((el) => (el.componentInstance as NavItemComponent).item().route);
    expect(routes).toContain('library');
  });

  it('should show About nav item for All Users', () => {
    const navItems = fixture.debugElement.queryAll(By.directive(NavItemComponent));
    const routes = navItems.map((el) => (el.componentInstance as NavItemComponent).item().route);
    expect(routes).toContain('about');
  });

  it('should navigate to Home page when Logo is clicked', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);

    fixture.debugElement.query(By.css('.sidebar__logo')).triggerEventHandler('click', null);

    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });
});
