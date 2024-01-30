const questions = [
  { question: 'What is the capital of France?', correctAnswer: 'Paris' },
  { question: 'What is the capital of Estonia?', correctAnswer: 'Tallinn' },
  { question: 'What is the capital of Australia?', correctAnswer: 'Canberra' },
  { question: 'What is the capital of India?', correctAnswer: 'New Delhi' },
  { question: 'What is the capital of Canada?', correctAnswer: 'Ottawa' },
  { question: 'What is the capital of China?', correctAnswer: 'Beijing' },
  { question: 'What is the capital of Germany?', correctAnswer: 'Berlin' },
  { question: 'What is the capital of Spain?', correctAnswer: 'Madrid' },
  { question: 'What is the capital of Italy?', correctAnswer: 'Rome' },
  { question: 'What is the capital of Greece?', correctAnswer: 'Athens' },
];

let currentQuestion = 0; //ensimmäinen kysymys, aloitetaan aina ekasta
let gameState = { // boolean muuttujat jotka seuraavat pelin tilaa. Alustuksen yhteydessä peli ei ole vielä alkanut eikä ole vielä suoritettu, joten molemmat arvot ovat aluksi false.
  started: false,
  completed: false,
};

function createQuestion() {
  const quizContainer = document.getElementById('quiz-container'); //quizContainer-muuttujaan tallennetaan elementti, jonka id on "quiz-container".
  const questionObj = questions[currentQuestion]; //questionObj muuttujaan tallennetaan kysymysobjekti taulukosta questions käyttäen currentQuestion-muuttujaa indeksinä.

  const questionElement = document.createElement('div'); // questionelement muuttujaan luodaan div-elementti.
  questionElement.innerHTML = `<p>${currentQuestion + 1}. ${questionObj.question}</p> 
                              <input type="text" id="answer" placeholder="Answer here...">
                              <button onclick="checkAnswer()">Next question</button>`; //innerHTML-ominaisuudella lisätään p-elementti, joka näyttää kysymyksen ja lisää tekstikentän vastauksen syöttämistä varten.Lisäksi lisätään painike seuraavaa kysymystä varten, joka kutsuu checkAnswer-funktiota.

  // Move to the next question on Enter key
  const answerInput = questionElement.querySelector('#answer');
  // //addEventListener-funktiolla lisätään kuuntelija tekstikentälle, joka tarkkailee näppäimistön painalluksia. Jos käyttäjä painaa Enter-näppäintä, kutsutaan checkAnswer-funktiota.
  answerInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
      checkAnswer();
    }
  });

  quizContainer.innerHTML = ''; // Clear container before adding a new question
  quizContainer.appendChild(questionElement); //Lisätään questionElement quizContainer-elementtiin.

  gameState.started = true; // Asetetaan gameState.started-arvo true, jotta pelin tila päivittyy aloitetuksi.
}

function checkAnswer() {
  const userAnswer = document.getElementById('answer').value.trim(); // userAnswer-muuttujaan tallennetaan käyttäjän antama vastaus, joka on poimittu answer-elementistä ja trimmattu poistamaan ylimääräiset välilyönnit.
  const correctAnswer = questions[currentQuestion].correctAnswer.toLowerCase(); //correctAnswer-muuttujaan tallennetaan nykyisen kysymyksen oikea vastaus pienin kirjaimin.

  const resultsContainer = document.getElementById('results-container'); // resultsContainer-muuttujaan tallennetaan elementti, jonka id on "results-container".
  //answerElement-muuttujaan luodaan uusi p-elementti. textContent-ominaisuudella asetetaan answerElement-elementin teksti näyttämään käyttäjän vastaus ja oikea vastaus nykyiseen kysymykseen.
  const answerElement = document.createElement('p');
  answerElement.textContent = `Question ${currentQuestion + 1}: Your answer - ${userAnswer}, Correct answer - ${correctAnswer}`;
  //appendChild-funktiolla lisätään answerElement-elementti resultsContainer-elementtiin.
  resultsContainer.appendChild(answerElement);

  //os käyttäjän vastaus on oikein, lisätään correct-luokka answerElement-elementtiin; muuten lisätään wrong-luokka.
  if (userAnswer.toLowerCase() === correctAnswer) {
    answerElement.classList.add('correct');
  } else {
    answerElement.classList.add('wrong');
  }

  currentQuestion++; //currentQuestion-muuttujaa kasvatetaan yhdellä, jotta siirrytään seuraavaan kysymykseen.

  //Jos ollaan viimeisessä kysymyksessä, kutsutaan endGame-funktiota; muuten kutsutaan createQuestion-funktiota asettaaksemme seuraavan kysymyksen.
  if (currentQuestion === questions.length) {
    endGame();
  } else {
    createQuestion();
  }
}

function endGame() {
  const resultsContainer = document.getElementById('results-container'); //resultsContainer-muuttujaan tallennetaan elementti, jonka id on "results-container".
  resultsContainer.style.display = 'block'; //style.display-ominaisuudella asetetaan resultsContainer-elementin näyttötilaksi 'block', jotta tulokset tulevat näkyviin.

  // Count the number of correct answers
  const correctAnswersCount = Array.from(resultsContainer.children).filter(element => element.classList.contains('correct')).length;


  const resultElement = document.createElement('p');
  //textContent-ominaisuudella asetetaan resultElement-elementin teksti näyttämään montako kysymyksestä käyttäjä vastasi oikein
  resultElement.textContent = `You answered ${correctAnswersCount}/${questions.length} questions correctly.`;
  resultsContainer.appendChild(resultElement);

  // Create the restart button
  const restartButton = document.createElement('button');
  restartButton.textContent = 'Play again';
  //addEventListener-funktiolla lisää restartButton-elementtiin kuuntelijan, joka kutsuu restartGame-funktiota, joka nollaa pelin tilan, jotta peli alkaa uudestaan.
  restartButton.addEventListener('click', restartGame);
  resultsContainer.appendChild(restartButton);

  // Hide the quiz container
  document.getElementById('quiz-container').style.display = 'none';

  // Reset the game state
  currentQuestion = 0;
  gameState.started = false;
}

function restartGame() {
  currentQuestion = 0; //asetetaan 0 jotta peli alkaa alusta
  gameState.started = false;

  // Clear the results container
  document.getElementById('results-container').innerHTML = ''; //tyhjennetään kentät
  document.getElementById('results-container').style.display = 'none'; //piilotetaan container

  // Show the quiz container
  document.getElementById('quiz-container').style.display = 'block'; // näytetään quiz container (block)
  startGame(); //kutsutaan funktiota 
}

function startGame() {
  document.getElementById('start-container').style.display = 'none'; //piilotetaan start-container
  document.getElementById('quiz-container').style.display = 'block'; //näytetään quiz-container
  createQuestion(); // Kutsutaan createQuestion-funktiota pelin aloittamiseksi.
}

createQuestion();