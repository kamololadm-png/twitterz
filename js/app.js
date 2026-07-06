import { icons } from "./icons.js";
import {
  MAX_CHARS,
  getTweets,
  createTweet,
  toggleLike,
  getLikes,
  getCharCounterClass,
  simulateNetworkDelay,
} from "./tweets.js";
import { getStoredUser, login, signup, logout, initAuthGuard } from "./auth.js";
import { initDarkMode } from "./dark-mode.js";
import {
  renderSidebarLeft,
  renderRightSidebar,
  renderMobileNav,
  renderHomeView,
  renderExploreView,
  renderLoginView,
  renderTweetModal,
  renderTweet,
} from "./components.js";

const app = document.getElementById("app");
let pendingTweetText = "";

function getRoute() {
  return window.location.hash || "#/home";
}

function showError(bannerId, textId, message) {
  const banner = document.getElementById(bannerId);
  const text = document.getElementById(textId);
  if (banner && text) {
    text.textContent = message;
    banner.classList.remove("hidden");
  }
}

function hideError(bannerId) {
  document.getElementById(bannerId)?.classList.add("hidden");
}

async function loadFeed() {
  const feed = document.getElementById("tweet-feed");
  const loading = document.getElementById("feed-loading");
  if (!feed) return;

  loading?.classList.remove("hidden");
  feed.innerHTML = "";

  await simulateNetworkDelay(400);

  const tweets = getTweets();
  const likes = getLikes();
  feed.innerHTML = tweets.map((t) => renderTweet(t, likes)).join("");
  loading?.classList.add("hidden");

  bindTweetInteractions(feed);
}

function bindTweetInteractions(container) {
  container.querySelectorAll(".tweet-action.like").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.dataset.likeId;
      toggleLike(id);
      loadFeed();
    });
  });

  container.querySelectorAll(".tweet").forEach((tweetEl) => {
    tweetEl.addEventListener("click", () => {
      /* Tweet detail route not required — visual feedback only */
    });
    tweetEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") tweetEl.click();
    });
  });
}

function bindCompose(prefix, onSuccess) {
  const textarea = document.getElementById(`${prefix}compose-textarea`);
  const counter = document.getElementById(`${prefix}char-counter`);
  const submit = document.getElementById(`${prefix}compose-submit`);
  if (!textarea || !counter || !submit) return;

  const updateCounter = () => {
    const remaining = MAX_CHARS - textarea.value.length;
    counter.textContent = remaining;
    counter.className = `char-counter ${getCharCounterClass(remaining)}`;
    submit.disabled = !textarea.value.trim() || remaining < 0;
  };

  textarea.addEventListener("input", updateCounter);
  updateCounter();

  submit.addEventListener("click", async () => {
    const content = textarea.value;
    submit.disabled = true;
    hideError("feed-error");

    await simulateNetworkDelay(300);
    const result = createTweet(content);

    if (!result.success) {
      pendingTweetText = content;
      if (prefix === "modal-") {
        const modalError = document.getElementById("modal-error");
        if (modalError) {
          modalError.textContent = result.error;
          modalError.classList.remove("hidden");
        }
      } else {
        showError("feed-error", "feed-error-text", result.error);
      }
      submit.disabled = false;
      return;
    }

    textarea.value = "";
    updateCounter();
    document.getElementById("modal-error")?.classList.add("hidden");
    closeTweetModal();
    onSuccess?.();
  });
}

function openTweetModal() {
  const modal = document.getElementById("tweet-modal");
  modal?.classList.add("open");
  document.getElementById("modal-compose-textarea")?.focus();
}

function closeTweetModal() {
  document.getElementById("tweet-modal")?.classList.remove("open");
}

function bindTweetModal() {
  document.getElementById("open-tweet-modal")?.addEventListener("click", openTweetModal);
  document.getElementById("mobile-tweet-fab")?.addEventListener("click", openTweetModal);
  document.getElementById("close-tweet-modal")?.addEventListener("click", closeTweetModal);

  document.getElementById("tweet-modal")?.addEventListener("click", (e) => {
    if (e.target.id === "tweet-modal") closeTweetModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeTweetModal();
  });
}

function bindFollowButtons() {
  document.querySelectorAll(".btn-follow").forEach((btn) => {
    btn.addEventListener("click", () => {
      const following = btn.classList.toggle("following");
      btn.textContent = following ? "Following" : "Follow";
    });
  });
}

function bindUserMenu() {
  const menu = document.getElementById("user-menu");
  if (!menu) return;

  const handleLogout = () => {
    if (confirm("Log out of your account?")) {
      logout();
      window.location.hash = "#/login";
      render();
    }
  };

  menu.addEventListener("click", handleLogout);
  menu.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleLogout();
  });
}

function bindLoginForms() {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");

  loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const errorEl = document.getElementById("login-error");
    const result = login(username, password);

    if (!result.success) {
      errorEl.textContent = result.error;
      errorEl.classList.remove("hidden");
      return;
    }

    errorEl.classList.add("hidden");
    window.location.hash = "#/home";
    render();
  });

  signupForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("signup-name").value;
    const handle = document.getElementById("signup-handle").value;
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;
    const errorEl = document.getElementById("signup-error");
    const result = signup(name, handle, username, password);

    if (!result.success) {
      errorEl.textContent = result.error;
      errorEl.classList.remove("hidden");
      return;
    }

    errorEl.classList.add("hidden");
    window.location.hash = "#/home";
    render();
  });
}

function bindExploreTabs() {
  const tabs = document.querySelectorAll(".explore-tab");
  const panels = {
    trending: document.getElementById("explore-trending-panel"),
    news: document.getElementById("explore-news-panel"),
    sports: document.getElementById("explore-sports-panel"),
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      Object.values(panels).forEach((p) => p?.classList.add("hidden"));
      panels[tab.dataset.tab]?.classList.remove("hidden");
    });
  });

  document.getElementById("explore-search")?.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll(".trend-list-item").forEach((item) => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(query) ? "" : "none";
    });
  });
}

function bindRetry() {
  document.getElementById("feed-error-retry")?.addEventListener("click", () => {
    hideError("feed-error");
    const textarea = document.getElementById("inline-compose-textarea");
    if (textarea && pendingTweetText) {
      textarea.value = pendingTweetText;
      textarea.dispatchEvent(new Event("input"));
      document.getElementById("inline-compose-submit")?.click();
    }
  });
}

function renderPlaceholder(title, message) {
  return `
    <div class="page-header"><h1>${title}</h1></div>
    <div class="empty-state">
      <h2>${title}</h2>
      <p>${message}</p>
    </div>
  `;
}

function render() {
  initAuthGuard();
  const route = getRoute();
  const user = getStoredUser();

  if (route === "#/login") {
    app.innerHTML = renderLoginView();
    bindLoginForms();
    return;
  }

  if (!user) return;

  let mainContent = "";
  switch (route) {
    case "#/explore":
      mainContent = renderExploreView();
      break;
    case "#/notifications":
      mainContent = renderPlaceholder("Notifications", "You're all caught up!");
      break;
    case "#/messages":
      mainContent = renderPlaceholder("Messages", "Select a conversation to start messaging.");
      break;
    case "#/profile":
      mainContent = renderPlaceholder("Profile", `@${user.handle} — looking good!`);
      break;
    default:
      mainContent = renderHomeView(user);
  }

  app.innerHTML = `
    <div class="app-shell">
      ${renderSidebarLeft(user, route)}
      <main class="main-content">${mainContent}</main>
      <aside class="sidebar-right">${renderRightSidebar()}</aside>
    </div>
    <header class="mobile-header">
      <a href="#/home" class="logo" aria-label="Home">${icons.logo}</a>
      <button type="button" class="dark-mode-toggle" id="dark-mode-toggle-mobile" aria-label="Toggle dark mode">
        ${icons.moon}
      </button>
    </header>
    <nav class="mobile-nav" aria-label="Mobile">${renderMobileNav(route)}</nav>
    <button type="button" class="mobile-tweet-fab" id="mobile-tweet-fab" aria-label="Post">${icons.tweet}</button>
    ${renderTweetModal(user)}
  `;

  initDarkMode();
  bindTweetModal();
  bindFollowButtons();
  bindUserMenu();
  bindRetry();

  if (route === "#/home" || route === "#/" || !route.startsWith("#/")) {
    loadFeed();
    bindCompose("inline-", loadFeed);
  }

  if (route === "#/explore") {
    bindExploreTabs();
  }

  bindCompose("modal-", loadFeed);
}

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", render);
