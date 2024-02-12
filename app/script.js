var loader = document.getElementById("preloader");

window.addEventListener("load",function(){
    loader.style.display = "none";
})

// -------------------------------------------------------------------------


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// -------------------------------------------------------------------------

let startTime;



const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn'); 
const quizSelection = document.querySelector('.quiz-section'); 
const quizBox = document.querySelector('.quiz-box'); 
const resultBox = document.querySelector('.result-box'); 
const tryAgainBtn = document.querySelector('.tryAgain-btn'); 
const goHomebtn = document.querySelector('.goHome-btn'); 
let oneTimeSuffle = false;
let selectedOption;







startBtn.onclick = () =>{
    popupInfo.classList.add('active');
    main.classList.add('active');
}

exitBtn.onclick = () =>{
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

continueBtn.onclick = () => {
quizSelection.classList.add('active');
popupInfo.classList.remove('active');
main.classList.remove('active');
quizBox.classList.add('active');

startTime = new Date();

showQuestions(0);
questionCounter(1);
headerScore();
}

tryAgainBtn.onclick = () =>{
    quizBox.classList.add('active');
    nextBtn.classList.add('active');
    resultBox.classList.remove('active');
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount); 
    questionCounter(questionNumb);
    headerScore();

    
}


goHomebtn.onclick = () =>{
    quizSelection.classList.remove('active');
    nextBtn.classList.add('active');
    resultBox.classList.remove('active');
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount); 
    questionCounter(questionNumb);
    headerScore();

    
}


var loader = document.getElementById("preloader");

window.addEventListener("load",function(){
    loader.style.display = "none";
})

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn'); 


nextBtn.onclick = () => {
if (questionCount < questions.length - 1){
    let correctAnswer = questions[questionCount].answer;
    console.log(correctAnswer,optionSelected)
    if(selectedOption == correctAnswer){
        userScore += 1;
        headerScore();
    }
    questionCount++;
    showQuestions(questionCount); 

    questionNumb++;
    questionCounter(questionNumb);

    nextBtn.classList.remove('active');
}


else{
    console.log('Quiz compeleted');
    showResultBox();
}
    }


    const optionList = document.querySelector('.option-list'
    
    
    );

    if(oneTimeSuffle){
        for (let i = questions.length - 1; i >= 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [questions[i], questions[j]] = [questions[j], questions[i]];
            
    
                               oneTimeSuffle = true;
    }
    }





    let oneTimeShuffle = false;

function showQuestions(index) {
  if (!oneTimeShuffle) {
    for (let i = questions.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    oneTimeShuffle = true;
  }
      
        const questionText = document.querySelector('.question-text');
        questionText.innerHTML = `${questions[index].numb}. <img src='./${questions[index].questions}' atl='question ${questions[index].numb}'/>`;
        let optionTag =
          `<div class="option" data-name="${questions[index].options[0]}"><span><img src="./${questions[index].options[0]}" alt="option 1"/></span></div>
           <div class="option" data-name="${questions[index].options[1]}"><span><img src="./${questions[index].options[1]}"alt="option 2"/></span></div>
           <div class="option" data-name="${questions[index].options[2]}"><span><img src="./${questions[index].options[2]}" alt="option 3"/></span></div>
           <div class="option" data-name="${questions[index].options[3]}"><span><img src="./${questions[index].options[3]}" alt="option 4"/></span></div>`;
        optionList.innerHTML = optionTag;
        const option = document.querySelectorAll('.option');
        for (let i = 0; i < option.length; i++) {
          option[i].setAttribute('onclick', 'optionSelected (this)');
        }
        
      }

function optionSelected(answer){
    let userAnswer = answer.dataset.name;
    selectedOption = answer.dataset.name;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;


    const option = document.querySelectorAll(".option")
    for(let i=0; i < option.length; i++){
        option[i].classList.remove("selected")
    }
    answer.classList.add('selected')
    
    // console.log({
    //     answer:answer,
    //     userAnswer:userAnswer,
    //     correctAnswer:correctAnswer,
    //     allOptions:allOptions
    // })
    
    // if(userAnswer == correctAnswer){
    //     console.log("correctAnswer");
    //     answer.classList.add('correct');
    //     userScore += 1;
    //     headerScore();
    // }
    // else{
    //     console.log("WrongAnswer");
    //     answer.classList.add('incorrect');
    //     for (let i = 0; i < allOptions; i++){
    //         if(optionList.children[i].dataset.name == correctAnswer) {
    //             optionList.children[i].setAttribute('class','option correct');
    //         }
    //     }

    // }

    // for (let i = 0; i < allOptions; i++){
    //     optionList.children[i].classList.add('disabled');
    // }

    nextBtn.classList.add('active');
}

function questionCounter(index){
    const questionTotal = document.querySelector('.question-total');

    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}


const timeText = document.querySelector('.time-text');
const timeValue = document.querySelector('.time-value');


function showResultBox(){
    quizBox.classList.remove('active');
    resultBox.classList.add('active');


    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');

    let progressStartValue = -1;
    let progressEndValue = (userScore/questions.length) * 100;
    let speed = 20;


    let progress = setInterval(() =>{
        progressStartValue++;

        console.log(progressStartValue);
        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient( var(--color) ${ progressStartValue * 3.6}deg, rgba(255,255,255,.1) 0deg)`;
        if (progressStartValue == progressEndValue){
            clearInterval(progress);
        }
    },speed);

    let endTime = new Date();
    let timeElapsed = endTime - startTime;
    timeElapsed = Math.floor(timeElapsed / 1000); // convert to seconds
    document.getElementById('timeElapsed').textContent = timeElapsed;

    console.log(timeElapsed);

}




