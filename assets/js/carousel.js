$(function () {
  const $carouselTrack = $(".carousel-track");
  let $cards = $(".card-blood");
  const visibleCards = 3;
  let cardCount = $cards.length;
  let cardWidth = $cards.length ? $cards.outerWidth(true) : 0;
  let currentIndex = 0;
  let maxIndex = Math.max(0, cardCount - visibleCards);

  const setButtonState = ($btn, disabled) => {
    $btn
      .prop("disabled", disabled)
      .css({
        opacity: disabled ? 0.7 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      })
      .attr("aria-disabled", disabled);
  };

  function updateButtons() {
    const $prev = $(".carousel-btn.prev");
    const $next = $(".carousel-btn.next");

    if (!cardCount) {
      setButtonState($prev, true);
      setButtonState($next, true);
      return;
    }
    setButtonState($prev, currentIndex === 0);
    setButtonState($next, currentIndex >= maxIndex);
  }

  function updateCarousel() {
    $cards = $(".card-blood");
    cardCount = $cards.length;
    cardWidth = $cards.length ? $cards.outerWidth(true) : 0;
    maxIndex = Math.max(0, cardCount - visibleCards);
    currentIndex = Math.min(currentIndex, maxIndex);

    $carouselTrack.css(
      "transform",
      `translateX(${-currentIndex * cardWidth}px)`
    );
    updateButtons();
  }

  function loadCards() {
    $.getJSON("./assets/data/bloodAvailability.json")
      .done(function (data) {
        $carouselTrack.empty();

        data.forEach((item) => {
          const totalStock = Object.values(item.stok).reduce(
            (sum, val) => sum + val,
            0
          );
          $carouselTrack.append(`
            <div class="card-blood">
              <img src="${item.gambar}" alt="${item.nama}" />
              <div class="card-content-blood">
                <h3>${item.nama}</h3>
                <a href="${item.kontak}">Tersedia ${totalStock} Kantung Darah <i class="bi bi-arrow-right"></i></a>
              </div>
            </div>
          `);
        });

        updateCarousel();
      })
      .fail((_, textStatus, error) => {
        console.error("Error loading JSON:", textStatus, error);
        $carouselTrack.html("<p>Gagal memuat data.</p>");
      });
  }

  $(".carousel-btn.next").on("click", function (e) {
    if (!$(this).prop("disabled") && currentIndex < maxIndex) {
      currentIndex++;
      updateCarousel();
    } else e.preventDefault();
  });

  $(".carousel-btn.prev").on("click", function (e) {
    if (!$(this).prop("disabled") && currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    } else e.preventDefault();
  });

  $(window).on("resize", () => {
    const newWidth = $cards.length ? $cards.outerWidth(true) : 0;
    if (newWidth !== cardWidth) {
      cardWidth = newWidth;
      updateCarousel();
    }
  });

  window.reinitializeCarousel = updateCarousel;

  loadCards();
  updateCarousel();
});
