import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TeamMemberCardComponent } from '@shared/components/team-member-card/team-member-card.component';
import { CardModule } from 'primeng/card';
import { TEAM_MEMBERS } from './data/team-members';

@Component({
  selector: 'app-about',
  imports: [TeamMemberCardComponent, CardModule],
  templateUrl: './about.page.html',
  styleUrl: './about.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage {
  readonly teamMembers = TEAM_MEMBERS;
  readonly RSS_LINK = 'https://rs.school/';
  readonly ANGULAR_LINK_COURSE = 'https://rs.school/courses/angular';
  readonly PAGE_TITLE = 'About us';
}
