console.log("Connected");

/* Player Name */

let playerName = [];
let playerClass = [];
let playerHealth = 3; 

const textElement = document.getElementById('intro');
const buttonContainer = document.getElementById('button-container');
const healthProgress = document.getElementById('health-progress');
const healthText = document.getElementById('health-text');

function saveName() {
  playerName = document.getElementById("fname").value;

  // Error message if player does not enter a name
  if (playerName === '') {
      alert("Cute, but no traveller with no name shall enter my Tower!");
      return;
  }

  if (playerName.length <= 1) {
    alert("Your name can't just be one letter, just enter your name >:(");
    return;
}


  console.log(playerName);

  let wrongName = playerName.slice(1);

  document.getElementById("intro").innerHTML = `<p class="fade">Hello ${playerName}.</p>`
    + `<p class="fade2">Hmm, yes I do believe I've heard of a ${playerName}. Definitely a something-${wrongName}</p>`
    + `<p class="fade2">As I pondered my orb, it foretold of your coming. It also told me you were a warrior of some repute. Remind me, of which school do you hail?</p>`;

  document.getElementById("button-container").innerHTML = createClasses();
}

/* Event Listener for the button */ 
document.getElementById('fname').addEventListener('keydown', function(event) {
  // Submit form on Enter key press 
  if (event.key === 'Enter') {
      event.preventDefault(); 
      document.querySelector('button[type="submit"]').click(); 
  }
});


/* Create Classes Buttons */

function createClasses() {
  var classes = ["Knight", "Thief", "Wizard", "Goblin"];
  var buttonHTML = "";

  for (var i = 0; i < classes.length; i++) {
    buttonHTML += `<button class="button fade2" onclick="setClass('${classes[i]}'); startGame()">${classes[i]}</button>`;
  }

  return buttonHTML;
}

function setClass(classtype) {
  playerClass = classtype;
  console.log(playerClass);
}

function startGame() {
  // Create the option Buttons
  textElement.innerHTML = `<p class="fade">You stand before the Wizard's tower. Its five floors have been the bane of many an adventurer, but you are built differently.</p>`;

  if (playerClass === 'Knight') {
    textElement.innerHTML += `\n\n<p class="fade">You know upon reaching the top that the legendary tale of the knight Ser ${playerName} will live forever.</p>`;
  } else if (playerClass === 'Thief') {
    textElement.innerHTML += '\n\nU R A THIEF';
  } else if (playerClass === 'Wizard') {
    textElement.innerHTML += '\n\nU R A WIZARD';
  } else if (playerClass === 'Goblin') {
    textElement.innerHTML += '\n\nU R A GOBBO';
  }

  // Clear previous buttons
  buttonContainer.innerHTML = '';

  var button = document.createElement('button');
  button.textContent = "Boldly go where none have gone before!";
  button.classList.add('button', 'fade');
  button.onclick = function () {
    updateGameContent();
  };
  buttonContainer.appendChild(button);

  // Show the health bar
  var healthBar = document.getElementById('health-bar');
  healthBar.style.display = 'block';  

  // Update health bar progress
  var healthProgress = document.getElementById('health-progress');
  healthText.innerHTML = `<p>${playerHealth} / 3</p>`;

  healthProgress.style.width = playerHealth + 3;
}

var currentStoryNode = 1;

function updateGameContent() {
  var currentStory = story.find(function (node) {
    return node.id === currentStoryNode;
  });

  var storyTextElement = document.getElementById("intro");
  storyTextElement.innerHTML = currentStory.text;

  // Clear previous buttons
  buttonContainer.innerHTML = '';

  // Display buttons for available choices
  for (var i = 0; i < currentStory.choices.length; i++) {
    var choice = currentStory.choices[i];
    var button = document.createElement('button');
    button.textContent = choice.text;
    button.classList.add('button');
    button.onclick = (function (choiceIndex) {
      return function () {
        choose(choiceIndex);
      };
    })(i);
    buttonContainer.appendChild(button);
  }
}

//Damaging Player Health // 

function damagePlayerHealth(amount) {
  playerHealth -= amount;
  if (playerHealth <= 0) {
    //Write game over code here 
  }
}

function updateHealthBar() {
  healthText.innerHTML = `<p>${playerHealth} / 3</p>`;
  healthProgress.style.width = `${(playerHealth / 3) * 100}%`;
}

updateHealthBar(); // Update the health bar initially



// Story Nodes //


// Function for controlling options // 
function choose(choiceIndex) {
  var currentStory = story.find(function (node) {
    return node.id === currentStoryNode;
  });

  if (choiceIndex >= 0 && choiceIndex < currentStory.choices.length) {
    var nextNode = currentStory.choices[choiceIndex].nextNode;

    // This damages the players health // 
    var damage = currentStory.choices[choiceIndex].damage; 
    if (damage) {
      if (damage === 'kill') {
        playerHealth = 0; 
      } else {
        damagePlayerHealth(damage); 
      }
    }

    currentStoryNode = nextNode;

    // Update the game content
    updateGameContent();

    //Update the Players Health
    updateHealthBar(); 
  }
}



var story = [
  {
    id: 1,
    text: "You enter the ground floor of the wizard's tower. The staircase is blocked by a translucent blue field.",
    choices: [
      { text: "Open the door", nextNode: 2, damage: 1 },
      { text: "Look for a window", nextNode: 3 },
      { text: "Look for a window", nextNode: 3 },
      { text: "Sprint at that blue wall, nothing holds you back!", nextNode: 'wallDeath', damage: 'kill' }
    ]
  },
  {
    id: 2,
    text: "You open the door and find yourself in a dark corridor. Which way do you go?",
    choices: [
      { text: "Go left", nextNode: 4 },
      { text: "Go right", nextNode: 5 }
    ]
  },
  {
    id: 3,
    text: "You look for a window, but it's boarded up. What do you do next?",
    choices: [
      { text: "Go back to sleep", nextNode: 6 },
      { text: "Search the room", nextNode: 7 }
    ]
  },
  {
    id: 'wallDeath',
    text: "BZzzzt! You're dead",
    choices: [
      { text: "Go back to sleep", nextNode: 6 },
      { text: "Search the room", nextNode: 7 }
    ]
  }
];
