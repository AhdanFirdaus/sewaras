let questions = [];
let current = 0;
let answers = [];
let score = 0;
let timeLeft = 60;
let timer = null;

const $intro = $("#intro");
const $quizSection = $(".quiz-section").eq(1);
const $quizCard = $quizSection.find(".quiz-card");
const $timerSection = $(".timer-section");
const $time = $("#time");

const $question = $("#question");
const $options = $("#options");
const $prev = $("#prevBtn");
const $next = $("#nextBtn");

const $result = $("#result");
const $scoreText = $("#scoreText");
const $review = $("#answerReview");

const $start = $("#startBtn");
const $cancel = $("#cancelBtn");
const $restart = $("#restartBtn");

function resetState() {
  current = 0;
  answers = [];
  score = 0;
  timeLeft = 60;
}

function updateTimer() {
  let m = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  let s = String(timeLeft % 60).padStart(2, "0");
  $time.text(`${m}:${s}`);
}

function startTimer() {
  clearInterval(timer);
  updateTimer();
  timer = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) finishQuiz();
  }, 1000);
}

function renderQuestion() {
  const q = questions[current];
  $question.text(q.q);
  $options.empty();

  q.opts.forEach(opt => {
    $("<div>")
      .addClass("option")
      .text(opt)
      .toggleClass("selected", answers[current] === opt)
      .on("click", () => {
        answers[current] = opt;
        renderQuestion();
      })
      .appendTo($options);
  });

  $prev.prop("disabled", current === 0);
  $next.html(current === questions.length - 1 
    ? '<i class="bi bi-check2"></i>' 
    : '<i class="bi bi-chevron-right"></i>'
  );
}

function startQuiz() {
  resetState();
  $result.hide();
  $quizCard.show().addClass("zoom-in");
  renderQuestion();
  startTimer();
}

function finishQuiz() {
  clearInterval(timer);
  $quizCard.addClass("zoom-out").one("animationend", () => {
    $quizCard.hide().removeClass("zoom-out");
    $result.show().addClass("zoom-in");

    score = answers.reduce((acc, ans, i) => acc + (ans === questions[i].ans ? 1 : 0), 0);
    $scoreText.text(`Skor kamu: ${score} dari ${questions.length}`);
    $review.empty();

    questions.forEach((q, i) => {
      let $li = $("<li>");
      if (answers[i] === q.ans) {
        $li.text(`✅ ${q.q} -> ${q.ans}`).addClass("correct");
      } else {
        $li.text(`❌ ${q.q} -> Jawaban kamu: ${answers[i] || "-"}, benar: ${q.ans}`).addClass("wrong");
      }
      $review.append($li);
    });
  });
}

$next.on("click", () => {
  current < questions.length - 1 ? (current++, renderQuestion()) : finishQuiz();
});
$prev.on("click", () => {
  if (current > 0) { current--; renderQuestion(); }
});

$restart.on("click", () => {
  $result.addClass("zoom-out").one("animationend", () => {
    $result.hide().removeClass("zoom-out");
    $quizCard.show().addClass("zoom-in");
    startQuiz();
  });
});

$start.on("click", () => {
  $intro.hide();
  $quizSection.show();
  $timerSection.show();
  startQuiz();
});

$cancel.on("click", () => {
  clearInterval(timer);
  $quizSection.hide();
  $quizCard.hide();
  $result.hide();
  $timerSection.hide();
  $intro.show();
  resetState();
  updateTimer();
});

fetch("questions.json")
  .then(res => res.json())
  .then(data => {
    questions = data;
    updateTimer();
  })
  .ca
