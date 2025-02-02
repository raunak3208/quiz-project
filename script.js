const allQuestions = [
    // Science & Technology
    { question: "What is the chemical element with the highest melting point?", answers: ["Tungsten", "Carbon", "Osmium", "Platinum"], correct: "Tungsten" },
    { question: "Which scientist proposed the Uncertainty Principle?", answers: ["Heisenberg", "Bohr", "Einstein", "Schrödinger"], correct: "Heisenberg" },
    { question: "What is the hardest known natural material on Earth?", answers: ["Diamond", "Graphene", "Quartz", "Boron"], correct: "Diamond" },
    { question: "Which branch of physics deals with the motion of air and gases?", answers: ["Aerodynamics", "Thermodynamics", "Quantum Mechanics", "Fluid Dynamics"], correct: "Aerodynamics" },
    { question: "What is the only metal that is liquid at room temperature?", answers: ["Mercury", "Gallium", "Sodium", "Lead"], correct: "Mercury" },

    // Mathematics
    { question: "What is the Riemann Hypothesis related to?", answers: ["Prime Numbers", "Geometry", "Probability", "Algebra"], correct: "Prime Numbers" },
    { question: "Which famous mathematician wrote the book 'Principia Mathematica'?", answers: ["Isaac Newton", "Leibniz", "Euclid", "Euler"], correct: "Isaac Newton" },
    { question: "What is the sum of all angles in a pentagon?", answers: ["540°", "360°", "720°", "450°"], correct: "540°" },
    { question: "What is the smallest number that is both a square and a cube?", answers: ["64", "1", "36", "100"], correct: "1" },
    { question: "What is Euler’s number approximately equal to?", answers: ["2.718", "3.141", "1.618", "2.303"], correct: "2.718" },

    // History
    { question: "Who was the first emperor of China?", answers: ["Qin Shi Huang", "Kublai Khan", "Emperor Taizu", "Sun Yat-Sen"], correct: "Qin Shi Huang" },
    { question: "What year did the Roman Empire fall?", answers: ["476 AD", "410 AD", "530 AD", "395 AD"], correct: "476 AD" },
    { question: "Who was the longest-reigning British monarch before Queen Elizabeth II?", answers: ["Queen Victoria", "King George III", "Henry VIII", "Edward III"], correct: "Queen Victoria" },
    { question: "What was the code name for the Allied invasion of Normandy in World War II?", answers: ["Operation Overlord", "Operation Torch", "Operation Market Garden", "Operation Barbarossa"], correct: "Operation Overlord" },
    { question: "Who discovered the sea route to India in 1498?", answers: ["Vasco da Gama", "Christopher Columbus", "Marco Polo", "Ferdinand Magellan"], correct: "Vasco da Gama" },

    // Literature
    { question: "Who wrote 'Paradise Lost'?", answers: ["John Milton", "Shakespeare", "Homer", "Dante"], correct: "John Milton" },
    { question: "In George Orwell’s '1984', what is the name of the totalitarian regime’s leader?", answers: ["Big Brother", "The Party", "O'Brien", "Goldstein"], correct: "Big Brother" },
    { question: "Who is the tragic hero in Shakespeare's 'Hamlet'?", answers: ["Hamlet", "Macbeth", "Othello", "King Lear"], correct: "Hamlet" },
    { question: "Which novel starts with the line, 'Call me Ishmael'?", answers: ["Moby-Dick", "Great Expectations", "The Great Gatsby", "Ulysses"], correct: "Moby-Dick" },
    { question: "Which dystopian novel features the concept of 'thoughtcrime'?", answers: ["1984", "Brave New World", "Fahrenheit 451", "The Handmaid’s Tale"], correct: "1984" },

    // Geography
    { question: "Which country has the most natural lakes?", answers: ["Canada", "USA", "Russia", "India"], correct: "Canada" },
    { question: "What is the deepest point in the ocean?", answers: ["Mariana Trench", "Puerto Rico Trench", "Tonga Trench", "Java Trench"], correct: "Mariana Trench" },
    { question: "Which river is the longest in the world?", answers: ["Nile", "Amazon", "Yangtze", "Mississippi"], correct: "Nile" },
    { question: "What is the highest active volcano in the world?", answers: ["Ojos del Salado", "Mount Etna", "Kilimanjaro", "Cotopaxi"], correct: "Ojos del Salado" },
    { question: "Which continent has the highest number of countries?", answers: ["Africa", "Europe", "Asia", "South America"], correct: "Africa" },

    // General Knowledge
    { question: "What does DNA stand for?", answers: ["Deoxyribonucleic Acid", "Ribonucleic Acid", "Dinucleic Acid", "Double Helix Acid"], correct: "Deoxyribonucleic Acid" },
    { question: "Who developed the first successful polio vaccine?", answers: ["Jonas Salk", "Louis Pasteur", "Alexander Fleming", "Robert Koch"], correct: "Jonas Salk" },
    { question: "What is the name of the tallest freestanding structure in the world?", answers: ["Burj Khalifa", "Shanghai Tower", "Tokyo Skytree", "CN Tower"], correct: "Burj Khalifa" },
    { question: "Which planet has the largest number of moons?", answers: ["Saturn", "Jupiter", "Uranus", "Neptune"], correct: "Saturn" },
    { question: "Who was the first person to reach the South Pole?", answers: ["Roald Amundsen", "Ernest Shackleton", "Robert Scott", "Edmund Hillary"], correct: "Roald Amundsen" }
];

// Select 10 random hard questions
const questions = allQuestions.sort(() => 0.5 - Math.random()).slice(0, 10);

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10; 
let correctAnswers = [];
let incorrectAnswers = [];

const questionEl = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const timerEl = document.createElement("h3");

function startQuiz() {
    timerEl.id = "timer";
    document.querySelector(".quiz-container").appendChild(timerEl);
    showQuestion();
}

function showQuestion() {
    resetState();
    timeLeft = 10;
    updateTimer();

    timer = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft === 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);

    let currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(button, answer, currentQuestion.correct));
        answerButtons.appendChild(button);
    });
}

function updateTimer() {
    timerEl.textContent = `Time left: ${timeLeft}s`;
}

function resetState() {
    answerButtons.innerHTML = "";
    nextButton.classList.add("hidden");
    resultContainer.innerHTML = "";
}

function selectAnswer(button, selected, correct) {
    clearInterval(timer);

    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(btn => btn.disabled = true);

    if (selected === correct) {
        score++;
        button.style.backgroundColor = "green";
        correctAnswers.push(questions[currentQuestionIndex]);
    } else {
        button.style.backgroundColor = "red";
        buttons.forEach(btn => {
            if (btn.textContent === correct) btn.style.backgroundColor = "green";
        });
        incorrectAnswers.push(questions[currentQuestionIndex]);
    }

    nextButton.classList.remove("hidden");
}

nextButton.addEventListener("click", nextQuestion);

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionEl.textContent = "Quiz Completed!";
    answerButtons.innerHTML = "";
    nextButton.classList.add("hidden");
    timerEl.remove();

    let correctList = correctAnswers.map(q => `<li>${q.question} - <b style="color:green">${q.correct}</b></li>`).join("");
    let incorrectList = incorrectAnswers.map(q => `<li>${q.question} - <b style="color:red">${q.correct}</b></li>`).join("");

    resultContainer.innerHTML = `
        <h2>Your Score: ${score} / ${questions.length}</h2>
        <h3>Correct Answers:</h3>
        <ul>${correctList || "<i>None</i>"}</ul>
        <h3>Incorrect Answers:</h3>
        <ul>${incorrectList || "<i>None</i>"}</ul>
    `;
}

startQuiz();
