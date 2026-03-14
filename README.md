# 🎨 YouTube Clone — Frontend

Angular single-page application for the YouTube Clone platform. Features a YouTube-inspired UI with dark/light mode, video player, comments, search, and responsive design.

## 🛠️ Tech Stack

- **Angular 17** — Component-based SPA framework
- **Angular Material** — UI component library
- **angular-auth-oidc-client** — Auth0 OIDC integration
- **CSS Custom Properties** — Dynamic dark/light theming
- **Nginx** — Production static file serving + API proxy

## 📁 Project Structure

```
src/app/
├── auth/                    # Auth0 configuration module
├── callback/                # OAuth callback handler
├── header/                  # Top navigation bar + theme toggle
├── sidebar/                 # Side navigation (Home, Trending, etc.)
├── home/                    # Layout wrapper with sidebar
├── featured/                # Main video feed with categories & sorting
├── video-card/              # Video thumbnail card component
├── video-detail/            # Video player page with details
├── video-player/            # Video player wrapper
├── comments/                # Comments section with replies
├── upload-video/            # Video upload page (auth required)
├── save-video-details/      # Video metadata editor (auth required)
├── search-results/          # Search results page
├── channel/                 # User channel/profile page
├── trending/                # Trending videos page
├── subscriptions/           # Subscribed channels page
├── history/                 # Watch history page
├── liked-videos/            # Liked videos page
├── playlist/                # Single playlist view
├── playlist-list/           # All playlists page
├── loading-spinner/         # Loading indicator
├── service/
│   ├── video.service.ts     # Video API calls
│   ├── user.service.ts      # User API calls
│   └── theme.service.ts     # Dark/light mode with localStorage
├── dto/                     # TypeScript interfaces
├── pipes/                   # Custom pipes (timeAgo, etc.)
└── environments/
    ├── environment.ts       # Dev config (localhost:8080)
    └── environment.prod.ts  # Prod config (youtube.mostafadarwesh.com)
```

## ✨ Features

- **🌗 Dark/Light Mode** — Toggle with localStorage persistence, YouTube-matching colors
- **🔍 Search** — Real-time search by title and description
- **📂 Categories** — Filter by Music, Gaming, Education, Entertainment, etc.
- **📊 Sorting** — Sort by newest, most viewed, most liked
- **🔔 Notifications** — Bell icon with unread badge and dropdown
- **🔒 Auth Guards** — Upload routes protected, login required
- **📱 Responsive** — Adapts to different screen sizes

## 🎨 Theming

CSS variables in `styles.css` power the entire theme system:

```css
:root {                          /* Light mode */
    --bg-primary: #ffffff;
    --text-primary: #181818;
    /* ... */
}
[data-theme="dark"] {            /* Dark mode */
    --bg-primary: #0f0f0f;
    --text-primary: #f1f1f1;
    /* ... */
}
```

## 🐳 Docker

Multi-stage build: Node builds the Angular app, then Nginx serves the static files and proxies `/api` to the backend.

## 🏃 Running Locally

```bash
# Requires Node.js 20+
npm install
ng serve
```

Open `http://localhost:4200` — requires backend running on `http://localhost:8080`
