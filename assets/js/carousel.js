$(document).ready(function () {
  let $carouselTrack = $(".carousel-track");
  let $cards = $(".card-blood");
  let cardCount = $cards.length;
  let currentIndex = 0;
  let cardWidth = $cards.length ? $cards.outerWidth(true) : 0;
  const visibleCards = 3;
  let maxIndex = Math.max(0, cardCount - visibleCards);

  function updateCarousel() {
    $cards = $(".card-blood");
    cardCount = $cards.length;
    cardWidth = $cards.length ? $cards.outerWidth(true) : 0;
    maxIndex = Math.max(0, cardCount - visibleCards);
    currentIndex = Math.min(currentIndex, maxIndex);
    const translateX = -currentIndex * cardWidth;
    $carouselTrack.css("transform", `translateX(${translateX}px)`);
    updateButtons();
  }

  function updateButtons() {
    const $prevButton = $(".carousel-btn.prev");
    const $nextButton = $(".carousel-btn.next");

    if (cardCount === 0) {
      $prevButton
        .prop("disabled", true)
        .css({ opacity: "0.5", cursor: "not-allowed" })
        .attr("aria-disabled", "true");
      $nextButton
        .prop("disabled", true)
        .css({ opacity: "0.5", cursor: "not-allowed" })
        .attr("aria-disabled", "true");
      return;
    }

    if (currentIndex === 0) {
      $prevButton
        .prop("disabled", true)
        .css({ opacity: "0.5", cursor: "not-allowed" })
        .attr("aria-disabled", "true");
    } else {
      $prevButton
        .prop("disabled", false)
        .css({ opacity: "1", cursor: "pointer" })
        .attr("aria-disabled", "false");
    }

    if (currentIndex >= maxIndex) {
      $nextButton
        .prop("disabled", true)
        .css({ opacity: "0.5", cursor: "not-allowed" })
        .attr("aria-disabled", "true");
    } else {
      $nextButton
        .prop("disabled", false)
        .css({ opacity: "1", cursor: "pointer" })
        .attr("aria-disabled", "false");
    }
  }

  function loadCards() {
    const jsonPath = window.location.hostname.includes("vercel.app")
      ? "https://sewaras.vercel.app/assets/data/bloodAvailability.json"
      : "./assets/data/bloodAvailability.json";

    $.getJSON(jsonPath)
      .done(function (data) {
        $carouselTrack.empty();
        $.each(data, function (index, item) {
          const totalStock = Object.values(item.stok).reduce((sum, val) => sum + val, 0);
          const card = `
            <div class="card-blood">
              <img src="${item.gambar}" alt="${item.nama}" />
              <div class="card-content-blood">
                <h3>${item.nama}</h3>
                <a href="${item.kontak}">Tersedia ${totalStock} Kantung Darah <i class="bi bi-arrow-right"></i></a>
              </div>
            </div>
          `;
          $carouselTrack.append(card);
        });

        $cards = $(".card-blood");
        cardCount = $cards.length;
        maxIndex = Math.max(0, cardCount - visibleCards);
        currentIndex = Math.min(currentIndex, maxIndex);
        updateCarousel();
      })
      .fail(function (jqxhr, textStatus, error) {
        console.error("Error loading JSON:", textStatus, error);
        $carouselTrack.html("<p>Gagal memuat data. Cek konsol untuk detail.</p>");
      });
  }

  $(".carousel-btn.next").on("click", function (e) {
    if ($(this).prop("disabled")) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateCarousel();
    }
  });

  $(".carousel-btn.prev").on("click", function (e) {
    if ($(this).prop("disabled")) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  loadCards();
  updateCarousel();

  $(".carousel-btn").on("click", function (e) {
    if ($(this).prop("disabled")) {
      e.preventDefault();
      e.stopPropagation();
    }
  });

  $(window).on("resize", function () {
    const newCardWidth = $cards.length ? $cards.outerWidth(true) : 0;
    if (newCardWidth !== cardWidth) {
      cardWidth = newCardWidth;
      updateCarousel();
    }
  });

  window.reinitializeCarousel = function () {
    $cards = $(".card-blood");
    cardCount = $cards.length;
    maxIndex = Math.max(0, cardCount - visibleCards);
    currentIndex = Math.min(currentIndex, maxIndex);
    updateCarousel();
  };
});