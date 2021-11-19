// Declared variables
var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");

// Clear scores button
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

// Access local storage for all scores
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++ ) {

        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);
    }
}

// Go back button
goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});

