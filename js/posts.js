/* ============================================
   博客文章加载与渲染
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
      .map(
        (post) => `
        <a href="${post.file}" class="post-item">
          <div class="post-meta">
            <span class="post-date">${formatDate(post.date)}</span>
            <div class="post-tags">
              ${post.tags.map((t) => `<span class="post-tag">${t}</span>`).join("")}
            </div>
          </div>
          <h2>${post.title}</h2>
          <p>${post.excerpt}</p>
        </a>
      `
      )
      .join("");

    // 更新计数
    const countEl = document.getElementById("post-count");
    if (countEl) {
      countEl.textContent = `${posts.length} 篇文章`;
    }

    // 触发动画（重新赋值后需要重新触发布局）
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
