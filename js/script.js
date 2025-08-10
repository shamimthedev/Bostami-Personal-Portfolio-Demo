document.addEventListener('DOMContentLoaded', function() {
  const themeToggles = document.querySelectorAll('#themeToggle, #themeToggleDesktop');
  const themeIcons = document.querySelectorAll('#themeIcon, #themeIconDesktop');
  const body = document.body;

  // Check for saved user preference or use system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    enableDarkMode();
  }

  // Toggle theme on button click (both buttons)
  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      if (body.classList.contains('dark-mode')) {
        disableDarkMode();
      } else {
        enableDarkMode();
      }
    });
  });

  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const newPref = e.matches ? 'dark' : 'light';
    if (newPref === 'dark') {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  });

  function enableDarkMode() {
    body.classList.add('dark-mode');
    body.classList.remove('light-mode');
    themeIcons.forEach(icon => {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    });
    localStorage.setItem('theme', 'dark');
  }

  function disableDarkMode() {
    body.classList.add('light-mode');
    body.classList.remove('dark-mode');
    themeIcons.forEach(icon => {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    });
    localStorage.setItem('theme', 'light');
  }
});