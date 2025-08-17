// Guessing game shared variables
let  ggGuess = 0;
let cNum=0;

const GgGuessEl = document.getElementById("ggGuess");
const GuessingGameEl = document.getElementById("GuessingGame");
const GgNumButtonsWrapEl = document.getElementById("ggnumberButtons");
const GgCounterWrapEl = document.getElementById("ggcounter");
const GgGuessCountEl = document.getElementById("ggGuess");
const GgResultsEl = document.getElementById("ggresults");
const GgLineEl = document.getElementById("ggLine");
const GgWinnerLineEl = document.getElementById("ggwinnerLine");
const GgAgainBreakEl = document.getElementById("ggAgainBreak");
const GgAgainBreak2El = document.getElementById("ggagainBreak2");
const GgEndSessionEl = document.getElementById("ggendSession");
const GgAgainAreaEl = document.getElementById("ggagainArea");
const GgPlayAgainEl = document.getElementById("ggplayAgain");
// BNH game shared varables
let pwins = 0 , cwins = 0;
const gameoptions = ["Bear","Ninja","Hunter"];

//Setting Consts for DOM refrences to save typing =)

const resultsBox = document.getElementById("results");
const youLine = document.getElementById("youLine");
const cpuLine = document.getElementById("cpuLine");
const winnerLine = document.getElementById("winnerLine");
const countersWrap = document.getElementById("counters");
const pwinsEl = document.getElementById("pwins");
const cwinsEl = document.getElementById("cwins");
const againArea = document.getElementById("againArea");
const againBreak = document.getElementById("againBreak");
const againBreak2 = document.getElementById("againBreak2");
const bhnEl = document.getElementById("BNH");

// BNH code Start
//Set things right to start

hideRoundUI();
//buttons

const BearBtn = document.querySelector('[data-pick="Bear"]');
const NinjaBtn = document.querySelector('[data-pick="Ninja"]');
const HunterBtn = document.querySelector('[data-pick="Hunter"]');
BearBtn.addEventListener("click", function() {
    playRound("Bear");
});
NinjaBtn.addEventListener("click", function() {
    playRound("Ninja");

});
HunterBtn.addEventListener("click", function() {
    playRound("Hunter");

});
const playAgainBtn = document.getElementById("playAgain");
playAgainBtn.addEventListener("click", function() {
    initialView();

});
const endSessionBtn = document.getElementById("endSession");
endSessionBtn.addEventListener("click", function() {
    pwins = 0 , cwins = 0 ;
    updateCounters();
    initialView();
    bnh();

});
const endGameBtn = document.getElementById("endGame");
endGameBtn.addEventListener("click", function() {
    pwins = 0 , cwins = 0 ;
    updateCounters();
    initialView();
    bhnEl.hidden = true;
});
function bnh() {
    bhnEl.hidden = false;
}
function playRound(pchoice) {
    const cchoice = computerPick();
    const winner = decideWinner(pchoice, cchoice);
    if (winner === "user") pwins++;
    if (winner === "computer") cwins++;
    updateCounters();
    youLine.textContent = `You chose ${pchoice}.`;
    cpuLine.textContent = `The computer chose ${cchoice}`;
    winnerLine.textContent = winner === "tie" ? "It's a tie!" : winner === "user" ? "You win!" : "The computer wins!";
    showRoundUI();
}
function computerPick() {
    const cchoice = Math.floor(Math.random()* gameoptions.length);
    return gameoptions[cchoice];

}
function decideWinner(pchoice, cchoice) {
    let winner;
    // if player and computer are the same its a tie. 
    if (pchoice === cchoice) {
        winner = "tie"

    } 
    else if (
        //all the player win combnations  AND for the choices and OR for each possiability
        (pchoice === "Bear" && cchoice === "Ninja") ||
        (pchoice === "Ninja" && cchoice === "Hunter") ||
        (pchoice === "Hunter" && cchoice === "Bear")){
            winner = "user"

    } 
    else if (// all computer win combnations same as above just with the computer winning
    (pchoice === "Bear" && cchoice === "Hunter") ||
    (pchoice === "Ninja" && cchoice === "Bear") ||
    (pchoice === "Hunter" && cchoice === "Ninja")){
        winner = "computer"

    }
    // this error will cover any thing other then 3 choices as well as empty
    else {
        winner = "Invalid";

    }
return winner    
}
function updateCounters() {
    pwinsEl.textContent = pwins.toString();
    cwinsEl.textContent = cwins.toString();

}
function initialView(){
    hideRoundUI();

}
function hideRoundUI() {
    resultsBox.hidden = true;
    countersWrap.hidden = true;
    againArea.hidden = true;
    againBreak.hidden = true;
    againBreak2.hidden = true;

}
function showRoundUI() {
    resultsBox.hidden = false;
    countersWrap.hidden = false;
    againArea.hidden = false;
    againBreak.hidden = false;
    againBreak2.hidden = false;

}
// BNH Code end 

// Guessing Game code start

        
        //ggGame listeners
        // uses for each and arrow functions to set an event listener for each button in number-buttons equal to the data-value
        


function guessingGame() {  
    cNum = ggrandom();
    GgLineEl.textContent = "";
    GgWinnerLineEl.textContent = "";
    // show game ui
    ggshowRoundUI();
    console.log("gg button pushed returned from show ui");
    // pick number / start listiner
    document.querySelectorAll("#ggnumberButtons button").forEach(btn => {
            btn.onclick = () => {
                pChoice = parseInt(btn.dataset.value, 10);
                ggcheckGuess(pChoice);
            };
        });

    //end session button
    GgEndSessionEl.onclick = () => {
        ggGuess = 0 ;
        ggupdateCounter(ggGuess);
        gginitialView();
    };
    GgPlayAgainEl.onclick = () => {
        ggGuess = 0 ;
        ggupdateCounter(ggGuess);
        guessingGame();
    };
    }
function ggcheckGuess(pChoice) {
    ggGuess ++;
    // subtract the computers number from the users choice could have done this in the ternary but this felt shorter and more readable
    let compare = pChoice - cNum;
    //if compare is less then zero message is low greater then zero high if its nither its assumed its zero and message is set to false
    let message = (compare < 0)?"low":(compare > 0) ? "high": false;
    // if message is false player guessed right
    if (!message) {
        GgLineEl.textContent = `Your guess of ${pChoice} is right.`;
        GgWinnerLineEl.textContent = `You guessed it in ${ggGuess} guesses!`;
    }else {
        GgLineEl.textContent = `Your guess was too ${message}, guess again.`;
        GgWinnerLineEl.textContent = "";
    }
    ggupdateCounter(ggGuess);
}
function ggrandom() {
    cNum = Math.floor(Math.random()*10) +1;
    return cNum
}
function ggupdateCounter(ggGuess) {
    GgGuessEl.textContent = ggGuess.toString();
}
function gginitialView() {
    gghideRoundUI();
}
function gghideRoundUI() {
    GgGuessEl.hidden = true;
    GuessingGameEl.hidden = true;
    GgNumButtonsWrapEl.hidden = true;
    GgCounterWrapEl.hidden = true;
    GgGuessCountEl.hidden = true;
    GgResultsEl.hidden = true;
    GgLineEl.hidden = true;
    GgWinnerLineEl.hidden = true;
    GgAgainBreakEl.hidden = true;
    GgAgainBreak2El.hidden = true;
    GgAgainAreaEl.hidden = true;
}
function ggshowRoundUI() {
    GgGuessEl.hidden = false;
    GuessingGameEl.hidden = false;
    GgNumButtonsWrapEl.hidden = false;
    GgCounterWrapEl.hidden = false;
    GgGuessCountEl.hidden = false;
    GgResultsEl.hidden = false;
    GgLineEl.hidden = false;
    GgWinnerLineEl.hidden = false;
    GgAgainBreakEl.hidden = false;
    GgAgainBreak2El.hidden = false;
    GgAgainAreaEl.hidden = false;
}


function consultOrcle() {
    prompt('The Oracle awaits your question..');
}


// GG code end