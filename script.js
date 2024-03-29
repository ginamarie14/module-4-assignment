// list of all questions, choices, and answers
var questions = [
    {
        question: 'What case is this: "theFirstQuestion"?',
        answers: ['camelcase', 'snakecase', 'pascalcase'],
        correctAnswer: 'camelcase'
      },
      {
        question: 'True or false: Java is short for JavaScript?',
        answers: ['true', 'false', 'maybe'],
        correctAnswer: 'false'
      },
      {
        question: 'How many JavaScript data types exist?',
        answers: ['5', '4', '7'],
        correctAnswer: '5'
      },
      {
        question: 'What kind of data type would a "true/false" question receive?',
        answers: ['integer', 'string', 'boolean'],
        correctAnswer: 'boolean'
      },
      {
        question: 'Which one of these is used to define a global element?',
        answers: ['const', 'var', 'let'],
        correctAnswer: 'var'
      },
      {
        question: 'What does API stand for?',
        answers: ['application programming interface', 'advanced program interface', 'all protocols introduced'],
        correctAnswer: 'application programming interface'
      },
      {
        question: 'How many ways can we integrate Javascript into an HTML file?',
        answers: ['3', '2', '4'],
        correctAnswer: '2'
      },
      {
        question: 'What does isNaN mean?',
        answers: ['is not a number', 'is not available now', 'is never a number'],
        correctAnswer: 'is not a number'
      }
  ];
 
    let startUp = document.getElementById('startMessage');
    let questionSection = document.getElementById('questions');
    let gameOver = document.getElementById('gameOver');
    let userScoreSection = document.getElementById('showScore');
    let questionSectionElement = document.getElementById('question');
    let ongoingScore = document.getElementById('displayOngoingScore');
 
    let userAnswer1Btn = document.getElementById('answer1');
    let userAnswer2Btn = document.getElementById('answer2');
    let userAnswer3Btn = document.getElementById('answer3');
    let timer = document.getElementById('showTimer');
 
    let currentQuestionIndex = 0;
    let playerScore= 0;
    let correctAnswers = 0;
    let timeLeft = 45;
 
    // startQuiz function uses event listener dynamically change page and display question and choices
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', startQuiz);
    function startQuiz() {
        // console.log('started');
        startUp.style.display = 'none';
        questionSection.style.display = 'block';
        gameOver.style.display = 'none';
        currentQuestionIndex = 0;
        ongoingScore.textContent = "";
        correctAnswers = 0;
        playerScore = 0;
        timeLeft = 45;
        showQuestion(currentQuestionIndex);
        countDown();
    }
 
    // timer
    function countDown() {
    let interval =  setInterval(function() {
            if (timeLeft <= 0 ) {
                loadGameOver();
                clearInterval(interval);
            } 
            else {
                timer.innerHTML = timeLeft;
                timeLeft--;
            }
        },1000);
    }
 
    // Gets and sets questions & answers based on currentQuesitionIndex
    function showQuestion(q) {
        questionSectionElement.textContent = questions[q].question;
        userAnswer1Btn.textContent = questions[q].answers[0];
        userAnswer2Btn.textContent = questions[q].answers[1];
        userAnswer3Btn.textContent = questions[q].answers[2];
    }
 
    $("#answerBtns button").on("click", (function(event) {
    let userAnswer = $(this).text();
        if (userAnswer === questions[currentQuestionIndex].correctAnswer) {
            rightAnswer();
            console.log("correct");
        }
        else {
            wrongAnswer();
            console.log("incorrect");
        }   
    }));
 
    function rightAnswer() {
        playerScore +=10;
        correctAnswers++;
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(currentQuestionIndex);
            ongoingScore.style.color = "green";
            ongoingScore.textContent = "Correct! Progess: " + correctAnswers + "/" + questions.length;
        }
        else {
            timeLeft = 0;
    }}
 
    function wrongAnswer() {
        currentQuestionIndex++;
        timeLeft-=5;
        if (currentQuestionIndex < questions.length) {
            showQuestion(currentQuestionIndex);
            ongoingScore.style.color = "red";
            ongoingScore.textContent = "Wrong answer. Progess: " + correctAnswers + "/" + questions.length;
        }   
        else {
            timeLeft = 0;
 
    }}
 
    function loadGameOver(){
        questionSection.style.display = 'none';
        gameOver.style.display = 'block';
        userScoreSection.textContent = playerScore;
        getLastScore();
    }
 
    const saveScoreButton = document.getElementById('saveScore');
 
    saveScoreButton.addEventListener('click',function(event){
        event.preventDefault();
        const playerName = document.getElementById('playerName').value;
        console.log("clicked the saved button");
        if (playerName == "") {
            alert("Please type in your name or initials");
        }
        localStorage.setItem("name", playerName);
        localStorage.setItem("score", playerScore);
     })
 
    let lastScore = document.getElementById('lastScore');
    
    function getLastScore() {
    let theLastScore = localStorage.getItem('score');
        if (theLastScore !== null) {
            finalScore.textContent = "Your previous score was: " + theLastScore;
        }
    }

    const playAgain = document.getElementById('playAgain');
    playAgain.addEventListener('click', function() {
        startQuiz();
     });