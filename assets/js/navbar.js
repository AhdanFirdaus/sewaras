$(function () {
  const $toggle   = $('#menu-toggle');
  const $navLinks = $('#nav-links');
  const $menuIcon = $('#menu-icon');

  $toggle.on('click', () => {
    $navLinks.toggleClass('show');
    $menuIcon.toggleClass('bi-list bi-x');
  });
});
