$(document).ready(function () {
  $(".disease-btn").on("click", function () {
    let disease = $(this).data("disease");
    $("#chat-display").html("");
    $("#chat-display").append(`
      <div class="message bot">Halo! Apa keluhan Anda terkait <b>${disease}</b>?</div>
    `);
  });

  $("#send-btn").on("click", function () {
    sendMessage();
  });

  $("#user-input").keypress(function (e) {
    if (e.which === 13) sendMessage();
  });

  function sendMessage() {
    let userMsg = $("#user-input").val().trim();
    if (userMsg === "") return;

    $("#chat-display").append(`
      <div class="message user">${userMsg}</div>
    `);
    $("#user-input").val("");

    $("#chat-display").scrollTop($("#chat-display")[0].scrollHeight);

    setTimeout(() => {
      $("#chat-display").append(`
        <div class="message bot">Terima kasih atas informasi: "${userMsg}". Silakan jelaskan lebih detail.</div>
      `);
      $("#chat-display").scrollTop($("#chat-display")[0].scrollHeight);
    }, 800);
  }
});
