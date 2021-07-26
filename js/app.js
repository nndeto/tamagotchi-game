//creating global variables to pass into things later on
let characterStatus = "";
let chosenName = "";
let decideAge = Math.floor(Math.random()*99);
let hungerInterval = null;
let boredInterval = null;
let sleepInterval = null;
let ageInterval = null;
let loveInterval = null;

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
const displayLove = document.getElementById("love");
const imageChange = document.querySelector(".tamagotchi-screen");
const speech = document.querySelector(".speech-bubble");
const gameVis = document.querySelector(".tamagotchi-body");
const gameStatsVis = document.querySelector(".stats");


//image change variables
imageChange.style.backgroundImage = "url(/img/luna-eating.jpeg)";
imageChange.style.backgroundImage = "url(/img/luna-playing.jpeg)";
imageChange.style.backgroundImage = "url(/img/luna-sleeping.jpeg)";
imageChange.style.backgroundImage = "url(/img/img/died-one.jpeg)";
imageChange.style.backgroundImage = "url(/img/died-two.jpeg)";
imageChange.style.backgroundImage = "url(/img/main-face.png)";
imageChange.style.backgroundImage = "url(/img/luna-food-mad.jpeg)";
imageChange.style.backgroundImage = "url(/img/luna-sleep-mad.jpeg)";
imageChange.style.backgroundImage = "url(/img/luna-bored-mad.jpeg)";
imageChange.style.backgroundImage = "url(/img/luna-and-artemis.jpeg)";
imageChange.style.backgroundImage = "url(/img/final-love-end.jpeg)";

//creating global functions
//prompts user to choose a name
function pickName() {
    chosenName = prompt("What would you like your Tamagotchi name to be?");
}

//this allows the user to set a name and creates the new character object
function createCharacter() {
    pickName();
    generateCharacter();
    startButtonLive();
}

//creates new character class
let newCharacter = null; //have it empty so that after i create a new character, 
//assigns the new characters value here
function generateCharacter() {
    hideGame();
    newCharacter = new Tamagotchi(chosenName, decideAge, 1, 1, 1, 1);
    header.textContent = `Meow, my name is ${newCharacter.name}!`
    speech.textContent = dynamicContent.messages.playMessage;
    return newCharacter;
}

//age my character
function ageMe() {
    ageInterval = setInterval(function() {
        newCharacter.age++;
        speech.textContent = dynamicContent.messages.happyBdayMessage;
        displayAge.textContent = `Age: ${newCharacter.age}`
    }, 17000)
}

function startMessages() {
    displayStatus.textContent = dynamicContent.messages.aliveStatus;
    displayHunger.textContent = `Hunger: ${newCharacter.hunger}`;
    displayBoredom.textContent = `Boredom: ${newCharacter.boredom}`;
    displaySleepiness.textContent = `Sleepiness: ${newCharacter.sleepiness}`;
    displayLove.textContent = `Love: ${newCharacter.love}`;
    displayAge.textContent = `Age: ${newCharacter.age}`
}

function displayGame() {
    gameVis.classList.remove("hidden");
    gameStatsVis.classList.remove("hidden");
}

function hideGame() {
    gameVis.classList.add("hidden");
    gameStatsVis.classList.add("hidden");
}


//this function starts my interval timers and displays stats
function startGame() {
    header.textContent = `Meow, my name is ${newCharacter.name}!`
    imageChange.style.backgroundImage = "url(/img/main-face.png)";
    speech.textContent = dynamicContent.messages.staticMessage;
    displayGame();
    resetMe();
    startMessages();
    ageMe();
    startGameTouch();
    startButtonDead();
    hungerInterval = setInterval(function() {
        newCharacter.increaseHunger();
    }, 5000)
    boredInterval = setInterval(function() {
        newCharacter.increaseBoredom();
    }, 8000)
    sleepInterval = setInterval(function() {
        newCharacter.increaseSleepiness();
    }, 11000)
    loveInterval = setInterval(function() {
        newCharacter.increaseLove();
    }, 19000)
}

//resets my other properties once a death requires a new game
function resetMe() {
    newCharacter.hunger = 1;
    newCharacter.boredom = 1;
    newCharacter.sleepiness = 1;
    newCharacter.love = 1;
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
    clearInterval(loveInterval);
}

function hungerDeath() {
    imageChange.style.backgroundImage = "url(/img/died-two.jpeg)";
    clearMe();
    stopGameTouch();
    startButtonLive();
    newCharacter.hungerInterval = null;
    displayHunger.textContent = "Hunger: 10";
    displayStatus.textContent = dynamicContent.messages.deathStatus
    speech.textContent = dynamicContent.messages.hDeathMessage;
    header.textContent = dynamicContent.messages.playAgainMessage;
    return newCharacter
}
function boredDeath() {
    imageChange.style.backgroundImage = "url(/img/died-two.jpeg)";
    clearMe();
    stopGameTouch();
    startButtonLive();
    newCharacter.boredInterval = null;
    displayBoredom.textContent = "Boredom: 10";
    displayStatus.textContent = dynamicContent.messages.deathStatus;
    speech.textContent = dynamicContent.messages.bDeathMessage;
    header.textContent = dynamicContent.messages.playAgainMessage;
    return newCharacter
}
function sleepDeath() {
    imageChange.style.backgroundImage = "url(/img/died-two.jpeg)";
    clearMe();
    stopGameTouch();
    startButtonLive();
    newCharacter.sleepInterval = null;
    displaySleepiness.textContent = "Sleepiness: 10";
    displayStatus.textContent = dynamicContent.messages.deathStatus;
    speech.textContent = dynamicContent.messages.sDeathMessage;
    header.textContent = dynamicContent.messages.playAgainMessage;
    return newCharacter
}

//secret win ending
function loveWin() {
    imageChange.style.backgroundImage = "url(/img/final-love-end.jpeg)";
    clearMe();
    stopGameTouch();
    startButtonLive();
    displayLove.textContent = "Love: 20";
    displayStatus.textContent = dynamicContent.messages.aliveStatus;
    speech.textContent = dynamicContent.messages.loveMessageFour;
    header.textContent = dynamicContent.messages.playAgainMessage;
    return newCharacter
}


//creating Tamagotchi Class
class Tamagotchi {
    constructor(name, age, hunger, boredom, sleepiness, love) {
        this.name = name;
        this.age = age;
        this.hunger = hunger;
        this.boredom = boredom;
        this.sleepiness = sleepiness;
        this.love = love;
    }
    increaseHunger() { 
        imageChange.style.backgroundImage = "url(/img/main-face.png)";
        speech.textContent = dynamicContent.messages.midGameMessage;
        this.hunger++
        if (this.hunger === 3) {
            displayHunger.textContent = "Hunger: " + this.hunger 
            speech.textContent = dynamicContent.messages.hungerMessageOne;
        } else if (this.hunger === 6) {
            displayHunger.textContent = "Hunger: " + this.hunger 
            speech.textContent = dynamicContent.messages.hungerMessageTwo;
        } else if (this.hunger === 8) {
            displayHunger.textContent = "Hunger: " + this.hunger 
            speech.textContent = dynamicContent.messages.hungerMessageThree;
        } else if (this.hunger === 10) {
            displayHunger.textContent = "Hunger: " + this.hunger
            hungerDeath();
        } else {
            displayHunger.textContent = "Hunger: " + this.hunger
        }
    }
    decreaseHunger() {
       if (this.hunger === 1) {
        speech.textContent = dynamicContent.messages.hungerMessageFour;
        imageChange.style.backgroundImage = "url(/img/luna-food-mad.jpeg)";
        return 
        } else {
        this.hunger--
        imageChange.style.backgroundImage = "url(/img/luna-eating.jpeg)";
        displayHunger.textContent = "Hunger: " + this.hunger
        }
    }
    increaseBoredom() {
        speech.textContent = dynamicContent.messages.midGameMessage;
        imageChange.style.backgroundImage = "url(/img/main-face.png)";
        this.boredom++
        if (this.boredom === 3) {
            displayBoredom.textContent = "Boredom: " + this.boredom 
            speech.textContent = dynamicContent.messages.boredMessageOne;
        } else if (this.boredom === 6) {
            displayBoredom.textContent = "Boredom: " + this.boredom
            speech.textContent = dynamicContent.messages.boredMessageTwo; 
        } else if (this.boredom === 8) {
            displayBoredom.textContent = "Boredom: " + this.boredom 
            speech.textContent = dynamicContent.messages.boredMessageThree;
        } else if (this.boredom === 10) {
            displayBoredom.textContent = "Boredom: " + this.boredom
            boredDeath();
        } else {
            displayBoredom.textContent = "Boredom: " + this.boredom
        }
    }
    decreaseBoredom() {
        if (this.boredom === 1) {
            speech.textContent = dynamicContent.messages.boredMessageFour;
            imageChange.style.backgroundImage = "url(/img/luna-bored-mad.jpeg)";
            return
        } else {
            this.boredom--
            imageChange.style.backgroundImage = "url(/img/luna-playing.jpeg)";
            displayBoredom.textContent = "Boredom: " + this.boredom
        }
    }
    increaseSleepiness() {
        speech.textContent = dynamicContent.messages.midGameMessage;
        imageChange.style.backgroundImage = "url(/img/main-face.png)";
        this.sleepiness++
        if (this.sleepiness === 3) {
            displaySleepiness.textContent = "Sleep: " + this.sleepiness 
            speech.textContent = dynamicContent.messages.sleepMessageOne;
        } else if (this.sleepiness === 6) {
            displaySleepiness.textContent = "Sleep: " + this.sleepiness 
            speech.textContent = dynamicContent.messages.sleepMessageTwo;
        } else if (this.sleepiness === 8) {
            displaySleepiness.textContent = "Sleep: " + this.sleepiness 
            speech.textContent = dynamicContent.messages.sleepMessageThree;
        } else if (this.sleepiness === 10) {
            displaySleepiness.textContent = "Sleep: " + this.sleepiness
            sleepDeath();
        } else {
            displaySleepiness.textContent = "Sleep: " + this.sleepiness
        }
    }
    decreaseSleepiness() {
        if (this.sleepiness === 1) {
            speech.textContent = dynamicContent.messages.sleepMessageFour;
            imageChange.style.backgroundImage = "url(/img/luna-sleep-mad.jpeg)";
            return
        } else {
            this.sleepiness--
            imageChange.style.backgroundImage = "url(/img/luna-sleeping.jpeg)";
            displaySleepiness.textContent = "Sleepiness: " + this.sleepiness
        }
    }
    increaseLove() {
        speech.textContent = dynamicContent.messages.midGameMessage;
        imageChange.style.backgroundImage = "url(/img/main-face.png)";
        this.love++ 
        if (this.love === 5) {
            displayLove.textContent = "Love: " + this.love 
            imageChange.style.backgroundImage = "url(/img/luna-and-artemis.jpeg)";
            speech.textContent = dynamicContent.messages.loveMessageOne;
        } else if (this.love === 10) {
            displayLove.textContent = "Love: " + this.love 
            imageChange.style.backgroundImage = "url(/img/luna-and-artemis.jpeg)";
            speech.textContent = dynamicContent.messages.loveMessageTwo; 
        } else if (this.love === 15) {
            displayLove.textContent = "Love: " + this.love 
            imageChange.style.backgroundImage = "url(/img/luna-and-artemis.jpeg)";
            speech.textContent = dynamicContent.messages.loveMessageThree;
        } else if (this.love === 20) {
            displayLove.textContent = "Love: " + this.love 
            loveWin();
        } else {
            displayLove.textContent = "Love: " + this.love 
        }
    }
}

//addEventListeners
window.addEventListener("load", createCharacter);

function startButtonLive() {
startButton.addEventListener("click", startGame);
}

function startButtonDead() {
    startButton.removeEventListener("click", startGame);
}

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
let dynamicContent = {
    messages: {
        staticMessage: "Hi! I'm Sailor Moon! I'll be your tamagotchi translator!",
        midGameMessage: "...",
        playMessage: "If you'd like to play, hit the start button!",
        playAgainMessage: "If you'd like to play again, press the start button!",
        hDeathMessage: "You starved me!",
        bDeathMessage: "You bored me to death!",
        sDeathMessage: "Why didn't you let me sleep?",
        deathStatus: "Status: Dead",
        aliveStatus: "Status: Alive",
        happyBdayMessage: "Wow, it's already been a year!!! Happy Birthday!",
        hungerMessageOne: "I want a snack.",
        hungerMessageTwo: "I'm really hungry.",
        hungerMessageThree: "Feed me, MEOW!",
        hungerMessageFour: "Don't feed me, I'm full!",
        boredMessageOne: "I'm bored.",
        boredMessageTwo: "Play with me!",
        boredMessageThree: "Why won't you play with me!?",
        boredMessageFour: "I don't wanna play right, ME-ow!",
        sleepMessageOne: "I'm sleepy.",
        sleepMessageTwo: "Can I take a nap?",
        sleepMessageThree: "Sleep, Me-OW!",
        sleepMessageFour: "No, I'm not tired!",
        loveMessageOne: "Hmm, I wonder what that love counter is???",
        loveMessageTwo: "Something good might happen if love gets higher?",
        loveMessageThree: "You're getting closer....",
        loveMessageFour: "You unlocked a secret ending and won!"
    }
}