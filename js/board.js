let turn = 0;
let points = [0,0];
let piece = ["O", "X"];
let countFill = 0;
let endGame = false;
let chainTripla = [[0, 1, 2], [0,3,6],[3,4,5], [6,7,8] , [0,4,8], [2,4,6], [1,4,7],[2,5,8]];
let winTripla = [];
let countNumLimitGames = 0;
let countNumGame = 1;
let cleanButton = document.getElementById("cleanButton");
let newGameButton = document.getElementById("newGameButton");
cleanButton.addEventListener("click",cleanBoard);
newGameButton.addEventListener("click",newGame);
let numLimitGames = document.getElementById("numLimitGame");
let numActualGame = document.getElementById("numActualGame");
let pointPlayer1 = document.getElementById("pointPlayer1");
let pointPlayer2 = document.getElementById("pointPlayer2");
let boardButtons = Array.from(document.getElementsByClassName("boardButton"));
boardButtons.forEach(x=> x.addEventListener("click",mark));
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
    chainTripla.forEach(tripla=> {
       if(boardButtons[tripla[0]].innerHTML != ""){
        if(boardButtons[tripla[0]].innerHTML==boardButtons[tripla[1]].innerHTML && boardButtons[tripla[1]].innerHTML==boardButtons[tripla[2]].innerHTML){
            state = true;
            winTripla = tripla;
        }
       } 
      }    
    )       
    return state;
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
 boardButtons.forEach(x => x.innerHTML = "");
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
   numLimitGames.innerHTML = countNumLimitGames; 
   countNumGame=1 
   numActualGame.innerHTML =1;
   points=[0,0];
   setPoints();
   cleanBoard();
}