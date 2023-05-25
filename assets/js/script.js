console.log("Connected")


/* Player Name */

let playerName = []; 

function saveName(){
    playerName = document.getElementById("fname").value;
    console.log(playerName)
    // document.GetElementById("intro").innerHTML = "Welcome " input ; 

    let wrongName =  playerName.slice(1); 


    document.getElementById("intro").innerHTML = `<p class="fade">Hello ${playerName}.</p>` + `<p class="fade2">Hmm, yes I do believe I've heard of a ${playerName}. Definitely a something-${wrongName}</p>` + `<p class="fade2">As I pondered my orb it foretold of your coming. It also told me you were a warrior of some repute. Remind me, of which school do you hail?</p>`; 
}

/*
Math.floor(Math.random() * 10 ); 

*/ 