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

## Table of Contents

- [MusicFlow — Music Streaming Service](#musicflow--music-streaming-service)
  - [Table of Contents](#table-of-contents)
  - [Technology Stack](#technology-stack)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [External API](#external-api)
    - [DevOps](#devops)
    - [Tooling](#tooling)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Development](#development)
    - [Build](#build)
    - [Test](#test)
  - [Available Scripts](#available-scripts)
  - [Git Workflow](#git-workflow)
    - [Conventional Commits](#conventional-commits)
  - [Angular CLI Schematics](#angular-cli-schematics)
  - [Team](#team)

## Technology Stack

### Frontend

- [**Angular 21+**](https://angular.dev/)
- [**PrimeNG**](https://primeng.org/)

### Backend

- [**NestJS**](https://nestjs.com/)

### External API

- [**Jamendo API**](https://developer.jamendo.com/v3.0)

### DevOps

- **Git** + **GitHub**

### Tooling

- **ESLint** + **angular-eslint** — code linting
- **Prettier** — code formatting
- **Stylelint** + **stylelint-config-clean-order** — CSS linting & property ordering
- **Husky** + **lint-staged** — git hooks
- **commitlint** — conventional commits enforcement

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

### Development

```bash
npm run start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`.

### Build

```bash
npm run build
```

### Test

```bash
npm run test
```

## Available Scripts

| Command                 | Description                                    |
| ----------------------- | ---------------------------------------------- |
| `npm start`             | Start dev server (http://localhost:4200)       |
| `npm run build`         | Build for production                           |
| `npm run watch`         | Build in watch mode (development config)       |
| `npm test`              | Run unit tests with Vitest                     |
| `npm run lint`          | Run ESLint                                     |
| `npm run lint:fix`      | Run ESLint with auto-fix                       |
| `npm run format`        | Check formatting with Prettier                 |
| `npm run format:fix`    | Auto-format with Prettier                      |
| `npm run stylelint`     | Lint CSS files                                 |
| `npm run stylelint:fix` | Lint CSS with auto-fix                         |
| `npm run check`         | Run **all** checks (lint + format + stylelint) |
| `npm run check:fix`     | Auto-fix everything                            |

## Git Workflow

### Conventional Commits

Commits **must** follow [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>: <description>

[optional body]
```

**Allowed types:**

| Type       | Purpose                        |
| ---------- | ------------------------------ |
| `feat`     | New feature                    |
| `fix`      | Bug fix                        |
| `docs`     | Documentation changes          |
| `style`    | Code style (formatting, etc.)  |
| `refactor` | Code refactoring               |
| `test`     | Tests                          |
| `chore`    | Tooling, configs, dependencies |
| `ci`       | CI/CD pipeline changes         |

**Rules:**

- Subject must be **lowercase**
- Subject max length: **72 characters**

**Examples:**

```bash
git commit -m "feat: add player controls component"
git commit -m "fix: resolve audio playback issue on safari"
git commit -m "chore: update angular to v21"
```

## Angular CLI Schematics

The project uses custom schematic paths so generated files land in the right folders:

```bash
# Generates into src/shared/components/
ng g c component-name # or componentName

# Generates into src/shared/services/
ng g s service-name # or serviceName

# Generates into src/shared/pipes/
ng g p pipe-name # or pipeName
```

## Team

| Name                   | Role                 | GitHub                                         |
| ---------------------- | -------------------- | ---------------------------------------------- |
| **Alina Cherkasova**   | Team Lead / Frontend | [@cherkasovaa](https://github.com/cherkasovaa) |
| **Ivan Shvets**        | Frontend Developer   | [@shvetsby](https://github.com/shvetsby)       |
| **Pavel Konyakhin**    | Backend (NestJS)     | [@solidados](https://github.com/solidados)     |
| **Karina Kupryianava** | Mentor               | [@karina2409](https://github.com/karina2409)   |

> Full team info is available on the **About Us** page inside the app.
