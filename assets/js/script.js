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
    textElement.innerHTML += '\n\n<p class="fade">You have heard of the treasures that lie atop this legendary tower, and with the plunder you find it will change your life around!</p>';
  } else if (playerClass === 'Wizard') {
    textElement.innerHTML += '\n\n<p class="fade">The wizard of this tower has horded knowledge and wizard for far too long. You will redistribute his scrolls so that no longer will 99% of the spells be horded by 1% of the wizards.</p>';
  } else if (playerClass === 'Goblin') {
    textElement.innerHTML += '\n\n<p class="fade">As a Goblin of the Knee-Biter tribe, you have been tasked with murdering the funny hat magic man and bringing back his beard as trophy! Let the world fear the green!</p>';
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

    // Check if require a specific player class & if choice should be repeatable 
    if ((!choice.playerClass || choice.playerClass === playerClass) && (!choice.completed || choice.repeatable || !choice.hasOwnProperty('repeatable'))) {
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
}

function healPlayerHealth(amount){
  playerHealth += amount

  if (playerHealth > 3) {
    playerHealth = 3;
  }

}

//Damaging Player Health // 

function damagePlayerHealth(amount) {
  playerHealth -= amount;

  if (playerHealth < 0) {
    playerHealth = 0;
  }
}

function updateHealthBar() {
  healthText.innerHTML = `<p>${playerHealth} / 3</p>`;
  healthProgress.style.width = `${(playerHealth / 3) * 100}%`;
}

// Reset Game after game over// 

function resetGame() {
  playerHealth = 3;
  updateHealthBar(); 
  currentStoryNode = 1;
  updateGameContent();
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

    var chosenChoice = currentStory.choices[choiceIndex];

    if (!chosenChoice.repeatable) {
      // Mark the choice as completed if not repeatable
      chosenChoice.completed = true;
    }


    // This damages the players health // 
    var damage = currentStory.choices[choiceIndex].damage; 
    if (damage) {
      if (damage === 'kill') {
        playerHealth = 0; 
      } else {
        damagePlayerHealth(damage); 
        if (playerHealth <= 0) {
          nextNode = 'gameOver'; 
        }
      }
    }


    // This heals the players health // 
    var heal = currentStory.choices[choiceIndex].heal;
    if (heal) {
      healPlayerHealth(heal);
    }
    currentStoryNode = nextNode;

    // Update the game content
    updateGameContent();

    //Update the Players Health
    updateHealthBar(); 
  }
}



var story = [
  // First Floor//
  {
    id: 1,
    text: "You enter the ground floor of the wizard's tower. The staircase is blocked by a translucent blue field, the floor coated with .",
    choices: [
      { text: "Investigate the bookshelf", nextNode: 2, },
      { text: "Use your own magic on this pitiful warding spell", nextNode: 'wizardSkip', playerClass: 'Wizard' },
      { text: "Sprint at that blue wall, nothing holds you back!", nextNode: 'wallDeath', damage: 'kill' },
      { text: "Bite off your toes", nextNode: 'goblinToes1', playerClass: 'Goblin', damage: 1, repeatable: false }
    ]
  },
  {
    id: 2,
    text: "The bookshelf is stocked with books and vials, what will you do?",
    choices: [
      { text: "Drink the fizzy green vial", nextNode: 3, damage: 1, repeatable: false },
      { text: "Drink the purple vial", nextNode: 3, damage: 1, repeatable: false },
      { text: "Riffle through the books", nextNode: 4 }
    ]
  },
  {
    id: 3,
    text: "You feel queasy and suddenly your stomach is racked with pain. That'll teach you not to drink strange liquids left out in a wizard's house.",
    choices: [
      { text: "That was stupid...", nextNode: 2 }
    ]
  },
  {
    id: 4,
    text: " In the books you find a glyph that you recognise as the Ward of McGuffin, a powerful mage who was said to be able to overcome any triviality. Upon touching it the Glyph shines and the blue sheen around the doorway fades, allowing you access to the next floor of the tower..",
    choices: [
      { text: "Onwards and Upwards!", nextNode: 'floor-two' }
    ]
  },
  {
    id: 'wallDeath',
    text: "You spring full force at the blue sheen blocking the path to the stairs. Unfortunately upon immediate contact with the warding spell you turn to ash.",
    choices: [
      {
        text: "Try Again?",
        nextNode: 1, heal: 3 
      },
    ]
  },
  {
    id: 'wizardSkip',
    text: "This ward is of little consequence to a mage of your might!",
    choices: [
      {
        text: "Onto the next floor!",
        nextNode: 'floor-two' 
      },
    ]
  },
  {
    id: 'goblinToes1',
    text: "Goblin toes itchy. Be better if you had none. It hurts but at least your stomach is full now.",
    choices: [
      { text: "Yum yum!", nextNode: 1, heal: 1, repeatable: false }
    ]
  },

  //Second Floor//
  {
    id: 'floor-two',
    text: "Having dealt with the wizard's ward you advance to the next floor by ascending a winding staircase. Before you now sits two doors, and before each door a man in red and blue livery respectively. <br>'None shall pass!' speaks the one in Red. 'Unless you answer our riddle!' follows his twin in blue.",
    choices: [
      {
        text: "Right, let's hear it.",
        nextNode: 'floor-two1', heal: 3 
      }
    ]
  },
  {
    id: 'floor-two1',
    text: "'One of these doors leads to certain death, the other to the next floor.' a voice speaks into your mind, that you know to be the Wizard of this tower. <br> 'You may ask one question to discern your option, but know that one guard always lies, and the other always tells the truth!'",
    choices: [
      {
        text: "Riddles are dumb, and knights solve their problems with swords!",
        nextNode: 'floor-twoknight', playerClass: 'Knight'
      },
      {
        text: "Every good rogue knows this one. 'What door would the other guard point to if I asked him for the right one?'",
        nextNode: 'floor-twocorrect', playerClass: 'Thief'
      },
      {
        text: "I'll ask 'If I asked what door led to the next floor, which would the other guard point to?'",
        nextNode: 'floor-twocorrect'
      },
      {
        text: "I'll ask them to tell me which door is the wrong one!",
        nextNode: 'floor-twowrong', damage: 'kill'
      },
      {
        text: "I'll ask 'If I asked what door led to certain death, which would the other guard point to?'",
        nextNode: 'floor-twowrong', damage: 'kill'
      }
    ]
  },
  {
    id: 'floor-twoknight',
    text: "A brief thrashing later and you've made short work of the red guard, leaving his cowering twin. A blunt 'Are you the dead one' discerns quickly whether he is the honest or the liar, and makes it simple to continue upwards through the correct door.",
    choices: [
      {
        text: "Riddles are dumb, and knights solve their problems with swords!",
        nextNode: 'floor-three'
      }
    ]
  },
  {
    id: 'floor-twocorrect',
    text: "The guard you ask points to the door opposite his own, and being the astute riddle solver that you are you know that that irregardless of whether he points in dishonesty or candor that you can safely walk through the opposite door and to the next floor.",
    choices: [
      {
        text: "You confidently walk through the door and to the next floor!",
        nextNode: 'floor-three,'
      },
    ]
  },
  {
    id: 'floor-twowrong',
    text: "You confidently walk thorugh the door you believe to be the correct one, and then immediately fall to your death and are devoured by Owl-Bears.",
    choices: [
      {
        text: "Try Again?",
        nextNode: 1, heal: 3 
      },
    ]
  },


  //Third Floor// 
  {
    id: 'floor-three',
    text: "You enter the third floor now",
    choices: [
      {
        text: "This is as far as I've written so far D:!",
        nextNode: 'floor-three'
      }
    ]
  },

  //Fourth Floor// 
  {
    id: 'floor-four',
    text: "A brief thrashing later and you've made short work of the red guard, leaving his cowering twin. A blunt 'Are you the dead one' discerns quickly whether he is the honest or the liar, and makes it simple to continue upwards through the correct door.",
    choices: [
      {
        text: "Riddles are dumb, and knights solve their problems with swords!",
        nextNode: 'floor-three'
      }
    ]
  },

  //Fifth Floor// 
  {
    id: 'floor-five',
    text: "You have reached the final floor of the Wizard's Tower, and before you, seated behind the an esoterica laden table, the Wizard gazes into his orb.",
    choices: [
      {
        text: "Riddles are dumb, and knights solve their problems with swords!",
        nextNode: 'winNode'
      }
    ]
  },

  //Victory!// 
  {
    id: 'winNode',
    text: "Congratulations, you have conquered the Wizard's tower!",
    choices: [
      {
        text: "Play Again?",
        nextNode: 1
      }
    ]
  },

  //Generic Game Over// 
  {
    id: 'gameOver',
    text: "With this choice, you have fallen to the Wizard's tower.",
    choices: [
      {
        text: "Try Again?",
        nextNode: 1, heal: 3 
      },
    ]
  }
  
];
