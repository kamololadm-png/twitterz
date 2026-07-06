function toggleDark() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';

  html.setAttribute('data-theme', isDark ? 'light' : 'dark');

  document.getElementById('darkIcon').textContent  = isDark ? '🌙' : '☀️';
  document.getElementById('darkLabel').textContent = isDark ? 'Dark mode' : 'Light mode';

  localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

// Apply saved theme on page load
(function () {
  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  if (saved === 'dark') {
    document.getElementById('darkIcon').textContent  = '☀️';
    document.getElementById('darkLabel').textContent = 'Light mode';
  }
})();