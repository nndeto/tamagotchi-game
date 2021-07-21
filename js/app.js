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
let ageInterval = null;
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
}

//this allows the user to set a name, sets the character status to alive and creates
//the new character object
function createCharacter() {
    characterStatus = "Alive";
    pickName();
    generateCharacter();
}

//this function starts my interval timers for the game starting
//will eventually need to put display messages and whatnot within this function
function startGame() {
    characterStatus = "Alive"
    hungerInterval = setInterval(function() {
        newCharacter.increaseHunger()
    }, 4000) //every threethousand seconds my characters hunger increases by 1
    //boredInterval = if you get above working, pull in here and change values
    //sleepInterval =
    //ageInterval =
}

//All functions related to characer death
function hungerDeath() {
    clearInterval(hungerInterval)
    newCharacter.hungerInterval = null;
    newCharacter.hunger = 1;
    characterStatus = "Status: Dead.  I died of starvation.";
    console.log("Hunger: 10. " + characterStatus)
    return newCharacter;
}

//all things related to character revive
function feedPet() {
    newCharacter.decreaseHunger();
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
    increaseHunger() { //function that increases my pets hunger
        this.hunger++
        if (this.hunger === 3) {
            console.log("Hunger: " + this.hunger + ". I want a snack");//will eventually change to display messages
        } else if (this.hunger === 6) {
            console.log("Hunger: " + this.hunger + ". I'm hungry");
        } else if (this.hunger === 8) {
            console.log("Hunger: " + this.hunger + ". Feed me now");
        } else if (this.hunger === 10) {
            hungerDeath();
        } else {
            console.log("Hunger: " + this.hunger)
        }
    }
    decreaseHunger() {
       console.log(this.hunger);
       if (this.hunger === 1) {
        console.log("Don't feed me, I'm full.")
        return 
        } else {
        this.hunger--
        console.log("Hunger: " + this.hunger)
        }
    }
}

//addEventListeners
window.addEventListener("load", createCharacter);
startButton.addEventListener("click", startGame);
feedButton.addEventListener("click", feedPet);



