## Entry #11

**createdAt:** 18 May 2026

### Continuing Sprint 1

After the setup as described in [Entry #10](solidados-sprint-1-2026-05-14.md/#entry-10), I worked on improving the existing parts: the deployment pipeline, linting, and sidebar
reactivity. No new features – just better stability and alignment with modern Angular 21 practices.

### Implementation

**CI/CD - migrating to the modern GitHub Pages flow** (as I described it in MR #50):

- [x] Reviewed `deploy.yml` and split the single monolithic `build-and-deploy` job into two independent jobs: `build` (compiles Angular, uploads artifact) and
      `deploy` (consumes artifact, publishes via `actions/deploy-pages@v4`). This mirrors the official GitHub Pages workflow template. Now, if the deploy step flakes I can re-run just `deploy` without rebuilding the whole application.
- [x] I added SPA 404 fallback: `cp dist/musicflow/browser/index.html dist/musicflow/browser/404.html` runs right after the Angular build. Without this, GitHub Pages returns a real 404 on every direct navigation to an Angular route, because no such file exists on disk. So, I copy `index.html` to `404.html` which makes Pages serve the SPA shell, and the Router takes it from there.
- [x] I added `paths-ignore: ['**.md', 'docs/**', 'development-notes/**', '.gitignore']` so pushing diary entries or any Markdown file doesn't waste a deploy run.
- [x] I created `ci.yml`. It's a separate workflow that runs on every MR into `main`, executes `npm run check` for production's build, and will block merge if anything is red.
      `concurrency` with `cancel-in-progress: true` so a new push to the MR branch cancels the previous run instead of queueing.
- [x] Previous version of deploy was set wrong, and I reverted a misstep where I had `peaceiris/actions-gh-pages@v3` in the deploy step. That action creates and pushes to a
      `gh-pages` branch, which is exactly the old approach. I replaced with the native `actions/deploy-pages@v4`, which picks up the artifact from the `build` job automatically. No tokens, no `publish_dir`, no branch.

**Stylelint scope fix**:

- [x] `npm run check` was crashing locally with hundreds of errors after a build was made, because the `stylelint` glob `"**/*.css"` was sweeping `dist/` including minified production CSS. On CI it didn't fail (because `check` runs before `build`), but the local DX was unusable.
- [x] I updated `stylelint` and `stylelint:fix` in `package.json` to check only `src/**/*.css` instead of `**/*.css`. This makes them consistent with `format:check` an `ng 
lint`, so all checks now run only on `src`.
- [x] Added `.stylelintignore` to exclude `dist/` and `coverage/` as an extra safeguard for future build output.

**`SidebarComponent.isSettingsPage` reactivity bug**:

- [x] I found out that navigating to `/settings` did not add the Divider and extra `NavItem` below the main nav in a SidebarComponent, even though the `computed()` flag for
      `isSettingsPage` was in place. The flag would stay `false` forever right after the initial render.

> Root cause: the computed was `() => this.router.url.includes('settings')`, but `router.url` is a plain getter, not a **Signal**. Angular's reactive never sees it change, so the computed evaluates once during construction (when URL is still `/`) and caches `false` for the rest of the app's lifetime.

- Initial instinct was to wrap `router.events` with `filter(NavigationEnd)`, `map`, `toSignal`. Then I caught myself: that's the Angular 16-20 pattern, and the project brief explicitly says to write for Angular 21+ without RxJS where the framework already provides a Signal-native alternative.
- Checked `@angular/router@21.2.12` types and found `isActive(url, router, matchOptions)`, this is a public API Angular 21.1 that returns `Signal<boolean>` directly. It handles the router-events subscription and `DestroyRef` cleanup internally. The old `router.isActive(...)` instance method is now marked as deprecated.
- [x] So, I replaced the broken `computed` with `isActive(APP_ROUTES.SETTINGS...`.

**Icon registry standardization**:

- [x] I used direct imports for all Lucide icons across `SidebarComponent`, `HeaderComponent`, `NavItemComponent`, etc. Team lead has created a set if ICONS, so I replaced my old apprach with references to a shared `ICONS` constant, instead of `import { LucideHouse } from '@lucide/angular'` at every callsite.
- [x] I also extended `NavItem` interface from `IconConfig` so the icon shape is centrally defined.
- [x] Migrated `header.component` to use the shared `ControlButtonComponent`.

### Problems & Solutions

**Problem:** Single deploy job meant any deploy flake forced a full rebuild on retry, and the environment URL was attached to the same job as the build step, blurring the boundary between "did the build succeed" and "did the publish succeed".  
**Solution:** Split into `build` + `deploy` jobs as per GitHub's official Pages template. `deploy: needs: build` chains them; `environment` block moved to the `deploy` job only.

**Problem:** I shipped `peaceiris/actions-gh-pages@v3` in the deploy step third-party action that pushes a `gh-pages` branch. This contradicted the whole point of migrating to the artifact-based flow.  
**Solution:** I replaced with the official `actions/deploy-pages@v4`, which is the counterpart to `actions/upload-pages-artifact@v3` and consumes the artifact by its well-known name without any additional configuration.

**Problem:** `npm run build` followed by `npm run check` locally produced hundreds of stylelint errors against minified production CSS in `dist/`.  
**Solution:** I scoped stylelint globs to `src/**/*.css` to align with the other checks, and added `.stylelintignore` so future output dirs (`coverage/`, etc.) are safe by default.

**Problem:** `isSettingsPage` was implemented as `computed(() => router.url.includes(...))` but never recomputed because `router.url` is not a Signal but it's a synchronous getter, invisible to Angular's reactivity graph.  
**Solution:** Used the native Signal-based `isActive` function from `@angular/router` (public API since 21.1). One import, one line, full reactivity, no RxJS, no manual
subscription, no cleanup boilerplate. The deprecated `router.isActive(...)` instance method on `Router` is the reason the new function-form exists, the framework is moving this surface to Signals.
