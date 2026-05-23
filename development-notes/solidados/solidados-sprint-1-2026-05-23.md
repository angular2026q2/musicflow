## Entry #12

**createdAt:** 23 May 2026

### Album Page

Built the Album page end-to-end: from a missing backend endpoint to a fully rendered UI.

### Implementation

**Backend (`musicflow-backend`):**
- [x] add `JamendoAlbumTrack` and `JamendoAlbumWithTracks` interfaces
- [x] add `getAlbumTracks()` in `MusicService` – calls Jamendo `/albums/tracks`
- [x] add `GET /api/v1/music/albums/:id/tracks` endpoint in `MusicController`

**Frontend (`musicflow`):**
- `AlbumPage` – dual `httpResource`: one for album metadata, one for tracks. `isLoading` and `error` are merged from both resources. `totalDuration` computed from tracks array 
  in seconds, formatted via `DurationPipe` with `'total'` argument
- `SubHeaderComponent` – reusable header with cover image, kind label, title, and two `ng-content` slots: `[meta]` and `[actions]`
- `TrackComponent` – track row with position number, name, artist link, placeholder for plays, duration. Hover reveals a play button via CSS, hides position number
- `DurationPipe` – supports two formats: `'track'` (mm:ss) and `'total'` (Xh mm min)
- `PlayCountPipe` – abbreviates large numbers (1.2M, 12.3K)
- `AlbumTrack` interface – separate from `Track` because Jamendo returns `duration` and `position` as strings in `/albums/tracks` response
- `proxy.conf.json` – proxies `/api/*` to `localhost:3000` in dev mode
- `authInterceptor` – attaches JWT Bearer token to all `/api/` requests

### Problems & Solutions

**Problem:** `GET /api/v1/music/albums/:id` returns album metadata only, no tracks.  
**Solution:** I added separate `/albums/tracks` endpoint on the backend, second `httpResource` on the frontend.

**Problem:** `AlbumTrack.duration` and `.position` come as strings from Jamendo, but `Track` interface expects numbers.  
**Solution:** I created separate `AlbumTrack` interface with string types, added `toTrack()` mapper in `AlbumPage` to convert before passing to `TrackComponent`.

**Problem:** `proxy.conf.json` had an incorrect flat format, causing `Cannot create property 'prependPath' on boolean 'true'` error on start.  
**Solution:** Wrapped each proxy rule in a nested object with `target`, `secure`, `changeOrigin` keys.
