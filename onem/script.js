import { questions2 } from "./questionsc2.js";
import { questions1 } from "./questionsc1.js";
import { questions3 } from "./questionsc3.js";
import { questions4 } from "./questionsc4.js";
import { questions5 } from "./questionsc5.js";
import { questions6 } from "./questionsc6.js";
import { questions7 } from "./questionsc7.js";
import { questions8 } from "./questionsc8.js";
import { questions9 } from "./questionsc9.js";
import { questions10 } from "./questionsc10.js";
import { questions11 } from "./questionsc11.js";
import { questions12 } from "./questionsc12.js";
const startBtn = document.querySelector(".start-btn");
const popupInfo = document.querySelector(".popup-info");
const exitBtn = document.querySelector(".exit-btn");
const main = document.querySelector(".main");
const continueBtn = document.querySelector(".continue-btn");
const quizSelection = document.querySelector(".quiz-section");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
// const tryAgainBtn = document.querySelector(".tryAgain-btn");
// const goHomebtn = document.querySelector(".goHome-btn");
let oneTimeSuffle = false;
let selectedOption;

// Assuming you have individual question arrays for each chapter like questions1, questions2, ..., questions12

const questions = {
  questions1: questions1,
  questions2: questions2,
  questions3: questions3,
  questions4: questions4,
  questions5: questions5,
  questions6: questions6,
  questions7: questions7,
  questions8: questions8,
  questions9: questions9,
  questions10: questions10,
  questions11: questions11,
  questions12: questions12,
};



let finalQuestions = [];

// Randomly select 12 questions from the first 12 chapters
for (let i = 1; i <= 12; i++) {
  const currentQuestions = questions[`questions${i}`];

  if (currentQuestions && currentQuestions.length > 0) {
    const randomIndex = Math.floor(Math.random() * currentQuestions.length);
    const selectedRandomQuestion = currentQuestions.splice(randomIndex, 1)[0];
    finalQuestions.push(selectedRandomQuestion);
  } else {
    console.error(`No questions found for chapter ${i}`);
  }
}

// Randomly select 8 more questions from any chapter
const remainingQuestions = Object.values(questions)
  .flat()
  .filter((question) => !finalQuestions.includes(question));

for (let i = 0; i < 8; i++) {
  if (remainingQuestions.length > 0) {
    const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
    const selectedRandomQuestion = remainingQuestions.splice(randomIndex, 1)[0];
    finalQuestions.push(selectedRandomQuestion);
  } else {
    console.error("Insufficient questions for additional random selection.");
    break;
  }
}



// -------------------------------------------------------------------------

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// -------------------------------------------------------------------------

let startTime;

startBtn.onclick = () => {
  popupInfo.classList.add("active");
  main.classList.add("active");
};

exitBtn.onclick = () => {
  popupInfo.classList.remove("active");
  main.classList.remove("active");
};

continueBtn.onclick = () => {
  quizSelection.classList.add("active");
  popupInfo.classList.remove("active");
  main.classList.remove("active");
  quizBox.classList.add("active");

  startTime = new Date();

  showQuestions(0);
  questionCounter(1);

};




window.addEventListener("load", function () {
  loader.style.display = "none";
});

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextBtn = document.querySelector(".next-btn");

nextBtn.onclick = () => {
  if (questionCount < finalQuestions.length - 1) {
    let correctAnswer = finalQuestions[questionCount].answer;
    if (selectedOption == correctAnswer) {
      userScore += 1;
      
    }

    questionCount++;
    showQuestions(questionCount);

    questionNumb++;
    questionCounter(questionNumb);

    nextBtn.classList.remove("active");
  } else {
    showResultBox();
  }
};

const optionList = document.querySelector(".option-list");

function optionSelected(answer) {
  selectedOption = answer.dataset.name;

  const option = document.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].classList.remove("selected");
  }
  answer.classList.add("selected");
  nextBtn.classList.add("active");
}

function showQuestions(index) {
  if (!oneTimeSuffle) {
    for (let i = finalQuestions.length - 1; i >= 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [finalQuestions[i], finalQuestions[j]] = [
        finalQuestions[j],
        finalQuestions[i],
      ];
    }
    oneTimeSuffle = true;
  }

  const questionText = document.querySelector(".question-text");
  questionText.innerHTML = `${finalQuestions[index].numb}. <img src='./${finalQuestions[index].questions}' atl='question ${finalQuestions[index].numb}'/>`;
  let optionTag = `<div class="option" data-name="${finalQuestions[index].options[0]}"><span><img src="./${finalQuestions[index].options[0]}" alt="option 1"/></span></div>
           <div class="option" data-name="${finalQuestions[index].options[1]}"><span><img src="./${finalQuestions[index].options[1]}"alt="option 2"/></span></div>
           <div class="option" data-name="${finalQuestions[index].options[2]}"><span><img src="./${finalQuestions[index].options[2]}" alt="option 3"/></span></div>
           <div class="option" data-name="${finalQuestions[index].options[3]}"><span><img src="./${finalQuestions[index].options[3]}" alt="option 4"/></span></div>`;
  optionList.innerHTML = optionTag;

  const option = document.querySelectorAll(".option");
  option.forEach((opt) => {
    opt.addEventListener("click", function () {
      optionSelected(this);
    });
  });
}

function questionCounter(index) {
  const questionTotal = document.querySelector(".question-total");

  questionTotal.textContent = `${index} of ${finalQuestions.length} Questions`;
}




function showResultBox() {
  quizBox.classList.remove("active");
  resultBox.classList.add("active");

  const scoreText = document.querySelector(".score-text");
  scoreText.textContent = `Your Score ${userScore} out of ${finalQuestions.length}`;

  const circularProgress = document.querySelector(".circular-progress");
  const progressValue = document.querySelector(".progress-value");

  let progressStartValue = -1;
  let progressEndValue = (userScore / finalQuestions.length) * 100;
  let speed = 20;

  let progress = setInterval(() => {
    progressStartValue++;
    progressValue.textContent = `${progressStartValue}%`;
    circularProgress.style.background = `conic-gradient( var(--color) ${
      progressStartValue * 3.6
    }deg, rgba(255,255,255,.1) 0deg)`;
    if (progressStartValue == progressEndValue) {
      clearInterval(progress);
    }
  }, speed);

  



  const resultQuestions = document.querySelector(".result-questions");
  finalQuestions.forEach((question, index) => {
    const questionResultItem = document.createElement("div");
    questionResultItem.classList.add("question-result-item");
    questionResultItem.innerHTML = `<p><strong>Question ${index + 1}:</strong></p>`;

    // Display the question
    const questionImage = document.createElement("img");
    questionImage.src = `./${question.questions}`;
    questionImage.alt = `Question ${index + 1}`;
    questionResultItem.appendChild(questionImage);

    question.options.forEach((option, optionIndex) => {
      const optionResultItem = document.createElement("div");
      optionResultItem.classList.add("option-result-item");

      if (option === question.answer) {
        const correctOptionItem = document.createElement("div");
        correctOptionItem.classList.add("correct-option-item");
        correctOptionItem.innerHTML = `<img src="./${question.options[optionIndex]}" alt="option ${optionIndex + 1}" class="correct-option" />`;
        questionResultItem.appendChild(correctOptionItem);
      }

      if (question.userAnswer === option) {
        const userSelectedOptionItem = document.createElement("div");
        userSelectedOptionItem.classList.add("user-selected-option-item");
        userSelectedOptionItem.innerHTML = `<img src="./${question.options[optionIndex]}" alt="option ${optionIndex + 1}" class="user-selected-option" />`;
        questionResultItem.appendChild(userSelectedOptionItem);
      }
    });
    resultQuestions.appendChild(questionResultItem);
  });

  
}

const myButton = document.getElementById('start-btn');
myButton.addEventListener('click', () => {
  setTimeout(() => {
    // This function will be called after 15 minutes
    console.log('15 minutes have passed');
    showResultBox()
   
  },   15 * 60 * 1000); // Convert 15 minutes to milliseconds


});

let timerInterval;
let minutes = 0;
let seconds = 0;

const startButton = document.getElementById('start-btn');
startButton.addEventListener('click', startTimer);

const stopButton = document.getElementById('stopButton');
stopButton.addEventListener('click', stopTimer);

const timerDisplay = document.getElementById('timerDisplay');

function startTimer() {
  timerInterval = setInterval(() => {
    seconds++;
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
    updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function updateTimerDisplay() {
  let minutesDisplay = minutes.toString().padStart(2, '0');
  let secondsDisplay = seconds.toString().padStart(2, '0');
  timerDisplay.textContent = `${minutesDisplay}:${secondsDisplay}`;
}