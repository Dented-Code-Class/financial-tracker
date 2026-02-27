# Financial Tracker — Frontend

Overview

- React single-page app for the Financial Tracker.
- Features: signup, login, view/add/edit/delete financial records, summaries.

Tech stack

- React (Create React App or Vite)
- Bootstrap (or React-Bootstrap)
- Axios for HTTP requests
- React Router for navigation

Getting started
Prerequisites: Node.js (16+).

1. Install

```bash
cd frontend
npm install
```

2. Environment
   Create a `.env` (or `.env.local`) with:

```
REACT_APP_API_URL=http://localhost:5000/api
```

3. Run

```bash
npm start
# build for production
npm run build
```

Usage

- The app uses `REACT_APP_API_URL` to call backend endpoints.
- On login, store JWT in `localStorage` and send `Authorization: Bearer <token>` header.

Folder structure (suggested)

- `src/components` — UI components (Auth, Records, Layout)
- `src/services` — API wrapper using Axios
- `src/pages` — main views (Dashboard, Login, Signup)

Notes

- Keep secrets out of frontend code; only store API URLs.
- For production, serve static build and secure the API.
