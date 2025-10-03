$(document).ready(function () {
  $(".input-field")
    .on("focus", function () {
      $(this).addClass("active");
    })
    .on("blur", function () {
      if ($(this).val() === "") {
        $(this).removeClass("active");
      }
    });

  $(".toggle").on("click", function () {
    $("main").toggleClass("sign-up-mode");
  });

  $(".bullets span").on("click", function () {
    let index = $(this).data("value");

    $(".image").removeClass("show");
    $(`.img-${index}`).addClass("show");

    $(".text-group").css("transform", `translateY(${-(index - 1) * 2.2}rem)`);

    $(".bullets span").removeClass("active");
    $(this).addClass("active");
  });
});
