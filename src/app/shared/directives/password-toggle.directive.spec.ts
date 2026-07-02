import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordToggleDirective } from './password-toggle.directive';

@Component({
  template: '<input [appPasswordToggle]="false" />',
  imports: [PasswordToggleDirective],
})
class HostComponent {}

describe('PasswordToggleDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
