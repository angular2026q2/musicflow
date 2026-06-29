import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TeamMember } from '@features/about/interfaces/team-member';
import { TeamMemberCardComponent } from './team-member-card.component';

describe('TeamMemberCardComponent', () => {
  let component: TeamMemberCardComponent;
  let fixture: ComponentFixture<TeamMemberCardComponent>;
  let cardDebug: DebugElement;
  let cardElement: HTMLElement;
  let expectedMember: TeamMember;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamMemberCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamMemberCardComponent);
    component = fixture.componentInstance;

    cardDebug = fixture.debugElement.query(By.css('.team-member-card'));
    cardElement = cardDebug.nativeElement;

    expectedMember = {
      name: 'John',
      role: 'Frontend Developer',
      bio: 'Set up the project architecture, developed the "About Us", "Library", and "Artist" pages, and implemented the player UI.',
      photo: 'images/team/team-member-1.webp',
      githubNick: 'johndoe',
    };

    fixture.componentRef.setInput('member', expectedMember);

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the name', () => {
    expect(cardElement.textContent).toContain('John');
  });

  it('should render the role', () => {
    expect(cardElement.textContent).toContain('Frontend Developer');
  });

  it('should render the photo if its available', () => {
    const avatar = fixture.debugElement.query(By.css('.team-member-card__avatar'));
    const img = fixture.debugElement.query(By.css('.team-member-card__avatar-img'));

    expect(avatar).toBeTruthy();
    expect(img).toBeTruthy();
    expect(img.attributes['alt']).toBe(expectedMember.name);
    expect(img.attributes['src']).toBe(expectedMember.photo);
  });

  it('should not render the photo if its not available', () => {
    fixture.componentRef.setInput('member', {
      ...expectedMember,
      photo: null,
    });

    fixture.detectChanges();

    const avatar = fixture.debugElement.query(By.css('.team-member-card__avatar'));
    const img = fixture.debugElement.query(By.css('.team-member-card__avatar-img'));

    expect(avatar).toBeFalsy();
    expect(img).toBeFalsy();
  });

  it('should render the bio', () => {
    const bioElement = fixture.debugElement.query(By.css('.team-member-card__bio'));

    expect(bioElement.nativeElement.textContent.trim()).toBe(expectedMember.bio);
  });

  it('should render the github link', () => {
    const link = fixture.debugElement.query(By.css('.team-member-card__github-link'));

    expect(link).toBeTruthy();
    expect(link.attributes['href']).toBe('https://github.com/johndoe');
    expect(link.attributes['target']).toBe('_blank');
    expect(link.attributes['rel']).toBe('noopener noreferrer');
  });
});
