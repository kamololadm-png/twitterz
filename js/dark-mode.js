/**
 * MANUAL FEATURE (No Cursor) — Dark Mode Toggle
 * =============================================
 * This file is intentionally left for YOU to implement by hand.
 * Worth 15 marks (10 base + 5 bonus for a polished toggle).
 *
 * CSS variables for dark theme are already defined in css/variables.css
 * under [data-theme="dark"]. Your job:
 *
 * 1. Read saved preference from localStorage key "twitter_clone_theme"
 * 2. Apply data-theme="dark" or remove it on document.documentElement
 * 3. Wire up #dark-mode-toggle click to toggle theme and save preference
 * 4. Optional bonus: respect prefers-color-scheme on first visit
 *
 * The toggle button exists in the sidebar and mobile header.
 * DO NOT use Cursor for this file — that's the whole point of the assignment!
 */

export function initDarkMode() {
  const toggles = [
    document.getElementById("dark-mode-toggle"),
    document.getElementById("dark-mode-toggle-mobile"),
  ].filter(Boolean);

  if (!toggles.length) return;

  // TODO: Implement dark mode toggle here (manual feature)
  toggles.forEach((toggle) => {
    toggle.title = "Dark mode — implement me in js/dark-mode.js!";
    toggle.setAttribute("aria-label", "Toggle dark mode — not yet implemented");
  });
}
