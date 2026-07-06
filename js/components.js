import { icons } from "./icons.js";
import {
  MAX_CHARS,
  getTweets,
  createTweet,
  toggleLike,
  getLikes,
  formatTime,
  formatCount,
  getCharCounterClass,
  simulateNetworkDelay,
} from "./tweets.js";
import { TRENDING, WHO_TO_FOLLOW, EXPLORE_NEWS } from "./data.js";
import { getStoredUser, login, signup, logout } from "./auth.js";

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function highlightHashtags(text) {
  return escapeHtml(text).replace(
    /(#\w+)/g,
    '<span class="hashtag-highlight">$1</span>'
  );
}

function renderTweet(tweet, likes) {
  const liked = likes.includes(tweet.id);
  return `
    <article class="tweet" tabindex="0" role="link" aria-label="View tweet by ${escapeHtml(tweet.author.name)}" data-tweet-id="${tweet.id}">
      <img class="user-avatar" src="${escapeHtml(tweet.author.avatar)}" alt="${escapeHtml(tweet.author.name)}" loading="lazy" />
      <div class="tweet-body">
        <div class="tweet-header">
          <span class="tweet-author">${escapeHtml(tweet.author.name)}</span>
          <span class="tweet-handle">@${escapeHtml(tweet.author.handle)}</span>
          <span class="tweet-time">${formatTime(tweet.timestamp)}</span>
        </div>
        <div class="tweet-content">${highlightHashtags(tweet.content)}</div>
        <div class="tweet-actions">
          <button class="tweet-action reply" aria-label="Reply">${icons.reply}<span>${formatCount(tweet.replies)}</span></button>
          <button class="tweet-action retweet" aria-label="Retweet">${icons.retweet}<span>${formatCount(tweet.retweets)}</span></button>
          <button class="tweet-action like ${liked ? "active" : ""}" aria-label="Like" data-like-id="${tweet.id}">${icons.like}<span>${formatCount(tweet.likes + (liked ? 1 : 0))}</span></button>
          <button class="tweet-action share" aria-label="Share">${icons.share}</button>
        </div>
      </div>
    </article>
  `;
}

function renderComposeBox(user, idPrefix = "") {
  return `
    <div class="compose-box" data-compose="${idPrefix}">
      <img class="user-avatar" src="${escapeHtml(user.avatar)}" alt="Your avatar" />
      <div class="compose-input-area">
        <textarea
          class="compose-textarea"
          id="${idPrefix}compose-textarea"
          placeholder="What's happening?"
          aria-label="Tweet text"
          maxlength="${MAX_CHARS + 50}"
          rows="1"
        ></textarea>
        <div class="compose-actions">
          <div class="compose-icons">
            <button type="button" class="compose-icon-btn" aria-label="Add image">${icons.image}</button>
            <button type="button" class="compose-icon-btn" aria-label="Add GIF">${icons.gif}</button>
            <button type="button" class="compose-icon-btn" aria-label="Add emoji">${icons.emoji}</button>
            <button type="button" class="compose-icon-btn" aria-label="Schedule">${icons.schedule}</button>
          </div>
          <div class="compose-submit-area">
            <span class="char-counter" id="${idPrefix}char-counter">${MAX_CHARS}</span>
            <button type="button" class="btn-primary" id="${idPrefix}compose-submit" disabled>Post</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderTrendsWidget() {
  const items = TRENDING.map(
    (t) => `
    <div class="widget-item">
      <div class="trend-category">${escapeHtml(t.category)}</div>
      <div class="trend-name">${escapeHtml(t.name)}</div>
      <div class="trend-count">${escapeHtml(t.count)}</div>
    </div>
  `
  ).join("");

  return `
    <div class="widget">
      <div class="widget-header">Trends for you</div>
      ${items}
      <div class="widget-footer">Show more</div>
    </div>
  `;
}

function renderWhoToFollow() {
  const items = WHO_TO_FOLLOW.map(
    (u) => `
    <div class="widget-item follow-item">
      <img class="user-avatar" src="${escapeHtml(u.avatar)}" alt="${escapeHtml(u.name)}" loading="lazy" />
      <div class="follow-info">
        <div class="user-name">${escapeHtml(u.name)}</div>
        <div class="user-handle">@${escapeHtml(u.handle)}</div>
      </div>
      <button type="button" class="btn-follow" data-handle="${escapeHtml(u.handle)}">Follow</button>
    </div>
  `
  ).join("");

  return `
    <div class="widget">
      <div class="widget-header">Who to follow</div>
      ${items}
      <div class="widget-footer">Show more</div>
    </div>
  `;
}

function renderRightSidebar() {
  return `
    <div class="search-box">
      ${icons.search}
      <input type="search" placeholder="Search" aria-label="Search Twitter" />
    </div>
    ${renderTrendsWidget()}
    ${renderWhoToFollow()}
  `;
}

function renderSidebarLeft(user, activeRoute) {
  const routes = [
    { hash: "#/home", icon: icons.home, label: "Home" },
    { hash: "#/explore", icon: icons.explore, label: "Explore" },
    { hash: "#/notifications", icon: icons.notifications, label: "Notifications" },
    { hash: "#/messages", icon: icons.messages, label: "Messages" },
    { hash: "#/profile", icon: icons.profile, label: "Profile" },
  ];

  const navItems = routes
    .map(
      (r) => `
      <a href="${r.hash}" class="nav-item ${activeRoute === r.hash ? "active" : ""}" data-nav="${r.hash}">
        ${r.icon}
        <span>${r.label}</span>
      </a>
    `
    )
    .join("");

  return `
    <aside class="sidebar-left">
      <a href="#/home" class="logo" aria-label="Home">${icons.logo}</a>
      <nav class="nav-list" aria-label="Primary">${navItems}</nav>
      <button type="button" class="btn-tweet" id="open-tweet-modal">Post</button>
      <div class="user-menu" id="user-menu" role="button" tabindex="0" aria-label="Account menu">
        <img class="user-avatar" src="${escapeHtml(user.avatar)}" alt="${escapeHtml(user.name)}" />
        <div class="user-info">
          <div class="user-name">${escapeHtml(user.name)}</div>
          <div class="user-handle">@${escapeHtml(user.handle)}</div>
        </div>
        ${icons.more}
      </div>
    </aside>
  `;
}

function renderMobileNav(activeRoute) {
  const items = [
    { hash: "#/home", icon: icons.home, label: "Home" },
    { hash: "#/explore", icon: icons.explore, label: "Explore" },
    { hash: "#/notifications", icon: icons.notifications, label: "Notifications" },
    { hash: "#/messages", icon: icons.messages, label: "Messages" },
  ];

  return items
    .map(
      (r) => `
      <a href="${r.hash}" class="mobile-nav-item ${activeRoute === r.hash ? "active" : ""}" aria-label="${r.label}">
        ${r.icon}
      </a>
    `
    )
    .join("");
}

function renderHomeView(user) {
  return `
    <div class="page-header">
      <h1>Home</h1>
      <div class="page-header-actions">
        <button type="button" class="dark-mode-toggle" id="dark-mode-toggle" aria-label="Toggle dark mode">
          ${icons.moon}
        </button>
      </div>
    </div>
    ${renderComposeBox(user, "inline-")}
    <div id="feed-error" class="error-banner hidden" role="alert">
      <span id="feed-error-text">Failed to post tweet.</span>
      <button type="button" id="feed-error-retry">Try again</button>
    </div>
    <div id="feed-loading" class="loading-spinner hidden"><div class="spinner"></div></div>
    <div id="tweet-feed" aria-live="polite"></div>
  `;
}

function renderExploreView() {
  const trends = TRENDING.map(
    (t, i) => `
    <div class="trend-list-item">
      <div class="trend-category">${i + 1} · ${escapeHtml(t.category)}</div>
      <div class="trend-name">${escapeHtml(t.name)}</div>
      <div class="trend-count">${escapeHtml(t.count)}</div>
    </div>
  `
  ).join("");

  const news = EXPLORE_NEWS.map(
    (n) => `
    <div class="explore-news-card">
      <img class="news-image" src="${escapeHtml(n.image)}" alt="" loading="lazy" />
      <div class="news-content">
        <h3>${escapeHtml(n.title)}</h3>
        <div class="news-meta">${escapeHtml(n.source)}</div>
      </div>
    </div>
  `
  ).join("");

  return `
    <div class="page-header">
      <h1>Explore</h1>
      <div class="page-header-actions">
        <button type="button" class="dark-mode-toggle" id="dark-mode-toggle" aria-label="Toggle dark mode">
          ${icons.moon}
        </button>
      </div>
    </div>
    <div class="explore-search-hero">
      <div class="search-box">
        ${icons.search}
        <input type="search" id="explore-search" placeholder="Search Twitter" aria-label="Search" />
      </div>
    </div>
    <div class="explore-tabs" role="tablist">
      <button type="button" class="explore-tab active" data-tab="trending" role="tab">Trending</button>
      <button type="button" class="explore-tab" data-tab="news" role="tab">News</button>
      <button type="button" class="explore-tab" data-tab="sports" role="tab">Sports</button>
    </div>
    <div id="explore-trending-panel">${trends}</div>
    <div id="explore-news-panel" class="hidden">${news}</div>
    <div id="explore-sports-panel" class="hidden">
      <div class="empty-state">
        <h2>Sports</h2>
        <p>Live scores and highlights coming soon.</p>
      </div>
    </div>
  `;
}

function renderLoginView() {
  return `
    <div class="login-page">
      <div class="login-hero">${icons.logo}</div>
      <div class="login-form-section">
        <div class="logo">${icons.logo}</div>
        <h1>Happening now</h1>
        <h2>Join today.</h2>
        <form id="login-form">
          <div class="form-group">
            <label for="login-username">Username</label>
            <input type="text" id="login-username" name="username" autocomplete="username" required />
          </div>
          <div class="form-group">
            <label for="login-password">Password</label>
            <input type="password" id="login-password" name="password" autocomplete="current-password" required />
          </div>
          <p class="form-error hidden" id="login-error" role="alert"></p>
          <button type="submit" class="btn-login">Sign in</button>
        </form>
        <div class="login-divider">or</div>
        <form id="signup-form">
          <div class="form-group">
            <label for="signup-name">Display name</label>
            <input type="text" id="signup-name" name="name" required />
          </div>
          <div class="form-group">
            <label for="signup-handle">Handle</label>
            <input type="text" id="signup-handle" name="handle" placeholder="@username" required />
          </div>
          <div class="form-group">
            <label for="signup-username">Username</label>
            <input type="text" id="signup-username" name="username" required />
          </div>
          <div class="form-group">
            <label for="signup-password">Password</label>
            <input type="password" id="signup-password" name="password" minlength="6" required />
          </div>
          <p class="form-error hidden" id="signup-error" role="alert"></p>
          <button type="submit" class="btn-signup-outline">Create account</button>
        </form>
        <div class="demo-accounts">
          <strong>Demo accounts</strong>
          Username: <code>demo</code> / Password: <code>demo123</code><br />
          Username: <code>zaio</code> / Password: <code>zaio123</code>
        </div>
      </div>
    </div>
  `;
}

function renderTweetModal(user) {
  return `
    <div class="modal-overlay" id="tweet-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="modal">
        <div class="modal-header">
          <button type="button" class="modal-close" id="close-tweet-modal" aria-label="Close">${icons.close}</button>
          <span id="modal-title" class="sr-only">Create a post</span>
        </div>
        <div class="modal-body">
          ${renderComposeBox(user, "modal-")}
          <div id="modal-error" class="form-error hidden" role="alert"></div>
        </div>
      </div>
    </div>
  `;
}

export {
  renderSidebarLeft,
  renderRightSidebar,
  renderMobileNav,
  renderHomeView,
  renderExploreView,
  renderLoginView,
  renderTweetModal,
  renderTweet,
  escapeHtml,
};
