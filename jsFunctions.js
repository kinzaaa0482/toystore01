/* =========================================================
   TOY STORE — GLOBAL JS
========================================================= */

// ── Hamburger menu toggle ──────────────────────────────
function initNavToggle() {
  const toggle = document.querySelector('.menu-toggle');
  const navUl  = document.querySelector('nav ul');
  if (!toggle || !navUl) return;

  toggle.addEventListener('click', () => {
    navUl.classList.toggle('open');
    const isOpen = navUl.classList.contains('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a link is clicked (mobile)
  navUl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navUl.classList.remove('open'));
  });
}

// ── Dark / Light mode toggle ───────────────────────────
function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  const saved = localStorage.getItem('toy-theme') || 'light';
  applyTheme(saved);

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('toy-theme', next);
  });
}

function applyTheme(theme) {
  const btn = document.getElementById('theme-toggle');
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (btn) btn.textContent = '☀️';
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (btn) btn.textContent = '🌙';
  }
}

// ── Table row highlight (click to select) ─────────────
function initTableSelect() {
  document.querySelectorAll('table tbody tr').forEach(row => {
    row.addEventListener('click', () => {
      row.classList.toggle('table-row-selected');
    });
  });
}

// ── Alert auto-dismiss ─────────────────────────────────
function initAlerts() {
  document.querySelectorAll('.alert[data-autodismiss]').forEach(el => {
    const delay = parseInt(el.dataset.autodismiss, 10) || 3000;
    setTimeout(() => {
      el.style.transition = 'opacity 0.4s';
      el.style.opacity    = '0';
      setTimeout(() => el.remove(), 400);
    }, delay);
  });
}

// ── Cart count (simple session storage counter) ────────
function initCart() {
  const badges = document.querySelectorAll('.cart-count');
  const count  = parseInt(sessionStorage.getItem('toy-cart') || '0', 10);
  badges.forEach(b => { b.textContent = count; });

  document.querySelectorAll('[data-add-cart]').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = parseInt(sessionStorage.getItem('toy-cart') || '0', 10);
      const next    = current + 1;
      sessionStorage.setItem('toy-cart', next);
      document.querySelectorAll('.cart-count').forEach(b => { b.textContent = next; });
      btn.textContent = '✅ Added!';
      setTimeout(() => { btn.textContent = '🛒 Add to Cart'; }, 1500);
    });
  });
}

// ── Init all on DOM ready ──────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initThemeToggle();
  initTableSelect();
  initAlerts();
  initCart();
});
