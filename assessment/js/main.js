const api =
  "https://edu.steamledge.com/assessment/students/ajax.php?getAss&course=2D%20Animation&class=JSS%202";

const ques = document.getElementById("question");
const choices = Array.from(document.querySelectorAll(".choice-text"));

const answerDialog = document.querySelector(".choice-answer");
// console.log(choices)

let currentQuestion = {};
let score = 0;
let questionCounter = 0;
let acceptingAnswers = false;
let availableQuestions = [];

const REWARD = 10;
const max_questions = 10;

async function getData() {
  const response = await fetch(api);
  const data = await response.json();

  const questions = data;

  score = 0;
  questionCounter = 0;
  availableQuestions = [...questions];
  // console.log(availableQuestions);

  getNewQuestion();
}

function getNewQuestion() {
  if (availableQuestions.length === 0 || questionCounter >= max_questions) {
    //go to end Page
    window.alert("yay you have completed your quiz");
  }

  questionCounter++;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  ques.innerHTML = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["opt" + number];
    // console.log(choice);
  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
}

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    // console.log(e.target);
    if (!acceptingAnswers) return;

    acceptingAnswers = false;

    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const correctIn =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    console.log(correctIn);

    selectedChoice.parentElement.classList.add(correctIn);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(correctIn);
      getNewQuestion();
    }, 1000);
  });
});

getData();
