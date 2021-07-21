//creating global variables to pass into things later on
let characterStatus = "";
let chosenName = "";
let decideAge = Math.floor(Math.random()*99);
let hungerValue = 1;
let boredomValue = 1;
let sleepinessValue = 1;
let hungerInterval = null;
let boredInterval = null;
let sleepInterval = null;
const startButton = document.getElementById("start");
const feedButton = document.getElementById("feed");
const playButton = document.getElementById("play");
const sleepButton = document.getElementById("sleep");

//creating global functions
//prompts user to choose a name
function pickName() {
    chosenName = prompt("What would you like your Tamagotchi name to be?");
}

//creates new character class
let newCharacter = null; //have it empty so that after i create a new character, 
    //i can assign the new characters value here
function generateCharacter() {
    newCharacter = new Tamagotchi(chosenName, decideAge, hungerValue, boredomValue, sleepinessValue);
    return newCharacter;
    //newCharacter = instance;
}

//this allows the user to set a name, sets the character status to alive and creates
//the new character object
function createCharacter() {
    characterStatus = "alive";
    pickName();
    generateCharacter();
}

//this function starts my interval timers for the game starting
//will eventually need to put display messages and whatnot within this function
function startGame() {
    hungerInterval = setInterval(function() {
        console.log("hello")
        newCharacter.increaseHunger()
    }, 3000)
    //boredInterval = if you get above working, pull in here and change values
    //sleepInterval =
}
//creating Tamagotchi Class
//come back and add methods for: age change, intervals, poiont changes
class Tamagotchi {
    constructor(name, age, hunger, boredom, sleepiness) {
        this.name = name;
        this.age = age;
        this.hunger = hunger;
        this.boredom = boredom;
        this.sleepiness = sleepiness;
    }
    increaseHunger() {
        this.hunger++
        console.log(this.hunger)
        //this is where i want my display of hunger to change as well
    }

}

//addEventListeners
window.addEventListener("load", createCharacter);
startButton.addEventListener("click", startGame);

