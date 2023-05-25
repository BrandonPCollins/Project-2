console.log("Connected")


/* Player Name */

function saveName(){
    let playerName = document.getElementById("fname").value;
    console.log(playerName)
    // document.GetElementById("intro").innerHTML = "Welcome " input ; 

    document.getElementById("intro").innerHTML = `<p class="fade">Hello ${playerName}.</p>`; 
    document.getElementById("intro").style.color = red; 
}

/*

Math.floor(Math.random() * 10 ); 

*/ 