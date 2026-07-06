const tweetInput = document.getElementById('tweetInput');
const charCount  = document.getElementById('charCount');

tweetInput.addEventListener('input', function () {
  const remaining = 280 - this.value.length;
  charCount.textContent = remaining;
  charCount.style.color = remaining < 20 ? '#f4212e' : '';
});

function postTweet() {
  const text = tweetInput.value.trim();
  if (!text) return;

  const timeline = document.getElementById('timeline');

  const card = document.createElement('article');
  card.className = 'tweet-card';
  card.innerHTML = `
    <img src="https://i.pravatar.cc/40?img=12" alt="avatar" class="avatar"/>
    <div class="tweet-body">
      <div class="tweet-meta">
        <span class="tweet-name">Kamogelo D.</span>
        <span class="tweet-handle">@kamogelo_dev</span>
        <span class="tweet-time">· Just now</span>
      </div>
      <p class="tweet-text">${text}</p>
      <div class="tweet-actions">
        <button class="action-btn">💬 <span>0</span></button>
        <button class="action-btn retweet">🔁 <span>0</span></button>
        <button class="action-btn like" onclick="likeToggle(this)">🤍 <span>0</span></button>
      </div>
    </div>
  `;

  timeline.insertBefore(card, timeline.firstChild);

  tweetInput.value = '';
  charCount.textContent = '280';
  charCount.style.color = '';
}

function likeToggle(btn) {
  const countEl = btn.querySelector('span');
  const isLiked = btn.classList.toggle('liked');
  btn.textContent = '';
  const span = document.createElement('span');
  span.textContent = isLiked
    ? parseInt(countEl?.textContent || 0) + 1
    : parseInt(countEl?.textContent || 1) - 1;
  btn.appendChild(document.createTextNode(isLiked ? '❤️ ' : '🤍 '));
  btn.appendChild(span);
}