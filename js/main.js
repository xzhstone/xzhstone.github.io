/* ============================================
   个人博客 - main.js v2
   主题切换、标签筛选、移动端菜单、
   阅读进度条、返回顶部
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMobileMenu();
  initTagFilter();
  initReadingProgress();
  initBackToTop();
});

/* ---------- 明暗主题切换 ---------- */
function initTheme() {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;

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

/* ---------- 移动端菜单 ---------- */
function initMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const links = document.querySelector(".nav-links");
  if (!btn || !links) return;

  btn.addEventListener("click", () => {
    links.classList.toggle("open");
    btn.setAttribute("aria-expanded", links.classList.contains("open"));
  });

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

      const countEl = document.getElementById("post-count");
      if (countEl) {
        countEl.textContent = `${count} 篇文章`;
      }
    });
  });
}

/* ---------- 阅读进度条 ---------- */
function initReadingProgress() {
  const article = document.querySelector(".post-body");
  if (!article) return; // 只在文章页启用

  // 创建进度条
  const bar = document.createElement("div");
  bar.className = "reading-progress";
  bar.id = "reading-progress";
  document.body.prepend(bar);

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
        bar.style.width = progress + "%";
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* ---------- 返回顶部按钮 ---------- */
function initBackToTop() {
  // 只在文章页或页面较长时启用
  const btn = document.createElement("button");
  btn.className = "back-to-top";
  btn.id = "back-to-top";
  btn.innerHTML = "&#8593;";
  btn.setAttribute("aria-label", "返回顶部");
  document.body.appendChild(btn);

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 400) {
          btn.classList.add("visible");
        } else {
          btn.classList.remove("visible");
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
