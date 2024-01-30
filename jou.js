const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const submitButton = document.getElementById('submit-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const userInput = document.getElementById('user-answer');
const resultContainer = document.getElementById('result-container');

let currentQuestionIndex = 0;
let userAnswers = [];

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', nextQuestion);
submitButton.addEventListener('click', checkAnswer);

function startGame() {
  console.log('Game Started');
  startButton.classList.add('hide');
  questionContainerElement.classList.remove('hide');
  resultContainer.classList.add('hide');

  // Reset user answers
  userAnswers = [];

  // Hide the result container
  resultContainer.classList.add('hide');

  // Hide h1 and p texts
  document.querySelector('.start-container h1').classList.add('hide');
  document.querySelector('.start-container p').classList.add('hide');

  nextQuestion();
}

function nextQuestion() {
  if (currentQuestionIndex < questions.length) {
    showQuestion(questions[currentQuestionIndex]);
  } else {
    // If all questions answered, show results
    showResult();
  }
}

function showQuestion(question) {
  // Reset user input and hide submit button
  userInput.value = '';
  submitButton.classList.remove('hide');

  questionElement.innerText = question.question;
  userInput.classList.remove('hide');
}

function checkAnswer() {
  // Store user's answer
  userAnswers.push(userInput.value);

  // Move to the next question
  currentQuestionIndex++;
  nextQuestion();
}

function showResult() {
  const userScoreElement = document.getElementById('user-score');
  const correctAnswers = calculateUserScore();
  userScoreElement.innerText = `Score: ${correctAnswers}/${questions.length}`;

  resultContainer.innerHTML = ''; // Clear previous results

  questions.forEach((question, index) => {
    const result = document.createElement('p');
    result.innerText = `Question ${index + 1}: ${question.question} - Your answer: ${
      userAnswers[index] === question.correctAnswer ? 'Correct' : 'Wrong'
    }`;
    resultContainer.appendChild(result);
  });

  resultContainer.classList.remove('hide');
}

function calculateUserScore() {
  let score = 0;
  questions.forEach((question, index) => {
    if (userAnswers[index] === question.correctAnswer) {
      score++;
    }
  });
  return score;
}

// Play again functionality
const playAgainButton = document.getElementById('play-again-btn');
playAgainButton.addEventListener('click', startGame);
