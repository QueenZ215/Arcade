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

});
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