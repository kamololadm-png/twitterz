const STORAGE_KEYS = {
  USER: "twitter_clone_user",
  TWEETS: "twitter_clone_tweets",
  LIKES: "twitter_clone_likes",
  FOLLOWS: "twitter_clone_follows",
};

const DEMO_USERS = [
  { username: "demo", password: "demo123", name: "Demo User", handle: "demo", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo" },
  { username: "zaio", password: "zaio123", name: "Zaio Student", handle: "zaio_dev", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zaio" },
];

const SEED_TWEETS = [
  {
    id: "1",
    author: { name: "Elon Musk", handle: "elonmusk", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=elon" },
    content: "Just shipped another feature. The future is going to be wild 🚀",
    timestamp: Date.now() - 3600000,
    likes: 12400,
    retweets: 3200,
    replies: 890,
  },
  {
    id: "2",
    author: { name: "Zaio Academy", handle: "zaio_academy", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zaioacademy" },
    content: "Building a Twitter clone is the best way to learn frontend dev. Who's shipping their project this week? #Zaio #WebDev",
    timestamp: Date.now() - 7200000,
    likes: 542,
    retweets: 128,
    replies: 45,
  },
  {
    id: "3",
    author: { name: "React Dev", handle: "reactjs", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=react" },
    content: "Pro tip: use semantic HTML and keyboard navigation. Your users (and accessibility auditors) will thank you.",
    timestamp: Date.now() - 14400000,
    likes: 8900,
    retweets: 2100,
    replies: 312,
  },
  {
    id: "4",
    author: { name: "Design Daily", handle: "designdaily", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=design" },
    content: "Clean UI = happy users. Responsive design isn't optional in 2026 — your cousin's old Android deserves love too 📱",
    timestamp: Date.now() - 28800000,
    likes: 2341,
    retweets: 567,
    replies: 89,
  },
  {
    id: "5",
    author: { name: "Tech Trends", handle: "techtrends", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tech" },
    content: "Dark mode toggle implemented without AI? That's the real flex. 💻 #CodingChallenge",
    timestamp: Date.now() - 43200000,
    likes: 1567,
    retweets: 423,
    replies: 156,
  },
];

const TRENDING = [
  { category: "Technology · Trending", name: "#ZaioProject", count: "12.4K posts" },
  { category: "Trending in South Africa", name: "#WebDevelopment", count: "8,291 posts" },
  { category: "Technology · Trending", name: "Cursor AI", count: "45.2K posts" },
  { category: "Trending", name: "#DarkMode", count: "3,847 posts" },
  { category: "Programming · Trending", name: "JavaScript", count: "22.1K posts" },
];

const WHO_TO_FOLLOW = [
  { name: "Zaio Academy", handle: "zaio_academy", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zaioacademy" },
  { name: "Frontend Masters", handle: "frontendmasters", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=fm" },
  { name: "CSS Tricks", handle: "css", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=css" },
];

const EXPLORE_NEWS = [
  { title: "Students build Twitter clones that feel real", source: "Tech Education · 2h", image: "https://picsum.photos/seed/news1/160/160" },
  { title: "Why responsive design still matters on 4K monitors", source: "Design Weekly · 4h", image: "https://picsum.photos/seed/news2/160/160" },
  { title: "AI pair programming: Cursor vs raw human power", source: "Dev Culture · 6h", image: "https://picsum.photos/seed/news3/160/160" },
  { title: "The art of the 280-character tweet", source: "Social Media · 8h", image: "https://picsum.photos/seed/news4/160/160" },
];

export { STORAGE_KEYS, DEMO_USERS, SEED_TWEETS, TRENDING, WHO_TO_FOLLOW, EXPLORE_NEWS };
