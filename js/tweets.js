import { STORAGE_KEYS, SEED_TWEETS } from "./data.js";
import { getStoredUser } from "./auth.js";

const MAX_CHARS = 280;

function getTweets() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TWEETS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    /* fall through to seed */
  }
  localStorage.setItem(STORAGE_KEYS.TWEETS, JSON.stringify(SEED_TWEETS));
  return [...SEED_TWEETS];
}

function saveTweets(tweets) {
  localStorage.setItem(STORAGE_KEYS.TWEETS, JSON.stringify(tweets));
}

function getLikes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LIKES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function toggleLike(tweetId) {
  const likes = getLikes();
  const index = likes.indexOf(tweetId);
  if (index === -1) {
    likes.push(tweetId);
  } else {
    likes.splice(index, 1);
  }
  localStorage.setItem(STORAGE_KEYS.LIKES, JSON.stringify(likes));
  return likes.includes(tweetId);
}

function formatTime(timestamp) {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "now";
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  if (days < 7) return `${days}d`;

  return new Date(timestamp).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function formatCount(num) {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return String(num);
}

function createTweet(content) {
  const trimmed = content.trim();
  if (!trimmed) {
    return { success: false, error: "Tweet cannot be empty." };
  }
  if (trimmed.length > MAX_CHARS) {
    return { success: false, error: `Tweet exceeds ${MAX_CHARS} characters.` };
  }

  const user = getStoredUser();
  if (!user) {
    return { success: false, error: "You must be logged in to tweet." };
  }

  const tweet = {
    id: crypto.randomUUID(),
    author: {
      name: user.name,
      handle: user.handle,
      avatar: user.avatar,
    },
    content: trimmed,
    timestamp: Date.now(),
    likes: 0,
    retweets: 0,
    replies: 0,
  };

  const tweets = getTweets();
  tweets.unshift(tweet);
  saveTweets(tweets);

  return { success: true, tweet };
}

function getCharCounterClass(remaining) {
  if (remaining < 0) return "danger";
  if (remaining <= 20) return "warning";
  return "";
}

function simulateNetworkDelay(ms = 600) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export {
  MAX_CHARS,
  getTweets,
  createTweet,
  toggleLike,
  getLikes,
  formatTime,
  formatCount,
  getCharCounterClass,
  simulateNetworkDelay,
};
