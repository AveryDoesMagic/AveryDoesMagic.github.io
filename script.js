const root = document.documentElement;
const toggle = document.getElementById('themeToggle');

function getSystemPrefersDark() {
  return window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyTheme(theme) {
  if (theme === 'light') {
    root.setAttribute('data-theme', 'light');
  } else if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark');
  } else {
    root.removeAttribute('data-theme');
  }
}

function updateToggleLabel(theme) {
  const iconSpan = document.getElementById('themeToggle-icon');
  const labelSpan = document.getElementById('themeToggle-label');

  const effectiveTheme =
    theme ||
    (getSystemPrefersDark() ? 'dark' : 'light');

  if (effectiveTheme === 'dark') {
    iconSpan.textContent = '🌙';
    labelSpan.textContent = 'Dark';
  } else {
    iconSpan.textContent = '☀️';
    labelSpan.textContent = 'Light';
  }
}

// Initialize theme from localStorage or system
(function initTheme() {
  const stored = localStorage.getItem('igr-theme');
  applyTheme(stored);
  updateToggleLabel(stored);
})();

if (toggle) {
  toggle.addEventListener('click', () => {
    const currentAttr = root.getAttribute('data-theme');
    let nextTheme;

    if (!currentAttr) {
      // Currently following system
      nextTheme = getSystemPrefersDark() ? 'light' : 'dark';
    } else {
      nextTheme = currentAttr === 'dark' ? 'light' : 'dark';
    }

    applyTheme(nextTheme);
    localStorage.setItem('igr-theme', nextTheme);
    updateToggleLabel(nextTheme);
  });
}
