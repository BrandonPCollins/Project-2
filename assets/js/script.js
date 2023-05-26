console.log("Connected")

/* Player Name */

let playerName = []; 

let playerClass = [] ; 


function saveName(){
    playerName = document.getElementById("fname").value;
    console.log(playerName)
    // document.GetElementById("intro").innerHTML = "Welcome " input ; 

    let wrongName =  playerName.slice(1); 


    document.getElementById("intro").innerHTML = `<p class="fade">Hello ${playerName}.</p>` + `<p class="fade2">Hmm, yes I do believe I've heard of a ${playerName}. Definitely a something-${wrongName}</p>` + `<p class="fade2">As I pondered my orb it foretold of your coming. It also told me you were a warrior of some repute. Remind me, of which school do you hail?</p>` + createClasses() ; 
}


/* Create Classes Buttons */ 


function createClasses(){
    return document.getElementById("intro").innerHTML = 
    `<div id="button-container" class="fade2">
            <button class="class-button" onclick="setClass('knight'), startGame()" >Knight</button>
            <button class="class-button" onclick="setClass('thief'), startGame()">Thief</button>
            <button class="class-button" onclick="setClass('wizard'), startGame()">Wizard</button>
            <button class="class-button" onclick="setClass('goblin'), startGame()">Goblin</button>
    </div>`; 
}

function setClass(classtype){
    playerClass = classtype

    console.log(playerClass)
}


// /* Stuff */ 

const textElement = document.getElementById('intro')
const optionButtonsElement = document.getElementById('button-container')


function startGame(){
    /* Create the option Buttons */  
    textElement.innerText = 'Ello ello ' 

    if(playerClass === 'knight'){
        textElement.innerText += '\n\nU R A KNIGHT ' 
    }else if (playerClass === 'thief'){
        textElement.innerText += '\n\nU R A THIEF ' 
    }else if (playerClass === 'wizard'){
        textElement.innerText += '\n\nU R A WIZARD ' 
    }else if (playerClass === 'goblin'){
        textElement.innerText += '\n\nU R A GOBBO' 
    }
}

/*
Math.floor(Math.random() * 10 ); 

*/ 