let currentSlide = 0;
let slidesData = [];

async function loadSlides() {
  try {
    const res = await fetch("../data.json");
    slidesData = await res.json();
    renderSlides();
    showSlide(0);
  } catch (e) {
    document.getElementById("slides-container").innerHTML =
      "<p>Gagal memuat data.</p>";
  }
}

function renderSlides() {
  const container = document.getElementById("slides-container");
  container.innerHTML = "";
  slidesData.forEach((rs, index) => {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.innerHTML = `
          <h2>${rs.nama}</h2>
          <div class="hospital">
            <div class="image-container">
              <img src="${rs.gambar}" alt="${rs.nama}">
              <a href="${rs.kontak}" class="btn btn-contact">Hubungi RS</a>
            </div>
            <div class="stocks">
              ${Object.entries(rs.stok)
                .map(
                  ([gol, jumlah]) =>
                    `<div class="stock-card">${gol}<br>${jumlah}<small>kantong</small></div>`
                )
                .join("")}
            </div>
          </div>
        `;
    container.appendChild(slide);
  });
  document.getElementById("lastUpdate").textContent =
    "Terakhir diperbarui " + slidesData[0].update;
}

function showSlide(index) {
  const slides = document.querySelectorAll(".slide");
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) slide.classList.add("active");
  });
  document.getElementById("lastUpdate").textContent =
    "Terakhir diperbarui " + slidesData[index].update;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slidesData.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slidesData.length) % slidesData.length;
  showSlide(currentSlide);
}

loadSlides();
