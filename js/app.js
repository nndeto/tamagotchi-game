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

//global variables that do things/write things
const startButton = document.getElementById("start");
const feedButton = document.getElementById("feed");
const playButton = document.getElementById("play");
const sleepButton = document.getElementById("sleep");
const header = document.getElementById("welcome-message");
const displayHunger = document.getElementById("hunger");
const displayBoredom = document.getElementById("bored");
const displaySleepiness = document.getElementById("tired")
const displayAge = document.getElementById("current-age")
const displayStatus = document.getElementById("status")

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
    header.textContent = `Meow, my name is ${newCharacter.name}, if you'd like to play, hit the start button.`
    return newCharacter;
}

//this allows the user to set a name, sets the character status to alive and creates
//the new character object
function createCharacter() {
    pickName();
    generateCharacter();
}

//age my character
//i eventually want a message to alert
function ageMe() {
    ageInterval = setInterval(function() {
        newCharacter.age++;
        displayAge.textContent = newCharacter.age
    }, 20000)
}

//this function starts my interval timers and displays stats
function startGame() {
    characterStatus = "Alive";
    displayStatus.textContent = "Status: " + characterStatus;
    displayHunger.textContent = `Hunger: ${newCharacter.hunger}`;
    displayBoredom.textContent = `Boredom: ${newCharacter.boredom}`;
    displaySleepiness.textContent = `Sleepiness: ${newCharacter.sleepiness}`;
    displayAge.textContent = `Age: ${newCharacter.age}`
    ageMe();
    hungerInterval = setInterval(function() {
        newCharacter.increaseHunger();
    }, 4000)
    boredInterval = setInterval(function() {
        newCharacter.increaseBoredom();
    }, 2000)
    sleepInterval = setInterval(function() {
        newCharacter.increaseSleepiness();
    }, 3000)
}

//all things related to character revive
function feedPet() {
    newCharacter.decreaseHunger();
}
function playPet() {
    newCharacter.decreaseBoredom();
}
function sleepPet() {
    newCharacter.decreaseSleepiness();
}

//All functions related to characer death
function hungerDeath() {
    clearInterval(hungerInterval)
    newCharacter.hungerInterval = null;
    newCharacter.hunger = 1;
    characterStatus = "Status: Dead.  I died of starvation.";
    displayStatus.textContent = characterStatus;
    displayHunger.textContent = "Hunger: 10";
    return newCharacter;
}
function boredDeath() {
    clearInterval(boredInterval)
    newCharacter.boredInterval = null;
    newCharacter.boredom = 1;
    characterStatus = "Status: Dead.  I died of boredom.";
    displayStatus.textContent = characterStatus;
    displayBoredom.textContent = "Boredom: 10";
    return newCharacter;
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
            displayHunger.textContent = "Hunger: " + this.hunger + ". I want a snack"
        } else if (this.hunger === 6) {
            displayHunger.textContent = "Hunger: " + this.hunger + ". I'm hungry"
        } else if (this.hunger === 8) {
            displayHunger.textContent = "Hunger: " + this.hunger + ". Feed me now"
        } else if (this.hunger === 10) {
            displayHunger.textContent = "Hunger: " + this.hunger
            hungerDeath();
        } else {
            displayHunger.textContent = "Hunger: " + this.hunger
        }
    }
    decreaseHunger() {
       console.log(this.hunger);
       if (this.hunger === 1) {
        displayHunger.textContent = "Hunger: " + newCharacter.hunger + ". Don't feed me, I'm full."
        return 
        } else {
        this.hunger--
        }
    }
    increaseBoredom() {
        this.boredom++
        if (this.boredom === 3) {
            displayBoredom.textContent = "Boredom: " + this.boredom + ". I'm bored!"
        } else if (this.boredom === 6) {
            displayBoredom.textContent = "Boredom: " + this.boredom + ". Play with me!"
        } else if (this.boredom === 8) {
            displayBoredom.textContent = "Boredom: " + this.boredom + ". Why won't you play with me!"
        } else if (this.boredom === 10) {
            displayBoredom.textContent = "Boredom: " + this.boredom
            boredDeath();
        } else {
            displayBoredom.textContent = "Boredom: " + this.boredom
        }
    }
    increaseSleepiness() {

    }
}

//addEventListeners
window.addEventListener("load", createCharacter);
startButton.addEventListener("click", startGame);
feedButton.addEventListener("click", feedPet);
playButton.addEventListener("click", playPet);
sleepButton.addEventListener("click", sleepPet);



