# ANI-WEB CLIENT - COMPREHENSIVE API & OAUTH ANALYSIS

## 1. ALL API ENDPOINT CALLS

### Authentication & OAuth Endpoints
| Endpoint | Method | Component/Hook | Line | Purpose |
|----------|--------|----------------|------|---------|
| `/api/auth/user` | GET | GoogleAuthSettings.tsx | 39 | Fetch Google user info |
| `/api/auth/user` | GET | Header.tsx | 31 | Fetch sync profile (Google) |
| `/api/auth/google` | GET | GoogleAuthSettings.tsx | 49 | Get Google auth URL |
| `/api/auth/google-auth` | GET | GoogleAuthSettings.tsx | 73 | Get stored Google config |
| `/api/auth/google-auth` | POST | GoogleAuthSettings.tsx | 116, 173 | Save/clear Google config |
| `/api/auth/google/login` | POST | GoogleAuthSettings.tsx | 201 | Initiate Google login |
| `/api/auth/logout` | POST | GoogleAuthSettings.tsx | 233 | Google logout |
| `/api/auth/config-status` | GET | GoogleAuthSettings.tsx | 59 | Check if Google OAuth is configured |
| `/api/auth/github/status` | GET | GitHubSyncSettings.tsx | 65 | Get GitHub auth status |
| `/api/auth/github/status` | GET | Header.tsx | 19 | Fetch sync profile (GitHub) |
| `/api/auth/github/poll` | GET | GitHubSyncSettings.tsx | 72 | Poll GitHub device flow |
| `/api/auth/github/start` | POST | GitHubSyncSettings.tsx | 124 | Start GitHub device flow |
| `/api/auth/github/logout` | POST | GitHubSyncSettings.tsx | 146 | GitHub logout |
| `/api/auth/settings/sync` | GET | SyncProviderSelector.tsx | 21 | Get sync provider settings |
| `/api/auth/settings/sync` | POST | SyncProviderSelector.tsx | 38 | Update active sync provider |
| `/api/auth/settings/rclone` | GET | RcloneSettings.tsx | 25 | Get Rclone settings |
| `/api/auth/settings/rclone` | POST | RcloneSettings.tsx | 43 | Save Rclone settings |

### Watchlist Endpoints
| Endpoint | Method | Component/Hook | Line | Purpose |
|----------|--------|----------------|------|---------|
| `/api/watchlist` | GET | useAnimeData.ts | 282, 313 | Get paginated watchlist |
| `/api/watchlist/add` | POST | usePlayerData.ts | 317 | Add to watchlist |
| `/api/watchlist/add` | POST | useAnimeInfoData.ts | 55 | Add to watchlist |
| `/api/watchlist/remove` | POST | useAnimeData.ts | 364 | Remove from watchlist |
| `/api/watchlist/remove` | POST | usePlayerData.ts | 317 | Remove from watchlist |
| `/api/watchlist/remove` | POST | useAnimeInfoData.ts | 55 | Remove from watchlist |
| `/api/watchlist/check/{id}` | GET | usePlayerData.ts | 88 | Check if in watchlist |
| `/api/watchlist/check/{id}` | GET | useAnimeInfoData.ts | 33 | Check if in watchlist |
| `/api/watchlist/status` | POST | Watchlist.tsx | 175 | Update watchlist status |
| `/api/watchlist/status` | POST | usePlayerData.ts | 363 | Update watchlist status |

### Player & Video Endpoints
| Endpoint | Method | Component/Hook | Line | Purpose |
|----------|--------|----------------|------|---------|
| `/api/show-meta/{id}` | GET | usePlayerData.ts | 86 | Get show metadata |
| `/api/show-meta/{id}` | GET | useAnimeInfoData.ts | 32 | Get show metadata |
| `/api/show-meta/{id}` | GET | SpotlightBanner.tsx | 31 | Get show metadata |
| `/api/episodes` | GET | usePlayerData.ts | 87 | Get episodes list |
| `/api/episodes` | GET | useAnimeInfoData.ts | 34 | Get episodes list |
| `/api/video` | GET | usePlayerData.ts | 233 | Get video sources |
| `/api/watched-episodes/{id}` | GET | usePlayerData.ts | 89 | Get watched episodes |
| `/api/episode-progress/{id}/{ep}` | GET | usePlayerData.ts | 235 | Get episode progress |
| `/api/update-progress` | POST | usePlayerData.ts | 403 | Update watch progress |
| `/api/update-progress` | POST | useVideoPlayer.ts | 146, 523 | Update watch progress |
| `/api/skip-times/{id}/{ep}` | GET | usePlayerData.ts | 237 | Get skip times (OP/ED) |
| `/api/proxy` | GET | Player.tsx | 223 | Proxy video URL |
| `/api/subtitle-proxy` | GET | Player.tsx | 237 | Proxy subtitle URL |

### Continue Watching Endpoints
| Endpoint | Method | Component/Hook | Line | Purpose |
|----------|--------|----------------|------|---------|
| `/api/continue-watching` | GET | useAnimeData.ts | 145 | Get continue watching |
| `/api/continue-watching/fast` | GET | useAnimeData.ts | 129 | Fast continue watching query |
| `/api/continue-watching/up-next` | GET | useAnimeData.ts | 137 | Get up next episodes |
| `/api/continue-watching/all` | GET | useAnimeData.ts | 326, 355 | Get all continue watching |
| `/api/continue-watching/remove` | POST | Home.tsx | 117 | Remove from continue watching |
| `/api/continue-watching/remove` | POST | Watchlist.tsx | 189 | Remove from continue watching |

### Queue Endpoints
| Endpoint | Method | Component/Hook | Line | Purpose |
|----------|--------|----------------|------|---------|
| `/api/queue` | GET | useAnimeData.ts | 155 | Get queue |
| `/api/queue/add` | POST | useAnimeData.ts | 171 | Add to queue |
| `/api/queue/remove` | POST | useAnimeData.ts | 197 | Remove from queue |
| `/api/queue/clear` | POST | useAnimeData.ts | 218 | Clear queue |
| `/api/queue/reorder` | POST | useAnimeData.ts | 235 | Reorder queue |
| `/api/queue/suggested/{id}` | GET | queue.ts | 8 | Get suggested episode |

### Anime Data Endpoints
| Endpoint | Method | Component/Hook | Line | Purpose |
|----------|--------|----------------|------|---------|
| `/api/popular/{timeframe}` | GET | useAnimeData.ts | 51, 58, 66 | Get popular anime |
| `/api/latest-releases` | GET | useAnimeData.ts | 77, 85 | Get latest releases |
| `/api/seasonal` | GET | useAnimeData.ts | 96, 107 | Get seasonal anime |
| `/api/search` | GET | useAnimeData.ts | 122 | Search anime |
| `/api/search` | GET | usePlayerData.ts | 175 | Search for provider |
| `/api/schedule/{date}` | GET | Schedule.tsx | 37 | Get schedule |
| `/api/genres-and-tags` | GET | useAnimeData.ts | 442 | Get genres/tags/studios |

### Notification Endpoints
| Endpoint | Method | Component/Hook | Line | Purpose |
|----------|--------|----------------|------|---------|
| `/api/notifications` | GET | useAnimeData.ts | 396 | Get notifications |
| `/api/notifications/dismiss` | POST | useAnimeData.ts | 406 | Dismiss notification |
| `/api/notifications/clear-all` | POST | useAnimeData.ts | 425 | Clear all notifications |

### Settings & Utilities Endpoints
| Endpoint | Method | Component/Hook | Line | Purpose |
|----------|--------|----------------|------|---------|
| `/api/settings` | GET | useSettings.ts | 5 | Get setting by key |
| `/api/settings` | POST | useSettings.ts | 14 | Update setting |
| `/api/settings` | POST | TitlePreferenceToggle.tsx | 55 | Update title preference |
| `/api/settings` | POST | WatchlistSettings.tsx | 37 | Update settings |
| `/api/settings` | POST | usePlayerData.ts | 348 | Update preferred source |
| `/api/settings?key=titlePreference` | GET | TitlePreferenceContext.tsx | 26 | Get title preference |
| `/api/settings?key=skipRemoveConfirmation` | GET | WatchlistSettings.tsx | 13 | Get skip confirmation |
| `/api/settings?key=preferredSource` | GET | usePlayerData.ts | 236 | Get preferred source |
| `/api/installation-id` | GET | Settings.tsx | 44 | Get installation ID |
| `/api/installation-id` | GET | useTelemetry.ts | 52 | Get hardware-based ID |
| `/api/backup-db` | GET | Settings.tsx | 108 | Backup database |
| `/api/restore-db` | POST | Settings.tsx | 138 | Restore database |
| `/api/import/mal-xml` | POST | MAL.tsx | 39 | Import MAL XML |
| `/api/insights` | GET | Insights.tsx | 61 | Get watch insights |
| `/api/discord/status` | POST | App.tsx | 27 | Update Discord RPC |
| `/api/discord/clear` | POST | useVideoPlayer.ts | 466 | Clear Discord RPC |
| `/api/image-proxy` | GET | utils.ts | 12, 66, 77 | Proxy images |

---

## 2. OAUTH-RELATED FILES TO REMOVE/MODIFY

### Files to DELETE Completely:
1. **`/client/src/components/settings/GoogleAuthSettings.tsx`** (340 lines)
   - Google OAuth login/logout UI
   - Client ID/Secret configuration

2. **`/client/src/components/settings/GoogleAuthSettings.module.css`** (3591 bytes)
   - Styles for Google auth component

3. **`/client/src/components/settings/GitHubSyncSettings.tsx`** (227 lines)
   - GitHub device flow OAuth
   - GitHub sync UI

4. **`/client/src/components/settings/RcloneSettings.tsx`** (131 lines)
   - Rclone remote configuration

5. **`/client/src/components/settings/SyncProviderSelector.tsx`** (143 lines)
   - Sync provider selection dropdown

### Files to MODIFY:

#### `/client/src/pages/Settings.tsx`
**Lines to remove:**
- Line 6: `import GitHubSyncSettings from '../components/settings/GitHubSyncSettings'`
- Line 7: `import GoogleAuthSettings from '../components/settings/GoogleAuthSettings'`
- Line 9: `import RcloneSettings from '../components/settings/RcloneSettings'`
- Line 10: `import SyncProviderSelector from '../components/settings/SyncProviderSelector'`
- Line 15: `import { deleteTelemetryData } from '../hooks/useTelemetry'`
- Line 23: Type definition - remove `'sync'` from SettingsTab union
- Line 29: Remove `'sync'` from validation array
- Line 36-41: Remove telemetry state
- Line 43-55: Remove installation ID fetch
- Line 75-81: Remove toggleTelemetry function
- Line 95: Remove `'sync'` from validation array
- Line 238-293: Remove telemetry toggle section
- Line 327-335: Remove sync tab case (lines 327-335)
- Line 374: Update subtitle text (remove "and data synchronization")
- Line 385-390: Remove sync sidebar button

#### `/client/src/hooks/useTelemetry.ts`
**Action:** DELETE entire file (88 lines)
- Contains telemetry ping logic
- Installation ID generation
- External telemetry URL POST

#### `/client/src/components/layout/Header.tsx`
**Lines to modify:**
- Line 11-16: Remove UserProfile interface
- Line 18-43: Remove fetchSyncProfile function
- Line 54-58: Remove useQuery for sync profile
- Line 122-135: Replace sync profile icon with static settings icon

**Replace lines 122-135 with:**
```tsx
<Link to="/settings" className={styles.profileBtn} aria-label="Settings">
  <FaCog />
</Link>
```

#### `/client/src/App.tsx`
**Lines to remove:**
- Line 7: `import { useTelemetry } from './hooks/useTelemetry'`
- Line 57: `useTelemetry()`

---

## 3. AUTHENTICATION STATE MANAGEMENT

### Current Implementation:

**No centralized auth state** - Each component fetches independently:

1. **Google Auth State:**
   - Stored server-side (sessions)
   - Client checks via `/api/auth/user` (returns User object or null)
   - User object shape: `{ name: string, email: string }`

2. **GitHub Auth State:**
   - Stored server-side (sessions)
   - Client checks via `/api/auth/github/status`
   - Returns: `{ authenticated: boolean, user: GitHubUser | null }`

3. **Sync Provider State:**
   - Active provider stored in server config
   - Client fetches via `/api/auth/settings/sync`
   - Returns: `{ activeProvider: string, actualActiveProvider: string, authenticatedProviders: { github: boolean, google: boolean, rclone: boolean } }`

### Auth Failure Handling:

**403 AUTH_REQUIRED Pattern:**
- Location: `usePlayerData.ts` lines 46-52
- When fetching fails with 403 status
- Checks for `error === 'AUTH_REQUIRED'` in response body
- Shows AnimePaheCookieModal for provider auth
- **NOT related to Google/GitHub OAuth**

**No 401/403 redirects for OAuth** - Components just show "not signed in" state

---

## 4. FETCH CALL PATTERNS

### Pattern 1: Simple GET with Error Handling
```typescript
// useSettings.ts line 4-11
const fetchSettings = async (key: string) => {
  const response = await fetch(`/api/settings?key=${key}`)
  if (!response.ok) {
    throw new Error('Failed to fetch settings')
  }
  return response.json()
}
```

### Pattern 2: POST with JSON Body
```typescript
// useAnimeData.ts line 171-177
const response = await fetch('/api/queue/add', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(item),
})
if (!response.ok) throw new Error('Failed to update queue')
return response.json()
```

### Pattern 3: Custom Headers (AnimePahe)
```typescript
// usePlayerData.ts line 36-44
const fetchApi = async (url: string) => {
  const headers: Record<string, string> = {}
  const animepaheUa = localStorage.getItem('animepahe_ua')
  const animepaheCookie = localStorage.getItem('animepahe_cookie')
  
  if (animepaheUa) headers['x-animepahe-ua'] = animepaheUa
  if (animepaheCookie) headers['x-animepahe-cookie'] = animepaheCookie
  
  const response = await fetch(url, { headers })
  // ... error handling
}
```

### Pattern 4: React Query Hook Pattern
```typescript
// useAnimeData.ts line 48-52
export const usePopularAnime = (timeframe: string) => {
  return useQuery<Anime[]>({
    queryKey: ['popular', timeframe],
    queryFn: () => fetchApi(`/api/popular/${timeframe}`),
  })
}
```

### Pattern 5: Mutation with Optimistic Update
```typescript
// useAnimeData.ts line 233-263
export const useReorderQueue = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (items) => {
      const response = await fetch('/api/queue/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
      if (!response.ok) throw new Error('Failed to reorder queue')
    },
    onMutate: async (items) => {
      // Cancel in-flight queries
      await queryClient.cancelQueries({ queryKey: ['queue'] })
      // Save previous state
      const previousQueue = queryClient.getQueryData(['queue'])
      // Optimistically update
      queryClient.setQueryData(['queue'], (old) => { /* ... */ })
      return { previousQueue }
    },
    onError: (_error, _items, context) => {
      // Rollback on error
      if (context?.previousQueue) 
        queryClient.setQueryData(['queue'], context.previousQueue)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['queue'] })
    },
  })
}
```

### Pattern 6: File Upload (FormData)
```typescript
// Settings.tsx line 129-154
const handleRestore = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0]
  if (!file) return
  
  const formData = new FormData()
  formData.append('dbfile', file)
  
  const response = await fetch('/api/restore-db', {
    method: 'POST',
    body: formData,
  })
  
  const result = await response.json()
  // ... handle result
}
```

### Pattern 7: Beacon (Fire-and-Forget)
```typescript
// useVideoPlayer.ts line 466
const payload = JSON.stringify({ sessionId })
const blob = new Blob([payload], { type: 'application/json' })
navigator.sendBeacon('/api/discord/clear', blob)
```

---

## 5. TELEMETRY IMPLEMENTATION DETAILS

### Data Collected:
1. **Installation ID** - Hardware-based unique ID (fallback to UUID)
2. **App Version** - From package.json
3. **User Agent** - Privacy-friendly browser/OS string
4. **Timestamps** - First seen, last seen (24-hour interval)

### Storage:
- `localStorage.getItem('telemetry_enabled')` - User opt-in/out
- `localStorage.getItem('installation_id')` - Persistent ID
- `localStorage.getItem('last_telemetry_ping')` - Rate limiting

### External Endpoint:
- `VITE_TELEMETRY_URL` environment variable
- POST with no-cors mode
- Location: `useTelemetry.ts` line 5, 68

---

## 6. INSTALLATION ID USAGE

### Two Separate Systems:

1. **Server Installation ID** (`/api/installation-id`):
   - Used in Settings.tsx line 44
   - Displayed to user in settings UI
   - Stored in localStorage as fallback

2. **Telemetry Installation ID**:
   - Generated client-side or fetched from `/api/installation-id`
   - Used only for telemetry pings
   - useTelemetry.ts lines 48-66

**Both can be removed** when removing OAuth/telemetry features.

---

## 7. REMOVAL CHECKLIST

### Phase 1: Delete OAuth Components
- [ ] Delete `GoogleAuthSettings.tsx`
- [ ] Delete `GoogleAuthSettings.module.css`
- [ ] Delete `GitHubSyncSettings.tsx`
- [ ] Delete `RcloneSettings.tsx`
- [ ] Delete `SyncProviderSelector.tsx`

### Phase 2: Delete Telemetry
- [ ] Delete `useTelemetry.ts`
- [ ] Remove useTelemetry() call from App.tsx
- [ ] Remove telemetry section from Settings.tsx

### Phase 3: Clean Settings Page
- [ ] Remove sync tab from Settings.tsx
- [ ] Remove installation ID fetch
- [ ] Remove sync-related imports
- [ ] Update SettingsTab type definition
- [ ] Remove sync sidebar button
- [ ] Update page subtitle

### Phase 4: Update Header
- [ ] Remove sync profile query
- [ ] Replace user avatar icon with static settings icon
- [ ] Remove UserProfile interface
- [ ] Remove fetchSyncProfile function
- [ ] Update Link to point to `/settings` (not `/settings?tab=sync`)

### Phase 5: Verify No Lingering References
- [ ] Search codebase for "google" (case-insensitive)
- [ ] Search codebase for "github" (case-insensitive)
- [ ] Search codebase for "rclone" (case-insensitive)
- [ ] Search codebase for "sync" (case-insensitive)
- [ ] Search codebase for "telemetry" (case-insensitive)
- [ ] Search codebase for "installation-id" or "installation_id"

---

## 8. FIND/REPLACE PATTERNS

### Pattern 1: Remove OAuth imports
```regex
import.*from.*['"](\.\.\/)?components\/settings\/(Google|GitHub|Rclone|SyncProvider).*['"]
```

### Pattern 2: Remove telemetry imports
```regex
import.*useTelemetry.*from.*['"].*useTelemetry['"]
```

### Pattern 3: Find sync provider references
```regex
(sync|Sync|SYNC).*[Pp]rovider
```

### Pattern 4: Find auth endpoints
```regex
['"`]/api/auth/
```

### Pattern 5: Find installation ID references
```regex
installation[_-]?id
```

---

## 9. API ENDPOINTS SUMMARY BY CATEGORY

**Total Unique Endpoints: 62**

- **Authentication/OAuth**: 16 endpoints (ALL TO BE REMOVED)
- **Watchlist**: 6 endpoints
- **Player/Video**: 10 endpoints
- **Continue Watching**: 5 endpoints
- **Queue**: 6 endpoints
- **Anime Data**: 7 endpoints
- **Notifications**: 3 endpoints
- **Settings/Utilities**: 9 endpoints

---

## 10. KEY INSIGHTS

1. **No JWT/Token Auth**: All auth is session-based server-side
2. **No Auth Headers**: Fetch calls don't include Authorization headers
3. **No Global Auth State**: Each component independently checks auth status
4. **React Query Everywhere**: All data fetching uses @tanstack/react-query
5. **Optimistic Updates**: Queue and watchlist use optimistic UI updates
6. **No Error Boundaries for Auth**: Components just show "sign in" state when not authenticated
7. **Telemetry is Optional**: User can disable via settings toggle
8. **Installation ID has Dual Purpose**: Both telemetry and display in settings

