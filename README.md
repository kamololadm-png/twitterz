# Twitter Timeline Clone (Zaio Project)

A responsive Twitter/X home timeline clone built with vanilla HTML, CSS, and JavaScript. No build step required — open in a browser or use a local server.

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

---

## Project Structure

```
Twitter/
├── index.html      # Home timeline (entry point)
├── login.html      # Login page (Cursor-assisted)
├── explore.html    # Explore page (Cursor-assisted)
├── styles.css      # Layout, components, responsive rules
├── darkmode.css    # Theme tokens (light + dark)
├── login.css       # Login page styles
├── darkmode.js     # MANUAL FEATURE — dark mode toggle, implemented by hand
├── tweet.js        # Tweet posting, char limit, like toggle
└── README.md
```

---

## Features Checklist (Assignment Mapping)

### Base Project (40 marks)
- Home timeline — scrollable feed with seeded tweets
- Left sidebar — navigation, Tweet button, profile card
- Right sidebar — search box, trending topics
- Tweet compose box — inline on home feed with 280-char counter (turns red under 20 remaining)
- Like toggle — heart fills in and count updates on click
- Responsive — 3-column desktop, condensed icon-only sidebar on tablet, bottom nav on mobile
- Accessibility — semantic HTML, ARIA labels on search and tab controls

### Cursor-Assisted Pages (20 marks)
1. **Login page** (`login.html`) — sign-in form UI with username/password fields, forgot password link, create-account option
2. **Explore page** (`explore.html`) — filter tabs (For You, Trending, News, Sports, Entertainment), trending topic grid, "What's happening" panel

### Manual Feature — implemented by hand (15 marks)
**Dark mode toggle** in `darkmode.js`

Theme variables live in `darkmode.css` under `[data-theme="light"]` and `[data-theme="dark"]`. The script:
1. Reads/saves the preference in `localStorage` under the `theme` key
2. Toggles `data-theme` on `<html>`
3. Wires up the `#darkToggle` button (icon + label swap between moon/sun)
4. Applies the saved theme automatically on page load

**Built without Cursor** — that's the point of the assignment.

---

## Loom Video Guide (15 marks)

Keep it **under 5 minutes**. Suggested structure:

| Time | What to show |
|------|----------------|
| 0:00-0:30 | Quick tour: home feed, sidebars, mobile responsive |
| 0:30-1:30 | Manual feature - open darkmode.js, explain your code, toggle dark mode live |
| 1:30-2:30 | Login page - walk through the sign-in form |
| 2:30-3:30 | Explore page - filter tabs, trending grid |
| 3:30-4:30 | Tweet flow - compose a tweet, like a tweet, see it update live |
| 4:30-5:00 | Optional Cursor roast and wrap up |

---

## Browser Support

Chrome, Edge, Firefox, Safari (modern versions).