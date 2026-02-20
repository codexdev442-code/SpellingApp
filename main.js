let startTimer = 60;
let currentScore = 0;
let highScore = 0;
let clicked = true;
let currentWord = "";
let fetchedWords = [];

const startBtn = document.getElementById("start");
const timer = document.querySelector(".timer");
const score = document.querySelector(".score");
const checked = document.querySelector(".check");
const feedback = document.querySelector(".feedback");
const highScoreDisplay = document.querySelector(".highScore");

function fetchWord(){
fetch("https://api.api-ninjas.com/v2/randomword" 
, {
  headers: {
    "X-Api-Key": "HjZf9CQYygRVhNU06idBg5rfqdjHv6lm9Pl4yPPk"
  }
})
  .then(response => response.json())
  .then(data =>{
    currentWord = data[0]
    console.log(currentWord)
    speak(currentWord);
    fetchedWords.push(currentWord);
  }).catch(error => {
    console.log(error)
    alert("Check your internet connection");
  }
  )
}

startBtn.addEventListener("click", () =>{
  if(clicked){
    checked.disabled = false;
    fetchedWords = [];
    fetchWord();
    startBtn.textContent = "Stop";
    startBtn.style.background = "red";
    clicked = false;
    interval = setInterval( () =>{
      startTimer -= 1;
      if(startTimer <= 0){
        clearInterval(interval);
        checked.disabled = true;
        if (currentScore > highScore) {
          highScore = currentScore;
          highScoreDisplay.textContent = highScore;
        }
        startTimer = 60;
        timer.textContent = startTimer;
        startBtn.textContent = "Start";
        startBtn.style.background = "#3b82f6";
        score.textContent = 0;
        clicked = true;
      }
      timer.textContent = startTimer;
    }, 1000)
  } else {
    startBtn.textContent = "Start";
    startBtn.style.background = "#3b82f6";
    clicked = true;
    clearInterval(interval);
    startTimer = 60;
    timer.textContent = startTimer;
  };
});

function check(){
  setTimeout(fetchWord, 1500);
  const answerInput = document.getElementById("answer");
  const answer = answerInput.value;

  if (currentWord.toLowerCase() === answer.trim().toLowerCase()) {
    currentScore += 5;
    score.textContent = currentScore;
    feedback.textContent = "Correct";
    feedback.style.color = "#22c55e";
  } else {
    feedback.textContent = "Wrong";
    feedback.style.color = "red";
  }

// clear the input
answerInput.value = "";
}
function speak(word){
  const speech = new SpeechSynthesisUtterance(word);
  speechSynthesis.speak(speech);
}
function repeat(){
  speak(currentWord)
}
function correction(){
   alert(fetchedWords)
}
// Save highScore
localStorage.setItem("highScore", highScore);

// Load highScore on page load
highScore = localStorage.getItem("highScore") || 0;
highScoreDisplay.textContent = highScore;