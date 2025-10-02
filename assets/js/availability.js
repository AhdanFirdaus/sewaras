let currentSlide = 0;
let slidesData = [];

function loadSlides() {
  $.getJSON("/assets/data/bloodAvailability.json")
    .done(function (data) {
      slidesData = data;
      renderSlides();
      showSlide(0);
      updateNavButtons();
    })
    .fail(function () {
      $("#slides-container").html("<p>Gagal memuat data.</p>");
    });
}

function renderSlides() {
  const $container = $("#slides-container");
  $container.empty();

  $.each(slidesData, function (index, rs) {
    const stocksHtml = $.map(rs.stok, function (jumlah, gol) {
      return `<div class="stock-card">${gol}<br>${jumlah}<small>kantong</small></div>`;
    }).join("");

    const slide = `
      <div class="slide">
        <h2>${rs.nama}</h2>
        <div class="hospital">
          <div class="image-container">
            <img src="${rs.gambar}" alt="${rs.nama}">
            <a href="${rs.kontak}" class="btn btn-contact">Hubungi RS</a>
          </div>
          <div class="stocks">
            ${stocksHtml}
          </div>
        </div>
      </div>
    `;
    $container.append(slide);
  });

  $("#lastUpdate").text("Terakhir diperbarui " + slidesData[0].update);
}

function showSlide(index) {
  if (index >= 0 && index < slidesData.length) {
    currentSlide = index;
    $(".slide").removeClass("active").eq(index).addClass("active");
    $("#lastUpdate").text("Terakhir diperbarui " + slidesData[index].update);
    updateNavButtons();
  }
}

function updateNavButtons() {
  const prevButton = $(".carousel-btn[onclick='prevSlide()']");
  const nextButton = $(".carousel-btn[onclick='nextSlide()']");

  if (currentSlide === 0) {
    prevButton
      .prop("disabled", true)
      .css({ opacity: "0.7", cursor: "not-allowed" })
      .attr("aria-disabled", "true");
  } else {
    prevButton
      .prop("disabled", false)
      .css({ opacity: "1", cursor: "pointer" })
      .attr("aria-disabled", "false");
  }

  if (currentSlide === slidesData.length - 1) {
    nextButton
      .prop("disabled", true)
      .css({ opacity: "0.7", cursor: "not-allowed" })
      .attr("aria-disabled", "true");
  } else {
    nextButton
      .prop("disabled", false)
      .css({ opacity: "1", cursor: "pointer" })
      .attr("aria-disabled", "false");
  }
}

function nextSlide() {
  if (currentSlide < slidesData.length - 1) {
    showSlide(currentSlide + 1);
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    showSlide(currentSlide - 1);
  }
}

$(document).ready(function () {
  loadSlides();

  $(".carousel-btn").on("click", function (e) {
    if ($(this).prop("disabled")) {
      e.preventDefault();
      e.stopPropagation();
    }
  });
});