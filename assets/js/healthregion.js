$(document).ready(function () {
  const $markers = $(".marker");
  const $container = $("#info-cards");

  function renderCards(filter = "all") {
    $container.empty();

    $markers.each(function () {
      const $m = $(this);
      const nama = $m.data("nama");
      const type = $m.data("type");
      const status = $m.data("status");
      const img = $m.data("img") || "https://placehold.co/400x400";

      if (filter === "all" || type === filter) {
        const $card = $(`
          <div class="card-health">
            <img src="${img}" alt="${nama}" />
            <div class="card-content-health">
              <h3>${nama}</h3>
              <span>${type} <span class="shape ${status}"></span></span>
            </div>
          </div>
        `);
        $container.append($card);
      }
    });
  }

  window.showAll = function () {
    renderCards("all");
    setActiveBtn(0);
  };

  window.filterData = function (type) {
    renderCards(type);
    setActiveBtn(type === "Kelembaban" ? 1 : 2);
  };

  function setActiveBtn(index) {
    $(".btn-filter").removeClass("active").eq(index).addClass("active");
  }

  $markers.on("click", function () {
    const $m = $(this);
    alert(
      `${$m.data("nama")}\n${$m.data("type").toUpperCase()} - ${$m.data(
        "status"
      )}`
    );
  });

  renderCards();
});
