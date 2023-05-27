console.log("Connected")

/* Player Name */

let playerName = []; 

let playerClass = [] ; 

const textElement = document.getElementById('intro');
const buttonContainer = document.getElementById('button-container');


function saveName(){
    playerName = document.getElementById("fname").value;
    console.log(playerName)
    // document.GetElementById("intro").innerHTML = "Welcome " input ; 

    let wrongName =  playerName.slice(1); 

    document.getElementById("intro").innerHTML = `<p class="fade">Hello ${playerName}.</p>` 
    + `<p class="fade2">Hmm, yes I do believe I've heard of a ${playerName}. Definitely a something-${wrongName}</p>` 
    + `<p class="fade2">As I pondered my orb it foretold of your coming. It also told me you were a warrior of some repute. Remind me, of which school do you hail?</p>` ; 

    document.getElementById("button-container").innerHTML = createClasses();
}


/* Create Classes Buttons */ 

function createClasses() {
  var classes = ["Knight", "Thief", "Wizard", "Goblin"];
  var buttonHTML = "";

  for (var i = 0; i < classes.length; i++) {
    buttonHTML += `<button class="button" onclick="setClass('${classes[i]}'); startGame()">${classes[i]}</button>`;
  }

  return buttonHTML;
}

function setClass(classtype){
    playerClass = classtype

    console.log(playerClass)
}


// /* Stuff */ 

function startGame(){
    /* Create the option Buttons */  
    textElement.innerHTML = `<p class="fade">You stand before the Wizard's tower. Its five floors have been the bane of many an adventurer, but you are built differently.</p>` 

    if(playerClass === 'knight'){
        textElement.innerHTML += `\n\n<p class="fade">You know upon reaching the top that the legendary tale of the knight Ser ${playerName} will live forever.</p>`
    }else if (playerClass === 'thief'){
        textElement.innerHTML += '\n\nU R A THIEF ' 
    }else if (playerClass === 'wizard'){
        textElement.innerHTML += '\n\nU R A WIZARD ' 
    }else if (playerClass === 'goblin'){
        textElement.innerHTML += '\n\nU R A GOBBO' 
    }

    //clear previous buttons 
    buttonContainer.innerHTML = ""


    var button = document.createElement("button")
    button.textContent = "Boldly go where none have gone before!"
    button.classList.add("button", "fade");
    button.onclick = () => {
        gameStartUp();
        updateGameContent();
      };    
    buttonContainer.appendChild(button);
}
  

// Story content //
var currentStoryNode = 1;

function gameStartUp() {
  // Clear previous buttons 
  buttonContainer.innerHTML = "";

  // Generate new buttons 
  var buttonHTML = `
    <div id="button1">
      <button class="button" class = "fade2"></button>
    </div>
    <div id="button2">
      <button class="button"></button>
    </div>
    <div id="button3">
      <button class="button"></button>
    </div>
    <div id="button4">
      <button class="button"></button>
    </div>
  `;

  buttonContainer.innerHTML = buttonHTML;
}

function updateGameContent() {
  var currentStory = story.find(function(node) {
    return node.id === currentStoryNode;
  });

  var storyTextElement = document.getElementById("intro");
  storyTextElement.innerHTML = currentStory.text;

  var choicesContainer = document.getElementById("button-container");

  // Hide all button divs initially
  for (var i = 1; i <= 4; i++) {
    var buttonDiv = document.getElementById("button" + i);
    buttonDiv.style.display = "none";
  }

  // Display buttons for available choices
  for (var i = 0; i < currentStory.choices.length; i++) {
    var buttonDiv = document.getElementById("button" + (i + 1));
    var button = buttonDiv.querySelector("button");
    button.innerText = currentStory.choices[i].text;
    buttonDiv.style.display = "block";
  }
}



var story = [
    {
        id: 1,
        text: "You enter the ground floor of the wizard's tower. The staircase is blocked by a translucent blue field.",
        choices: [
          { text: "Open the door", nextNode: 2 },
          { text: "Look for a window", nextNode: 3 }
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
    ]

    function choose(choiceIndex) {
        var currentStory = story.find(function(node) {
          return node.id === currentStoryNode;
        });
      
        if (choiceIndex >= 0 && choiceIndex < currentStory.choices.length) {
          var nextNode = currentStory.choices[choiceIndex].nextNode;
          currentStoryNode = nextNode;
      
          // Update the game content
          updateGameContent();
        }
      }
      
// 

/*
Math.floor(Math.random() * 10 ); 

*/ 