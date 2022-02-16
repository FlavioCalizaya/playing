let turn = 0;
let points = [0,0];
let piece = ["O", "X"];
let countFill = 0;
let endGame = false;
let chainTripla = [];
let chainNTupla = [];
getChainNTupla(3);
let winTripla = [];
let countNumLimitGames = 0;
let countNumGame = 1;
let boardSize = 0;
let cleanButton = document.getElementById("cleanButton");
let newGameButton = document.getElementById("newGameButton");
cleanButton.addEventListener("click",cleanBoard);
newGameButton.addEventListener("click",newGame);
let numLimitGames = document.getElementById("numLimitGame");
let numActualGame = document.getElementById("numActualGame");
let pointPlayer1 = document.getElementById("pointPlayer1");
let pointPlayer2 = document.getElementById("pointPlayer2");
let boardButtons = document.getElementsByClassName("boardButton");
let boardContainer = document.getElementById("boardContainer");
Array.from(boardButtons).forEach(x=> x.addEventListener("click",mark));
function mark(event){
    let fixedButton = event.target;
    if(!endGame && fixedButton.innerHTML =="" ){
       fixedButton.innerHTML = piece[turn];
       countFill +=1;
       if(countFill>8){
          endGame = true;
          if(!verifiyPieces()){
              alert("there isn't winner");
              countNumGame += 1;
          }
       }
       if(verifiyPieces()){
         endGame = true;
         points[turn] += 1;
         paintWinLine();
       }
       changeTurn();
   }

}
function changeTurn(){
    turn +=1;
    turn %=2;
}
function verifiyPieces(){
    let state = false;
    chainNTupla.forEach(tripla=> {
       if(boardButtons[tripla[0]].innerHTML != ""){

        if(verifyArrayEqual(tripla)){
            state = true;
            winTripla = tripla;
        }
       } 
      }    
    )       
    return state;
}
function verifyArrayEqual(tripla){
    let isEqual = true;
    for(let i = 0; i< tripla.length-1; i++){
          if(boardButtons[tripla[i]].innerHTML != boardButtons[tripla[i+1]].innerHTML){
             isEqual = false;
         }
     }
    return isEqual
}
function paintWinLine(){
    winTripla.forEach(index =>{
        boardButtons[index].style.backgroundColor = 'green';
    })
    setPoints();
    alert("player "+ (turn+1) +" win");
    countNumGame += 1;
    if(countNumLimitGames > 1){
        if(countNumGame>countNumLimitGames){
            if(points[0]>points[1]){
                alert("player 1 win the game");
            }
            else{
                if(points[0] < points[1]){
                    alert("player 2 win the game");
                }
                else{
                    alert("the two players have the same points");
                }
            }
            points=[0,0];
            setPoints();
            numLimitGames.innerHTML = "undefine";
            countNumGame = 1;
            numActualGame.innerHTML = 1;
            cleanBoard();

        }
    }
}
function cleanBoard(){
    Array.from(boardButtons).forEach(x => x.innerHTML = "");
 countFill = 0;
 numActualGame.innerHTML = countNumGame;
 endGame = false;
 turn = 0;
 winTripla.forEach(index =>{
    boardButtons[index].style.backgroundColor = 'white';
})
}
function setPoints(){
    pointPlayer1.innerHTML= points[0];
    pointPlayer2.innerHTML = points[1];
}
function newGame(){
   countNumLimitGames = prompt("input the limit matchs");
   boardSize = prompt('input the board sice');
   numLimitGames.innerHTML = countNumLimitGames; 
   countNumGame=1 
   numActualGame.innerHTML =1;
   points=[0,0];
   setPoints();
   cleanBoard();
   getBoard(boardSize);
   getChainNTupla(boardSize);
   boardButtons = document.getElementsByClassName("boardButton");
   Array.from(boardButtons).forEach(x=> x.addEventListener("click",mark));
}
function getBoard(boardSize){
    let i = 0;
    boardContainer.innerHTML = "";
    for(i=0; i< boardSize*boardSize; i++){
        let buttonBoard = document.createElement("button");
        buttonBoard.className="boardButton";
        buttonBoard.style.width = 450/boardSize+'px';
        buttonBoard.style.height = 450/boardSize+'px';
        buttonBoard.style.fontSize = 3*6/boardSize +'em';
        boardContainer.appendChild(buttonBoard);
    }
 }
function getChainNTupla(boardSize){
    chainNTupla = [];
    let row = [];
    let column = [];
    let diagonal1 = [];
    let diagonal2 = [];
    let i = 0;
    let j=0;
    for(i=0 ; i<boardSize; i++){
        diagonal1[i] = i+(boardSize)*i;
        diagonal2[i] = (boardSize-1)+(boardSize-1)*i;
        console.log(i);
        console.log(boardSize);
    }
    console.log('dia1: '+diagonal1);
    chainNTupla.push(diagonal1);
    chainNTupla.push(diagonal2);
    for(i=0;i<boardSize;i++){
        row = [];
        column =[];
       for(j=0;j<boardSize;j++){
          row[j] = i*boardSize+j;
          column[j] = i+j*boardSize; 
       }
       chainNTupla.push(row);
       chainNTupla.push(column);
    }
    console.log(chainNTupla);
}