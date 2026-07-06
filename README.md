# Twitter Timeline Clone (Zaio Project)

A fully responsive Twitter/X home timeline clone built with vanilla HTML, CSS, and JavaScript. No build step required — open in a browser or use a local server.

## Quick Start

### Option A: Live Server (recommended)
If you have VS Code, install the **Live Server** extension, right-click `index.html`, and choose **Open with Live Server**.

### Option B: Python
```bash
cd Twitter
python -m http.server 8080
```
Then open http://localhost:8080

### Option C: Node (if installed)
```bash
npx serve .
```

> **Note:** ES modules require a local server. Opening `index.html` directly from the file system may block module loading in some browsers.

## Demo Login

| Username | Password |
|----------|----------|
| `demo`   | `demo123`  |
| `zaio`   | `zaio123`  |

You can also create a new account via the sign-up form on the login page.

---

## Project Structure

```
Twitter/
├── index.html          # Entry point
├── css/
│   ├── variables.css   # Theme tokens (light + dark ready)
│   └── main.css        # Layout, components, responsive rules
├── js/
│   ├── app.js          # Router, event bindings, app shell
│   ├── auth.js         # Login/signup (Cursor feature)
│   ├── components.js   # UI render functions
│   ├── dark-mode.js    # MANUAL FEATURE — implement yourself!
│   ├── data.js         # Seed tweets, trends, demo users
│   ├── icons.js        # Inline SVG icons
│   └── tweets.js       # Tweet CRUD, char limit, formatting
└── README.md
```

---

## Features Checklist (Assignment Mapping)

### Base Project (40 marks)
- Home timeline — scrollable feed with seeded + user tweets
- Left sidebar — navigation, Post button, user menu
- Right sidebar — search, Trends for you, Who to follow
- Tweet compose box — inline on home feed with 280-char counter (color shifts at 20 / 0)
- Loading states — spinner while feed loads
- Error handling — banner when tweet post fails + retry
- Responsive — 3-column desktop to single column + bottom nav on mobile; scales up on 4K
- Accessibility — keyboard focus on tweets, ARIA labels, semantic HTML

### Cursor-Built Features (20 marks)
1. **Login page** (`#/login`) — sign in, sign up, demo accounts, auth guard
2. **Explore page** (`#/explore`) — trending tabs, news cards, live search filter
3. **Tweet popup modal** — Post button opens modal compose (desktop sidebar + mobile FAB)

### Manual Feature — YOU implement (15 marks)
**Dark mode toggle** in `js/dark-mode.js`

CSS is already wired in `css/variables.css` under `[data-theme="dark"]`. Your job:
1. Read/save preference in `localStorage` key `twitter_clone_theme`
2. Toggle `data-theme="dark"` on `<html>`
3. Wire up `#dark-mode-toggle` and `#dark-mode-toggle-mobile`
4. Bonus: respect `prefers-color-scheme` on first visit

**Do not use Cursor for this file** — that's the point of the assignment!

---

## Loom Video Guide (15 marks)

Keep it **under 5 minutes**. Suggested structure:

| Time | What to show |
|------|----------------|
| 0:00–0:30 | Quick tour: home feed, sidebars, mobile responsive |
| 0:30–1:30 | **Manual feature** — open `dark-mode.js`, explain your code, toggle dark mode live |
| 1:30–2:30 | **Login page** — demo login, sign up, logout via user menu |
| 2:30–3:30 | **Explore page** — tabs, search, trending list |
| 3:30–4:30 | **Tweet modal** — click Post, compose, submit, see it in feed |
| 4:30–5:00 | Optional Cursor roast + wrap up |

---

## Browser Support

Chrome, Edge, Firefox, Safari (modern versions).
