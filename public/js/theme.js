const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

const savedTheme = localStorage.getItem('cloudpulse-theme');

const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);

    themeIcon.className = theme === 'dark'
        ? 'fa-solid fa-sun'
        : 'fa-solid fa-moon';

    localStorage.setItem('cloudpulse-theme', theme);
}

applyTheme(savedTheme || preferredTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');

    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
});