let player1board = [];
let player2board = [];

let playerIcon = 'x';
let gameOn = true;

const gameboard = (() => {
    //get data
    const getClicked = (cell,player) => {
        if(cell.innerText == '' && player == 'x') {
            let attribute = cell.getAttribute('data-cell-index');
            player1board.push(parseFloat(attribute)); 
        } else if (cell.innerText == '' && player == 'o') {
            let attribute = cell.getAttribute('data-cell-index');
            player2board.push(parseFloat(attribute)); 
        }
    }
    //render the ui
    const showClicked = (cell) => {
        if(cell.innerText == '') {
            cell.innerText = playerIcon;
        }
    }
    //reset Ui
    const resetUi = () => {
        document.querySelectorAll(".cell").forEach(cell => cell.innerText = '');
        player2board = [];
        player1board = [];
        console.log(player1board)
    }
    //check winner
    const checkWinner = () => {
        const winnerChances = [
            [0,1,2],
            [0,3,6],
            [0,4,8],
            [3,4,5],
            [6,7,8],
            [6,4,2],
            [1,4,7],
            [2,5,8],
        ]
        //check player 1 winning possibility
        for (let i = 0; i < winnerChances.length; i++) {
            if (player2board.indexOf(winnerChances[i][0]) >= 0 
            && player2board.indexOf(winnerChances[i][1]) >= 0 
            && player2board.indexOf(winnerChances[i][2]) >= 0) {
                console.log('o wins')
                gameOn = false;
                return
            } 
        }
        //check player 1 winning possibility
        for (let i = 0; i < winnerChances.length; i++) {
            if (player1board.indexOf(winnerChances[i][0]) >= 0 
            && player1board.indexOf(winnerChances[i][1]) >= 0 
            && player1board.indexOf(winnerChances[i][2]) >= 0) {
                console.log('x wins')
                gameOn = false;
                return
            } 
        }
        //check if its a draw
        if (player2board.length == 5 || player1board.length == 5) {
            console.log('its a draw')
        }
    }
    return {
        showClicked,
        getClicked,
        checkWinner,
        resetUi,
    }
})();

//get the player input
document.querySelectorAll(".cell").forEach( cell => {
    cell.addEventListener('click', () =>{
        if (gameOn === true) {
            console.log(gameOn)
            gameboard.getClicked(cell,playerIcon);
            gameboard.showClicked(cell);
            gameboard.checkWinner();
            console.log(player1board, player2board);
            if (playerIcon == 'o') {
                playerIcon = 'x';
            } else {
                playerIcon = 'o';
            }
    }
    })
}) 
//get reset button 
document.getElementById('reset').addEventListener('click', () => {
    gameboard.resetUi();
}); 

//start the game pressing the button
function openGame() {
    document.querySelector('.container').classList.remove("fade-out");
    document.querySelector('.container').classList.add("fade-in");
    document.querySelector('.lets-play').classList.add("fade-out");
}