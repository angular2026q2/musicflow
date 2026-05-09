# MusicFlow — Music Streaming Service

[![Angular](https://img.shields.io/badge/Angular-21+-DD0031?logo=angular&logoColor=white)](https://angular.dev/)
[![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs&logoColor=white)](https://nestjs.com/)
[![RS School](https://img.shields.io/badge/RS%20School-Angular-ffce00)](https://rs.school/courses/angular)

**MusicFlow** is a music streaming service clone where users can:

- search for tracks and artists;
- listen to music through a global player;
- build their own playlists;
- upload their own audio files;
- track their listening history.

The music catalog is powered by the **[Jamendo API v3.0](https://developer.jamendo.com/)** — a library of 500,000+ tracks under free licenses. The REST API provides search, filtering, artist/album info, and direct audio stream URLs.

User-specific data (accounts, playlists, uploaded tracks) is stored on a custom backend built with **NestJS**.

## Technology Stack

### Frontend

- Angular 21+
- TypeScript 5+
- PrimeNG

### Backend

- NestJS

### External API

- Jamendo API

### DevOps / Tooling

- Git + GitHub

## Getting Started

### Prerequisites

- Node.js 24+
- npm 11+

### Installation

```bash
git clone https://github.com/angular2026q2/musicflow.git
cd musicflow
npm install
```

### Developing

```bash
npm run start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`.

### Building

```bash
npm run build
```

### Run Tests

```bash
npm run test
```

## Team

| Name                   | Role                 | GitHub                                         |
| ---------------------- | -------------------- | ---------------------------------------------- |
| **Alina Cherkasova**   | Team Lead / Frontend | [@cherkasovaa](https://github.com/cherkasovaa) |
| **Ivan Shvets**        | Frontend Developer   | [@shvetsby](https://github.com/shvetsby)       |
| **Pavel Konyakhin**    | Backend (NestJS)     | [@solidados](https://github.com/solidados)     |
| **Karina Kupryianava** | Mentor               | [@karina2409](https://github.com/karina2409)   |

> Full team info is available on the **About Us** page inside the app.
