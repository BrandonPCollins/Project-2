/* Player Name */

let playerName = "";
let playerClass = "";
let playerHealth = 3;

let winCount = 0; 

var currentStoryNode = 1;

const textElement = document.getElementById('intro');
const buttonContainer = document.getElementById('button-container');
const healthProgress = document.getElementById('health-progress');
const healthText = document.getElementById('health-text');

function saveName() {
  playerName = document.getElementById("fname").value;

  // Error message if player does not enter a name
  if (playerName.trim() === '') {
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

/* Event Listener for first name */
document.getElementById('fname').addEventListener('keydown', function (event) {
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
  // Reset story-nodes for post-reset 
  currentStoryNode = 1;

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

function updateGameContent() {


  if (currentStoryNode === 'win') {
    winGame(); // Call the winGame function directly for the win node to prevent errors 
    return;
  }

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

// Function for picking a random Node 
function selectRandomNode(nextNodes) {
  const random = Math.random();
  let accumulatedProbability = 0;

  for (const node of nextNodes) {
    accumulatedProbability += node.probability;
    if (random <= accumulatedProbability) {
      return node.node;
    }
  }
}


//Tracks the number of player victories 
function winGame() {
  winCount++; // Increment the win count

  // Update the win count in the win node text
  document.getElementById("intro").innerHTML = `<p class="fade">Congratulations, ${playerName}!</p>`
    + `<p class="fade2">You have successfully reached the top of the wizard's tower and defeated the evil wizard.</p>`
    + `<p class="fade2">You have beaten the game ${winCount} time(s)!</p>`
    + `<p class="fade2">Will you dare to venture forth once more?</p>`;

  // Display the reset button
  buttonContainer.innerHTML = `<button class="button" onclick="resetGame()">Play Again</button>`;
}

function resetGame() {
  // Reset player variables
  playerName = [];
  playerClass = [];
  playerHealth = 3;

  updateHealthBar()

  // Reset game content
  textElement.innerHTML = "";
  buttonContainer.innerHTML = "";

  var healthBar = document.getElementById('health-bar');
  healthBar.style.display = 'none';

  // Reset completed choices
  story.forEach(function (node) {
    node.choices.forEach(function (choice) {
      choice.completed = false;
    });
  });

  // Show initial introduction
  document.getElementById("intro").innerHTML = `<p class="fade">Greetings adventurer. Your perilous quest to the top of the wizard's tower begins now. But first, introductions.</p>`
    + `<p class="fade2">By what moniker are you best known?</p>`

  // Show input field and "Venture Forth" button
  document.getElementById("button-container").innerHTML = ` <input type="text" id="fname" name="fname" placeholder="???" class="input" required><br>
  <button type="submit" onclick="saveName()" class="button">Venture Forth</button>`;

  document.getElementById('fname').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      document.querySelector('button[type="submit"]').click();
    }
  });
}


function healPlayerHealth(amount) {
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

    // Call function if the choice has one
    if (chosenChoice.action) {
      chosenChoice.action();
    }


    // Update the game content
    updateGameContent();

    //Update the Players Health
    updateHealthBar();
  }
}



const story = [
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
        nextNode: 'floor-two1'
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
        text: "Onwards!",
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
        nextNode: 'floor-three'
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
    text: "You enter the third floor and before you stands a monstrous Orc in gleaming armour. 'None pass Zug-Zug!' he yells.",
    choices: [
      {
        text: "Orcs and Goblins share a common dialect!",
        nextNode: 'floor-threegoblin', playerClass: 'Goblin'
      },
      {
        text: "Then to battle!",
        nextNode: selectRandomNode([{ node: 'floor-threefightwin', probability: 0.6 }, { node: 'floor-threefightlose', probability: 0.4 }])
      }
    ]
  },
  {
    id: 'floor-threegoblin',
    text: "It turns out that Zugzabar Zugzarian, his full name, is far more eloquent and well spoken in his native tongue. <br> You two share a laugh over the misunderstanding that almost led to one of your deaths. He steps aside gladly to allow you to continue your journey.",
    choices: [
      {
        text: "Orcs and Goblins share a common dialect!",
        nextNode: 'floor-four'
      }
    ]
  },
  {
    id: 'floor-threefightwin',
    text: "You easily dispatch of the fearsome guardian and continue on your quest to ascend the wizard's tower.",
    choices: [
      {
        text: "I am a true warrior!",
        nextNode: 'floor-four'
      }
    ]
  },
  {
    id: 'floor-threefightlose',
    text: "Despite taking a deep wound in the struggle, you manage to overcome the fearsome Orc and continue to the next floor.",
    choices: [
      {
        text: "Ouchy.",
        nextNode: 'floor-four', damage: 1 
      }
    ]
  },

  //Fourth Floor// 
  {
    id: 'floor-four',
    text: "You make it to the next floor and find that there's nothing on it.",
    choices: [
      {
        text: "Oh hey that's neat!",
        nextNode: 'floor-five'
      }
    ]
  },

  //Fifth Floor// 
  {
    id: 'floor-five',
    text: "You have reached the final floor of the Wizard's Tower, and before you, seated behind the an esoterica laden table, the Wizard gazes into his orb.",
    choices: [
      {
        text: "I have come to end you, wizard!",
        nextNode: 'floor-fiveyell'
      },
      {
        text: "Wait... I think he's asleep...",
        nextNode: 'floor-fivethief', playerClass: 'Thief'
      }
    ]
  },
  {
    id: 'floor-fiveyell',
    text: "The wizard's eyes flick open to you and glow with a searing white flame. 'You have only come to your doom'. He raises his hand and from its end shoots a flaming white fireball.",
    choices: [
      {
        text: "I'll meet him with my own spell!",
        nextNode: selectRandomNode([{ node: 'floor-fivewizardwin', probability: 0.4 }, { node: 'floor-fivewizardlose', probability: 0.6 }])
        , playerClass: 'Wizard'
      }
    ]
  },
  {
    id: 'floor-fivethief',
    text: "With years of skulking under your belt, you immediately recognise that the wizard isn't pondering anything. He's asleep with his eyes open! <br> You easily creep around the tower's final floor and ransack the place, escaping with your pockets bulging with swag.",
    choices: [
      {
        text: "The treasure is mine!!",
        nextNode: 'win'
      }
    ]
  },
  {
    id: 'floor-fivewizardwin',
    text: "Your years of training pay off as you counterspell the Wizard's flaming fury back at him, and watch as he melts into a white sludge with the consistency of a melted marshmallow. The tower is now yours to command and control!",
    choices: [
      {
        text: "Hahaha I'm the greatest!!",
        nextNode: 'win'
      }
    ]
  },
  {
    id: 'floor-fivewizardlose',
    text: "The Wizard's power is far too much for your puny counterspell, and the last thing you remember is the searing white heat melting your eyeballs from your head.",
    choices: [
      {
        text: "Oh nooooo!!",
        nextNode: 'floor-fivewizarddead', damage: 'kill'
      }
    ]
  },
  {
    id: 'floor-fivewizarddead',
    text: "You are now nothing more than a pile of goo on the wizard's floor, and your one lasting legacy being how much of a pain you are going to be to get out of his carpet.",
    choices: [
      {
        text: "Try Again?",
        nextNode: 1, heal: 3
      }
    ]
  },



  //Victory! Calls the winGame action
  {
    id: 'win',
    text: "You beat that wizard up!",
    choices: [
      {
        text: "You win!",
        action: winGame
      }
    ]
  },

  //Generic Game Over// 
  {
    id: 'gameOver',
    text: "With this choice, you have fallen to the Wizard's tower, and lay dead on the tiles.",
    choices: [
      {
        text: "Try Again?",
        nextNode: 1, heal: 3
      },
    ]
  }

];
