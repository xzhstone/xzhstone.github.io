/* ============================================
   博客文章加载与渲染 v2
   ============================================ */

(async function loadPosts() {
  const listEl = document.querySelector(".posts-list");
  if (!listEl) return;

  try {
    const res = await fetch("posts/index.json");
    if (!res.ok) throw new Error("网络请求失败");
    const posts = await res.json();

    // 按日期降序排列
    posts.sort((a, b) => (a.date < b.date ? 1 : -1));

    listEl.innerHTML = posts
      .map((post) => {
        const primaryTag = post.tags[0] || "";
        const readingTime = estimateReadingTime(post.excerpt);
        return `
        <a href="${post.file}" class="post-item" data-primary-tag="${primaryTag}">
          <div class="post-meta">
            <span class="post-date">${formatDate(post.date)}</span>
            <span class="post-read-time">${readingTime}</span>
            <div class="post-tags">
              ${post.tags.map((t) => `<span class="post-tag" data-tag="${t}">${t}</span>`).join("")}
            </div>
          </div>
          <h2>${post.title}</h2>
          <p>${post.excerpt}</p>
        </a>
      `})
      .join("");

    // 更新计数
    const countEl = document.getElementById("post-count");
    if (countEl) {
      countEl.textContent = `${posts.length} 篇文章`;
    }

    // 触发动画
    requestAnimationFrame(() => {
      document.querySelectorAll(".post-item").forEach((el) => {
        el.style.opacity = "1";
        el.style.animation = "none";
        el.offsetHeight;
        el.style.animation = "";
      });
    });
  } catch (err) {
    console.warn("加载文章列表失败:", err);
    listEl.innerHTML = `<p style="color:var(--text-muted);padding:24px 0;">暂无文章，敬请期待。</p>`;
  }
})();

function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00+08:00");
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y} 年 ${m} 月 ${day} 日`;
}

function estimateReadingTime(text) {
  // 中文约每分钟 350 字，英文约 200 词
  const chineseChars = (text.match(/[\u4e00-\u9fff]/g) || []).length;
  const englishWords = (text.match(/[a-zA-Z]+/g) || []).length;
  const minutes = Math.max(1, Math.round(chineseChars / 350 + englishWords / 200));
  return `${minutes} 分钟阅读`;
}
