//creating global variables to pass into things later on
let characterStatus = "";
let chosenName = "";
let decideAge = Math.floor(Math.random()*99);
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
const displaySleepiness = document.getElementById("tired");
const displayAge = document.getElementById("current-age");
const displayStatus = document.getElementById("status");
const imageChange = document.querySelector(".tamagotchi-screen");

//creating global functions
//prompts user to choose a name
function pickName() {
    chosenName = prompt("What would you like your Tamagotchi name to be?");
}

//creates new character class
let newCharacter = null; //have it empty so that after i create a new character, 
    //i can assign the new characters value here
function generateCharacter() {
    newCharacter = new Tamagotchi(chosenName, decideAge, 1, 1, 1);
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
//i eventually want a message to alert birthday
function ageMe() {
    ageInterval = setInterval(function() {
        newCharacter.age++;
        alert("Happy Birthday!");
        displayAge.textContent = `Age: ${newCharacter.age}`
    }, 20000)
}

//this function starts my interval timers and displays stats
function startGame() {
    imageChange.style.backgroundImage = "url(/img/main-face.png)";
    characterStatus = "Alive";
    resetMe();
    displayStatus.textContent = "Status: " + characterStatus;
    displayHunger.textContent = `Hunger: ${newCharacter.hunger}`;
    displayBoredom.textContent = `Boredom: ${newCharacter.boredom}`;
    displaySleepiness.textContent = `Sleepiness: ${newCharacter.sleepiness}`;
    displayAge.textContent = `Age: ${newCharacter.age}`
    ageMe();
    hungerInterval = setInterval(function() {
        newCharacter.increaseHunger();
    }, 3000)
    boredInterval = setInterval(function() {
        newCharacter.increaseBoredom();
    }, 6000)
    sleepInterval = setInterval(function() {
        newCharacter.increaseSleepiness();
    }, 8000)
    startGameTouch();
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
//drier code that stops all intervals once a character dies
function clearMe() {
    clearInterval(hungerInterval)
    clearInterval(boredInterval);
    clearInterval(sleepInterval);
    clearInterval(ageInterval);
}

//resets my other properties once a death requires a new game
function resetMe() {
    newCharacter.hunger = 1;
    newCharacter.boredom = 1;
    newCharacter.sleepiness = 1;
}

function hungerDeath() {
    imageChange.style.backgroundImage = "url(/img/died-two.jpeg)";
    clearMe();
    stopGameTouch();
    newCharacter.hungerInterval = null;
    characterStatus = "Status: Dead.  I died of starvation.";
    displayStatus.textContent = characterStatus;
    displayHunger.textContent = "Hunger: 10";
    return newCharacter;
}
function boredDeath() {
    imageChange.style.backgroundImage = "url(/img/died-two.jpeg)";
    clearMe();
    stopGameTouch();
    newCharacter.boredInterval = null;
    characterStatus = "Status: Dead.  I died of boredom.";
    displayStatus.textContent = characterStatus;
    displayBoredom.textContent = "Boredom: 10";
    return newCharacter;
}
function sleepDeath() {
    imageChange.style.backgroundImage = "url(/img/died-two.jpeg)";
    clearMe();
    stopGameTouch();
    newCharacter.sleepInterval = null;
    characterStatus = "Status: Dead.  I died of sleep deprivation.";
    displayStatus.textContent = characterStatus;
    displaySleepiness.textContent = "Sleepiness: 10";
    return newCharacter;
}

//creating Tamagotchi Class
class Tamagotchi {
    constructor(name, age, hunger, boredom, sleepiness) {
        this.name = name;
        this.age = age;
        this.hunger = hunger;
        this.boredom = boredom;
        this.sleepiness = sleepiness;
    }
    increaseHunger() { 
        imageChange.style.backgroundImage = "url(/img/main-face.png)";
        this.hunger++
        if (this.hunger === 3) {
            displayHunger.textContent = "Hunger: " + this.hunger + ". I want a snack."
        } else if (this.hunger === 6) {
            displayHunger.textContent = "Hunger: " + this.hunger + ". I'm hungry."
        } else if (this.hunger === 8) {
            displayHunger.textContent = "Hunger: " + this.hunger + ". Feed me, MEOW!"
        } else if (this.hunger === 10) {
            displayHunger.textContent = "Hunger: " + this.hunger
            hungerDeath();
        } else {
            displayHunger.textContent = "Hunger: " + this.hunger
        }
    }
    decreaseHunger() {
       if (this.hunger === 1) {
        displayHunger.textContent = "Hunger: " + newCharacter.hunger + ". Don't feed me, I'm full."
        return 
        } else {
        this.hunger--
        imageChange.style.backgroundImage = "url(/img/luna-eating.jpeg)";
        displayHunger.textContent = "Hunger: " + this.hunger
        }
    }
    increaseBoredom() {
        imageChange.style.backgroundImage = "url(/img/main-face.png)";
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
    decreaseBoredom() {
        if (this.boredom === 1) {
            displayBoredom.textContent = "Boredom: " + newCharacter.boredom + ". I don't wanna play right, Me-ow!"
            return
        } else {
            this.boredom--
            imageChange.style.backgroundImage = "url(/img/luna-playing.jpeg)";
            displayBoredom.textContent = "Boredom: " + this.boredom
        }
    }
    increaseSleepiness() {
        imageChange.style.backgroundImage = "url(/img/main-face.png)";
        this.sleepiness++
        if (this.sleepiness === 3) {
            displaySleepiness.textContent = "Sleep: " + this.sleepiness + ". I'm sleepy!"
        } else if (this.sleepiness === 6) {
            displaySleepiness.textContent = "Sleep: " + this.sleepiness + ". Can I take a nap?"
        } else if (this.sleepiness === 8) {
            displaySleepiness.textContent = "Sleep: " + this.sleepiness + ". Sleep, me-OW!"
        } else if (this.sleepiness === 10) {
            displaySleepiness.textContent = "Sleep: " + this.sleepiness
            sleepDeath();
        } else {
            displaySleepiness.textContent = "Sleep: " + this.sleepiness
        }
    }
    decreaseSleepiness() {
        if (this.sleepiness === 1) {
            displaySleepiness.textContent = "Sleepiness: " + newCharacter.sleepiness + " No, I'm not sleepy!"
            return
        } else {
            this.sleepiness--
            imageChange.style.backgroundImage = "url(/img/luna-sleeping.jpeg)";
            displaySleepiness.textContent = "Sleepiness: " + this.sleepiness
        }
    }
}

//addEventListeners
window.addEventListener("load", createCharacter);
startButton.addEventListener("click", startGame);
//i only want these when game play is happening
function startGameTouch() { 
    feedButton.addEventListener("click", feedPet);
    playButton.addEventListener("click", playPet);
    sleepButton.addEventListener("click", sleepPet);
};
//removes event listeners so you can't click buttons once character dies
function stopGameTouch() {
    feedButton.removeEventListener("click", feedPet);
    playButton.removeEventListener("click", playPet);
    sleepButton.removeEventListener("click", sleepPet);
};

///Working out
imageChange.style.backgroundImage = "url(/img/luna-eating.jpeg)";
imageChange.style.backgroundImage = "url(/img/luna-playing.jpeg)";
imageChange.style.backgroundImage = "url(/img/luna-sleeping.jpeg)";
imageChange.style.backgroundImage = "url(/img/img/died-one.jpeg)";
imageChange.style.backgroundImage = "url(/img/died-two.jpeg)";
imageChange.style.backgroundImage = "url(/img/main-face.png)";
//imageChange.style.backgroundImage = "url(/img/luna-food-mad.jpeg)";
//imageChange.style.backgroundImage = "url(/img/luna-sleep-mad.jpeg)";
// imageChange.style.backgroundImage = "url(/img/luna-bored-mad.jpeg)";

