//creating global variables to pass into things later on
let characterStatus = "";
let chosenName = "";
let decideAge = Math.floor(Math.random()*99);
let hungerValue = 1;
let boredomValue = 1;
let sleepinessValue = 1;
let boredInterval = null;
let hungerInterval = null;
let sleepInterval = null;

//creating global functions
//prompts user to choose a name
function pickName() {
    chosenName = prompt("What would you like your Tamagotchi name to be?");
}

//creates new character class
let newCharacter = null; //have it empty so that after i create a new character, i can assign the new characters value here
function generateCharacter() {
    newCharacter = new Tamagotchi(chosenName, decideAge, hungerValue, boredomValue, sleepinessValue);
    return newCharacter;
    //newCharacter = instance;
}

//starts game once page loads
function startGame() {
    characterStatus = "alive";
    pickName();
    generateCharacter();
    console.log("i created something");
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
}

//addEventListeners
window.addEventListener("load", startGame)