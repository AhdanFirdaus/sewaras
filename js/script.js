$(function () {
  const $toggle = $('#menu-toggle');
  const $navLinks = $('#nav-links');
  const $menuIcon = $('#menu-icon');
  const $track = $('.carousel-track');
  const $prevBtn = $('.prev');
  const $nextBtn = $('.next');
  const $cards = $('.card-blood');

  let index = 0;
  let startX = 0;
  let isDragging = false;
  let currentTranslate = 0;
  let prevTranslate = 0;

  function updateCarousel() {
    const cardWidth = $cards.eq(0).outerWidth(true);
    currentTranslate = -index * cardWidth;
    prevTranslate = currentTranslate;
    $track.css('transform', `translateX(${currentTranslate}px)`);
  }

  function getX(e) {
    return e.type.includes('mouse') ? e.pageX : e.originalEvent.touches[0].clientX;
  }

  function startDrag(e) {
    isDragging = true;
    startX = getX(e);
    $track.css('transition', 'none');
  }

  function drag(e) {
    if (!isDragging) return;
    const x = getX(e);
    $track.css('transform', `translateX(${prevTranslate + (x - startX)}px)`);
  }

  function endDrag(e) {
    if (!isDragging) return;
    isDragging = false;
    const x = getX(e);
    const moved = x - startX;
    const threshold = $cards.eq(0).outerWidth() / 4;
    if (moved < -threshold && index < $cards.length - 1) index++;
    if (moved > threshold && index > 0) index--;
    $track.css('transition', 'transform 0.3s ease');
    updateCarousel();
  }

  // Toggle Menu
  $toggle.on('click', function () {
    $navLinks.toggleClass('show');
    $menuIcon.toggleClass('bi-list bi-x');
  });

  // Button Next & Prev
  $prevBtn.on('click', function () {
    if (index > 0) index--;
    updateCarousel();
  });
  $nextBtn.on('click', function () {
    if (index < $cards.length - 1) index++;
    updateCarousel();
  });

  // Drag / Swipe Events
  $track.on('mousedown touchstart', startDrag);
  $track.on('mousemove touchmove', drag);
  $track.on('mouseup mouseleave touchend', endDrag);

  // Resize Event
  $(window).on('resize', updateCarousel);

  // Inisialisasi
  updateCarousel();
});
