console.log("Connected")


/* Player Name */

let playerName = []; 

function saveName(){
    playerName = document.getElementById("fname").value;
    console.log(playerName)
    // document.GetElementById("intro").innerHTML = "Welcome " input ; 

    document.getElementById("intro").innerHTML = `<p class="fade">Hello ${playerName}.</p>` + `<p class="fade2">Hello ${playerName}.</p>`; 
}

/*

Math.floor(Math.random() * 10 ); 

*/ 