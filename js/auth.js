import { STORAGE_KEYS, DEMO_USERS, SEED_TWEETS } from "./data.js";

function getStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setStoredUser(user) {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
}

function login(username, password) {
  const match = DEMO_USERS.find(
    (u) => u.username === username.trim().toLowerCase() && u.password === password
  );

  if (!match) {
    return { success: false, error: "Invalid username or password. Try demo / demo123" };
  }

  const user = {
    name: match.name,
    handle: match.handle,
    avatar: match.avatar,
    username: match.username,
  };

  setStoredUser(user);
  return { success: true, user };
}

function signup(name, handle, username, password) {
  if (!name.trim() || !handle.trim() || !username.trim() || !password.trim()) {
    return { success: false, error: "All fields are required." };
  }

  if (password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters." };
  }

  const user = {
    name: name.trim(),
    handle: handle.trim().replace(/^@/, ""),
    username: username.trim().toLowerCase(),
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(handle)}`,
  };

  setStoredUser(user);
  return { success: true, user };
}

function logout() {
  setStoredUser(null);
}

function requireAuth() {
  const user = getStoredUser();
  if (!user) {
    window.location.hash = "#/login";
    return null;
  }
  return user;
}

function initAuthGuard() {
  const hash = window.location.hash || "#/home";
  const publicRoutes = ["#/login"];
  const user = getStoredUser();

  if (!user && !publicRoutes.includes(hash)) {
    window.location.hash = "#/login";
  }

  if (user && hash === "#/login") {
    window.location.hash = "#/home";
  }
}

export { getStoredUser, login, signup, logout, requireAuth, initAuthGuard };
