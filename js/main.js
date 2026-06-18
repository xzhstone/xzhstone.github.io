/* ============================================
   个人博客 - main.js
   主题切换、标签筛选、移动端菜单
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMobileMenu();
  initTagFilter();
});

/* ---------- 明暗主题切换 ---------- */
function initTheme() {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;

  // 读取偏好
  const saved = localStorage.getItem("blog-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (saved === "dark" || (!saved && prefersDark)) {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
  } else {
    document.documentElement.classList.add("light");
    document.documentElement.classList.remove("dark");
  }

  btn.addEventListener("click", () => {
    const isDark = document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", !isDark);
    document.documentElement.classList.toggle("light", isDark);
    localStorage.setItem("blog-theme", isDark ? "light" : "dark");
  });
}

/* ---------- 移动端汉堡菜单 ---------- */
function initMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const links = document.querySelector(".nav-links");
  if (!btn || !links) return;

  btn.addEventListener("click", () => {
    links.classList.toggle("open");
    btn.setAttribute("aria-expanded", links.classList.contains("open"));
  });

  // 点击外部关闭
  document.addEventListener("click", (e) => {
    if (!btn.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    }
  });
}

/* ---------- 标签筛选 ---------- */
function initTagFilter() {
  const filter = document.getElementById("tags-filter");
  if (!filter) return;

  const buttons = filter.querySelectorAll("button");
  const items = document.querySelectorAll(".post-item");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const tag = btn.dataset.tag;
      let count = 0;

      items.forEach((item) => {
        if (tag === "all") {
          item.style.display = "block";
          count++;
        } else {
          const itemTags = Array.from(item.querySelectorAll(".post-tag")).map(
            (el) => el.textContent.trim()
          );
          if (itemTags.includes(tag)) {
            item.style.display = "block";
            count++;
          } else {
            item.style.display = "none";
          }
        }
      });

      // 更新计数
      const countEl = document.getElementById("post-count");
      if (countEl) {
        countEl.textContent = `${count} 篇文章`;
      }
    });
  });
}
