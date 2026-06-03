import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TeamMember } from '@features/about/interfaces/team-member';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-team-member-card',
  imports: [CardModule],
  templateUrl: './team-member-card.component.html',
  styleUrl: './team-member-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamMemberCardComponent {
  readonly member = input.required<TeamMember>();
}
