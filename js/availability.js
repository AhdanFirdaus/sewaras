let currentSlide = 0;
let slidesData = [];

function loadSlides() {
  $.getJSON("../data.json")
    .done(function (data) {
      slidesData = data;
      renderSlides();
      showSlide(0);
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
  $(".slide").removeClass("active").eq(index).addClass("active");
  $("#lastUpdate").text("Terakhir diperbarui " + slidesData[index].update);
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slidesData.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slidesData.length) % slidesData.length;
  showSlide(currentSlide);
}

$(document).ready(function () {
  loadSlides();
});
