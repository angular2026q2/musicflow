import { TeamMember } from '../interfaces/team-member';

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Alina',
    role: 'Team Lead',
    bio: 'Set up the project architecture, developed the "About Us", "Library", and "Artist" pages, and implemented the player UI.',
    photo: '/images/team/team-member-1.webp',
    githubNick: 'cherkasovaa',
  },
  {
    name: 'Pavel',
    role: 'Fullstack Developer',
    bio: 'Implemented the backend with NestJS, designed the project, developed the authentication and registration forms, created the "Album", "User", and "Settings" pages, and implemented the sidebar and header.',
    photo: '/images/team/team-member-2.webp',
    githubNick: 'solidados',
  },
  {
    name: 'Ivan',
    role: 'Frontend Developer',
    bio: 'Implemented the home page interface, the search page, the full-screen player view, and reusable components such as the dropdown menu and several card components.',
    photo: '/images/team/team-member-3.webp',
    githubNick: 'shvetsby',
  },
];
