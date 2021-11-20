
// var array and objects for questions
var questions = [
    {
        title: "A string value can be determined by what in a variable?",
        choices: ["curly brackets", "parentheses", "quotation marks", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ______> ",
        choices: ["numbers and string", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "What is the action of doing something over and over again, repeating code?",
        choices: ["loop", "bug", "function", "program"],
        answer: "loop"
    },
    {
        title: "What does HTML stand for?",
        choices: ["Hypertext Markup Leveler", "Hypertext Marketing Language", "Hypertext Markup Language", "HyperTrainer Markup Language"],
        answer: "Hypertext Markup Language"
    },
    {
        title: "Inside which HTML element do we put JavaScript?",
        choices: ["<js>", "<javascript>", "<scripting>", "<script>"],
        answer: "<script>"
    },
    {
        title: "Is water wet?",
        choices: ["yes", "no"],
        answer: "yes"
    },

]


var score = 0;
var questionIndex = 0;


// Declared variables
var timerEl = document.querySelector("#timer");
var startEl = document.querySelector("#start");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");
var ulCreate = document.createElement("ul");

// Timer variables 
var timer = 75;
var holdInterval = 0;
var penalty = 10;


// Start button clicked and timer starts 
startEl.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            timer--;
            timerEl.textContent = ("Time: " + timer);

            if (timer <= 0) {
                clearInterval(holdInterval);
                finished();
                timerEl.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// Questions rendered to page
function render(questionIndex) {
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    // Loop through entire array of questions
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion
        
    }

    // bring up new question and choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

// compare choices with answers
function compare(Event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct answer selected
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is: " + questions[questionIndex].answer;
            // Wrong answer selected = penalty           
        } else {
            timer = timer - penalty;
            createDiv.textContent = "Wrong! The correct answer is: " + questions[questionIndex].answer;
        }
    }
    questionIndex++;

    if (questionIndex >= questions.length) {
        finished()
        createDiv.textContent = "End of quiz!" + "You got " + score + "/" + questions.length + "Correct!";        
    } else {
        render(questionIndex);
    }
    questionList.appendChild(createDiv);
}

/// finished with the quiz 
function finished(){
    questionsDiv.innerHTML = "";
    timer.innerHTML = "";

    // Header
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsDiv.appendChild(createH1);

    // Create p tag element
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    // Use time remaining for score
    if (timer >= 0) {
        var timeRemaining = timer;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

    // Create label for player initials
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    // text box for initials
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    // submit button
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit"

    questionsDiv.appendChild(createSubmit);

    // Initals and Highscore saved to local storage
    createSubmit.addEventListener("click", function() {
        var initials = createInput.value;

        if (initials === null) {
            console.log("No initials entered!")
        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore)
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // link to Highscore page
            window.location.replace("./highscores.html");
        }
    })
}







