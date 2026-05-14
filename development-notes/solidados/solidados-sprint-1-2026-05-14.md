## Entry #10

**createdAt:** 14 May 2026

### Thoughts for Sprint 1

Sprint 1 of the Angular course has begun. As per Task, the focus this week was on project
configuration, tooling setup, and building the first core UI components following modern
Angular conventions.  
Before writing any feature code setup is needed: correct folder structure, path aliases, linting rules, CI/CD pipeline, and a consistent design system in place.

### Implementation

**CI/CD & GitHub Actions** (`musicflow` frontend repo):

- [x] Create `.github/workflows/deploy.yml` to deploy to GitHub Pages on every push to `main`
- [x] Configure `actions/setup-node@v4` with `cache: 'npm'` to skip full reinstall when
      `package-lock.json` hasn't changed
- [x] Thus, the base link `https://angular2026q2.github.io/musicflow/` at build time
- [x] Ask a Team Lead to grant Actions write permissions and configure GitHub Pages source
      to `GitHub Actions` (not `Deploy from branch` - as it was revealed later. My mistake)

**Project configuration:**

- [x] Update `angular.json` schematics - I refactored default paths from `src/shared/*` to
      `src/app/shared/*` and `src/app/core/*`; added `"changeDetection": "OnPush"` and
      `"style": "scss"` to component schematic so every generated component has correct
      defaults out of the box
- [x] Update `tsconfig.json` - i replaced scattered legacy path aliases with four clean ones:
      `@core/*`, `@shared/*`, `@features/*`, `@environments/*` as per folder structure;
- [x] Add `sass` as dev dependency. Good, components now use `.scss` while global `styles.css`
      stays as is:
- [x] Configure `stylePreprocessorOptions.includePaths: ['src']` in `angular.json` - done.

**Global design system** (`src/styles.css`):

- [x] Add CSS custom full color palette using Material Design 3 token naming (`--color-surface-container`, `--color-on-surface` and others), typography scale (Montserrat +
      Inter), spacing scale (4px baseline), border radius tokens, etc., as per design;;
- [x] Add `@layer primeng` declaration at the top of global `styles.css` - it fixes PrimeNG styles 'do not apply
      until' first user interaction;
- [x] Import `primeicons/primeicons.css` and Google Fonts - done.

**Core components created:**

- `NavItemComponent` (`src/app/shared/components/nav-item/`) - I created reusable "dumb" nav link component. The idea was to make it (as in React via props) to accept a single
  prop using Signals (`item = input.required<NavItem>()` where `NavItem` carries
  `icon: Type<unknown>`, `label: string`, `route: string`). This reusable component uses `[ngComponentOutlet]`
  (modern property binding syntax, instead of `*ng` prefix) to dynamically render any Lucide icon
  component passed as a reference. `RouterLink` and `RouterLinkActive` handle navigation
  and active state thus no manual `isActive` flag needed.

- `SidebarComponent` (`src/app/core/components/sidebar/`) - This one renders `mainNavItems` via
  `@for` loop. Context-aware: `isSettingsPage` is a `computed()` signal that reads
  `router.url`; `contextNavItems` is another `computed()` that returns extra nav items
  (e.g. Settings) when on the `/settings` route. Uses `p-divider` from PrimeNG to
  visually separate context items. Fixed height via CSS grid in `AppComponent`,
  internal scroll with `overflow-y: auto`.

- `HeaderComponent` (`src/app/core/components/header/`) - Oh, here was a hustle-fun with icons and UI-libs. My `header` contains PrimeNG `p-iconfield` + `p-inputicon` +
  `pInputText` for the search bar, Lucide icons (`lucideBell`,
  `lucideSettings`) for action buttons, and `p-avatar` for the user profile picture.
  Avatar URL comes from `avatarUrl = input<string>('')` - this is just for now! SO, I added a comment `TODO: Sprint 2` to replace this `input()` with `UserService` injection once HTTP layer is ready.

**App layout** (`app.html` + `app.scss`):

- Implemented styles for CSS Grid layout: now sidebar and header are fixed while content area is flexible
  - Sidebar: `grid-row: 1 / -1`, `height: 100%`, `overflow-y: auto` never scrolls with the page;
  - Header: `position: sticky; top: 0` stays visible on scroll;
  - Main: `overflow-y: auto` makes that only the content area scrolls (inside Outlet).

**Third-party libraries resolved:**

- I removed `lucide-angular` (community wrapper), and installed `@lucide/angular` (official package)
- Now, all icons are imported as standalone Angular components (`LucideHouse`, `LucideBell`, etc.)
  and rendered via `[ngComponentOutlet]`
- Using official documentation, PrimeNG 21 was configured with Aura theme preset + `provideAnimationsAsync()` in
  `app.config.ts`

### Problems & Solutions

**Problem:** PrimeNG styles were not applying until the first user interaction (e.g. input focus).
**Solution:** I added `@layer primeng;` as the very first line in `styles.css`; it declares
the CSS layer before PrimeNG loads, so styles apply immediately on render.

**Problem:** Two conflicting Lucide libraries installed simultaneously (`lucide-angular`
and `@lucide/angular`), PrimeNG components broke when Lucide was used.
**Solution:** I uninstalled `lucide-angular`, kept only `@lucide/angular` (used official documentstion and instructions regarding migration from v0), and updated all imports
accordingly.

**Problem:** WebStorm reordered class members on save, causing `@typescript-eslint/member-ordering`
errors on every commit.
**Solution:** I had to remove `member-ordering` ESLint rule, `private inject()` fields first, then `readonly` constants, then `computed()` signals, then public methods.
Otherwise, there was a mess `on save` and eslint would never let it go.

**Problem:** `*ngComponentOutlet` worked, but I used legacy `*` structural directive syntax.
**Solution:** Replaced with modern property binding: `[ngComponentOutlet]="item().icon"`.

**Problem:** Header appeared full-width above the sidebar instead of starting at the sidebar's right edge.
**Solution:** I wrapped `<app-sidebar>` and `<app-header>` + `<main>` in a CSS Grid container with `grid-template-columns: 16.5rem 1fr`. Sidebar spans full height via
`grid-row: 1 / -1`.

### Thoughts for Sprint 2

- [ ] Configure routing: `app.routes.ts` with lazy-loaded feature pages
      (Discover, Search, Library, Artist, Album, Auth)
- [ ] Implement `canActivate` guard for Library route (auth required)
- [ ] Write `AuthService` and `UserService` with signal-based state
- [ ] Replace `avatarUrl input()` in `HeaderComponent` with `UserService` injection
- [ ] Add `HttpClient` + interceptor for JWT token attachment
- [ ] Connect frontend to backend API (sign-up, sign-in, profile)
- [ ] Deploy backend to Railway, make Swagger publicly accessible for the team
