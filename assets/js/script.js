$(function () {
  const $track = $(".carousel-track");
  const $prevBtn = $(".prev");
  const $nextBtn = $(".next");
  const $cards = $(".card-blood");
  const $faqItems = $(".faq-item");

  let index = 0,
    startX = 0,
    isDragging = false;
  let currentTranslate = 0,
    prevTranslate = 0;

  const cardWidth = () => $cards.eq(0).outerWidth(true);

  const updateCarousel = () => {
    currentTranslate = -index * cardWidth();
    prevTranslate = currentTranslate;
    $track.css({
      transform: `translateX(${currentTranslate}px)`,
      transition: "transform 0.3s ease",
    });
  };

  const getX = (e) =>
    e.type.includes("mouse") ? e.pageX : e.originalEvent.touches[0].clientX;

  const startDrag = (e) => {
    isDragging = true;
    startX = getX(e);
    $track.css("transition", "none");
  };

  const drag = (e) => {
    if (!isDragging) return;
    const x = getX(e);
    $track.css("transform", `translateX(${prevTranslate + (x - startX)}px)`);
  };

  const endDrag = (e) => {
    if (!isDragging) return;
    isDragging = false;
    const moved = getX(e) - startX;
    const threshold = cardWidth() / 4;

    if (moved < -threshold && index < $cards.length - 1) index++;
    if (moved > threshold && index > 0) index--;

    updateCarousel();
  };

  $prevBtn.on("click", () => {
    if (index > 0) index--;
    updateCarousel();
  });

  $nextBtn.on("click", () => {
    if (index < $cards.length - 1) index++;
    updateCarousel();
  });

  $track
    .on("mousedown touchstart", startDrag)
    .on("mousemove touchmove", drag)
    .on("mouseup mouseleave touchend", endDrag);

  $(window).on("resize", updateCarousel);

  $(".faq-question").on("click", function () {
    const $parent = $(this).parent(".faq-item");
    const $icon = $(this).find("i");

    $faqItems
      .not($parent)
      .removeClass("active")
      .find(".faq-answer")
      .slideUp()
      .end()
      .find("i")
      .removeClass("bi-dash")
      .addClass("bi-plus");

    $parent
      .toggleClass("active")
      .find(".faq-answer")
      .stop(true, true)
      .slideToggle();

    $icon.toggleClass("bi-plus bi-dash");
  });

  updateCarousel();
});
