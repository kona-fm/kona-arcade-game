//let globally define the player's mark/current player/board/cells
let cells = document.getElementsByClassName("cell")
let playerX = 'X'
let playerO = 'O'
//currPlayer will be determined by "coin toss"
let currPlayer = ''
let board = [
    null, null, null, null, null, null, null, null, null,  
]

//we start with entering the player's names and displaying them on the screen
//only if noth names are entered
//then we enable clicking on the board



function showNames(){
    let player1 = document.getElementById("playerX").value;
    let player2 = document.getElementById("playerO").value;
    
    if (player1 === "" || player2 === "" ){
        alert("Both players must enter names to start game.")
        return
    }

    //assigns players to X or O
    document.getElementById("player1").innerText =  player1 + " will be X and "
    document.getElementById("player2").innerText =  player2 + " will be O"
    
    //choose a random number between one and two to determine who goes first
    let oneOrTwo = Math.floor(Math.random() * 2) + 1

    if (oneOrTwo === 1){
        //update the value of currPlayer
        currPlayer = playerX
        document.getElementById("firstMove").innerText = player1 + " will start the game!"
    } else {
        currPlayer = playerO
        document.getElementById("firstMove").innerText = player2 + " will start the game!"
    }

    //disable submit so that game isn't restarted
    document.getElementById("submit").disabled = true;

    enableCLick()

};


//we must define cellCLicked function before runnning enableClick
//this funtion will fill a clicked cell and determine who goes next
//as well as run a check for a winning combonation
function cellClicked(click){
    //this targets each cell on the board
    let currCell = click.target.id;

    //if it is filled we don't allow user over ride
     if (click.target.innerText){
        return;
    } 

    //each index of the board is set equal to current player value
    //we need to be able to access and fill the specific cell 
    board[currCell] = currPlayer;

    //we then fill the innerText of the cell with the value of current player
    click.target.innerText = currPlayer;

    //we need to check if there are any winning combonations 
    //might need this before we switch players
    winnerChecker()

     //then, switch the players
     if (currPlayer === playerX){
        currPlayer = playerO
    } else {
        currPlayer = playerX
    }

}

//this function loops through cells and gives each one an event listener for a 
//click and runs the cellClicked function
function enableCLick(){
    for(var i = 0; i < cells.length; i++){                                                                                                                                                                                                                                                                                  
    cells[i].addEventListener("click", cellClicked)
    }
}

//we need to check all the winning combinations 
//making sure it doesn't end game the game prematuely w/ matching nulls
//end game and disable further clicking if there is a strike
function winnerChecker () {

    if (board[0] === board[1] && board[0]===board[2]
        && (board[0] !== null && board[1] !== null && board[2] !== null)
        ){
            //lets change the color of the winning row to make it clear
            document.getElementById('0').style.color = "#ab9fc6"
            document.getElementById('1').style.color = "#ab9fc6"
            document.getElementById('2').style.color = "#ab9fc6"

            gameOver()
            disableClick()       
    }

    else if (board[3] === board[4] && board[3]===board[5]
       && (board[3] !== null && board[4] !== null && board[5] !== null)
        ){
            document.getElementById('3').style.color = "#ab9fc6"
            document.getElementById('4').style.color = "#ab9fc6"
            document.getElementById('5').style.color = "#ab9fc6"

            gameOver()
            disableClick()
    }

    else if (board[6] === board[7] && board[6]===board[8] &&
    (board[6] !== null && board[7] !== null && board[8] !== null)){

            document.getElementById('6').style.color = "#ab9fc6"
            document.getElementById('7').style.color = "#ab9fc6"
            document.getElementById('8').style.color = "#ab9fc6"

            gameOver()
            disableClick()   
    }   

    else if (board[0] === board[3] && board[0]===board[6] &&
    (board[0] !== null && board[3] !== null && board[6] !== null)){

            document.getElementById('0').style.color = "#ab9fc6"
            document.getElementById('3').style.color = "#ab9fc6"
            document.getElementById('6').style.color = "#ab9fc6"

            gameOver()
            disableClick() 
   } 

    else if (board[1] === board[4] && board[1]===board[7] &&
        (board[1] !== null && board[4] !== null && board[7] !== null)){

            document.getElementById('1').style.color = "#ab9fc6"
            document.getElementById('4').style.color = "#ab9fc6"
            document.getElementById('7').style.color = "#ab9fc6"

            gameOver()
            disableClick()
             
    }

    else if (board[2] === board[5] && board[2]===board[8] &&
    (board[2] !== null && board[5] !== null && board[8] !== null)){
            document.getElementById('2').style.color = "#ab9fc6"
            document.getElementById('5').style.color = "#ab9fc6"
            document.getElementById('8').style.color = "#ab9fc6"
            
            gameOver()
            disableClick()
           
    }

    else if (board[0] === board[4] && board[0]===board[8] &&
        (board[0] !== null && board[4] !== null && board[8] !== null)){

            document.getElementById('0').style.color = "#ab9fc6"
            document.getElementById('4').style.color = "#ab9fc6"
            document.getElementById('8').style.color = "#ab9fc6"

            gameOver()
            disableClick()
            
    } 

    else if (board[2] === board[4] && board[2]===board[6] &&
        (board[2] !== null && board[4] !== null && board[6] !== null)){  

            document.getElementById('2').style.color = "#ab9fc6"
            document.getElementById('4').style.color = "#ab9fc6"
            document.getElementById('6').style.color = "#ab9fc6"

            gameOver()    
            disableClick()      
    } 

//if we get to the end of all this and now winner
//it must be a draw
   checkDraw()
}


//if every cell in the board does NOT equal null AND there hasn't been a winner declared
//update innertext of our hidden div
function checkDraw (){
    fullBoard = board.every((cell)=> cell !== null && document.getElementById("winner").innerText === '')

    if (fullBoard){
        document.getElementById('draw').innerText = "ITS A DRAW"
        document.getElementById("reset").style.display = "block"
   } 
}


//if there is a winner, update display of hidden div
//update innertext with winner
function gameOver (){

    //grab our innitial player field values
    let player1 = document.getElementById("playerX").value;
    let player2 = document.getElementById("playerO").value;

    if (currPlayer === "X"){
        document.getElementById("winner").innerText = player1 + " wins the game!"
    } else {
        document.getElementById("winner").innerText = player2 + " wins the game!"
    }

   //display hidden reset button
    document.getElementById("reset").style.display = "block"
}


//run a loop that removes the click event listener from each cell
function disableClick (){
    for(var i = 0; i < cells.length; i++){
        cells[i].removeEventListener("click", cellClicked)
    }     
}

    


