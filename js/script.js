const toggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const menuIcon = document.getElementById('menu-icon');

toggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
  menuIcon.classList.toggle('bi-list');
  menuIcon.classList.toggle('bi-x');
});
