console.log("Connected")

/* Player Name */

let playerName = []; 

let playerClass = [] ; 


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

function createClasses(){
    return document.getElementById("button-container").innerText = 
    `<div id="button-container" class="fade2">
            <button class="button" onclick="setClass('knight'), startGame()">Knight</button>
            <button class="button" onclick="setClass('thief'), startGame()">Thief</button>
            <button class="button" onclick="setClass('wizard'), startGame()">Wizard</button>
            <button class="button" onclick="setClass('goblin'), startGame()">Goblin</button>
    </div>`; 
}

function setClass(classtype){
    playerClass = classtype

    console.log(playerClass)
}


// /* Stuff */ 

const textElement = document.getElementById('intro')
const buttonContainer = document.getElementById('button-container')


function startGame(){
    /* Create the option Buttons */  
    textElement.innerText = `You stand before the Wizard's tower. Its five floors have been the bane of many an adventurer, but you are built differently.` 

    if(playerClass === 'knight'){
        textElement.innerText += `\n\nYou know upon reaching the top that the legendary tale of the knight Ser ${playerName} will live forever.`
    }else if (playerClass === 'thief'){
        textElement.innerText += '\n\nU R A THIEF ' 
    }else if (playerClass === 'wizard'){
        textElement.innerText += '\n\nU R A WIZARD ' 
    }else if (playerClass === 'goblin'){
        textElement.innerText += '\n\nU R A GOBBO' 
    }

    //clear previous buttons 
    buttonContainer.innerHTML = ""


    var button = document.createElement("button")
    button.textContent = "Boldly go where none have gone before!"
    button.className  = "button"
    button.onclick = updateGameContent;

    buttonContainer.appendChild(button);
}


  
  

// Story content //
var currentStoryNode = 1;


function updateGameContent() {
    var currentStory = story.find(function(node) {
      return node.id === currentStoryNode;
    });
  
    var storyTextElement = document.getElementById("intro");
    storyTextElement.innerText = currentStory.text;
  
    var choicesContainer = document.getElementById("button-container");
    var choiceButtons = choicesContainer.getElementsByTagName("button");
  
    for (var i = 0; i < currentStory.choices.length; i++) {
      choiceButtons[i].innerText = currentStory.choices[i].text;
    }
  }



var story = [
    {
        id: 1,
        text: "You stand before the tower of the wizard. What do you do?",
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