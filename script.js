//variables
let player1board = [];
let player2board = [];

let player1Name = '';
let player2Name = '';

let playerIcon = 'x';
let gameOn = true;

//game module
const gameboard = (() => {
    //get data
    const getData = (cell,player) => {
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
    //player turn
    const playerTurn = (player) => {
        document.getElementById('status').innerText = `It's player ${player} turn`;
    }
    //reset game
    const resetGame = () => {
        document.querySelectorAll(".cell").forEach(cell => cell.innerText = '');
        player2board = [];
        player1board = [];
        gameOn = true;
    }
    //check winner
    const checkWinner = (p1Name,p2Name) => {
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
                document.getElementById('status').innerText = `Player ${p2Name} wins`;
                gameOn = false;
                return
            } 
        }
        //check player 1 winning possibility
        for (let i = 0; i < winnerChances.length; i++) {
            if (player1board.indexOf(winnerChances[i][0]) >= 0 
            && player1board.indexOf(winnerChances[i][1]) >= 0 
            && player1board.indexOf(winnerChances[i][2]) >= 0) {
                document.getElementById('status').innerText = `Player ${p1Name} wins`;
                gameOn = false;
                return
            } 
        }
        //check if its a draw
        if (player2board.length == 5 || player1board.length == 5) {
            document.getElementById('status').innerText = `It's a tie`;
            gameOn = false;
        }    
    }
    //start the game pressing the button
    const openGame = () => {
        document.querySelector('.container').classList.remove("fade-out");
        document.querySelector('.container').classList.add("fade-in");
        document.querySelector('.lets-play').classList.add("fade-out");
    }
    return {
        showClicked,
        getData,
        checkWinner,
        resetGame,
        playerTurn,
        openGame
    }
})();

//get the player input
document.querySelectorAll(".cell").forEach( cell => {
    cell.addEventListener('click', () =>{
        if (gameOn === true) {
            gameboard.getData(cell,playerIcon);
            gameboard.showClicked(cell);
            gameboard.checkWinner(player1Name,player2Name);
            if (playerIcon == 'o' && gameOn == true) {
                playerIcon = 'x';
                gameboard.playerTurn(player1Name);
            } else if (playerIcon == 'x' && gameOn == true) {
                playerIcon = 'o';
                gameboard.playerTurn(player2Name);
            }
    }
    })
}) 

//get reset button 
document.getElementById('reset').addEventListener('click', () => {
    gameboard.resetGame();
    if (playerIcon == 'o') {
        playerIcon = 'x';
        gameboard.playerTurn(player1Name);
    } else if (playerIcon == 'x') {
        gameboard.playerTurn(player1Name);
    }
    
}); 

//call the game openinig
document.querySelector('#lets-play-btn').addEventListener('click', (event) => {
    
    gameboard.openGame();
    
});


document.querySelector('.form-input').addEventListener('submit', (event) => {
    event.preventDefault();
    if (document.getElementById('player1').value != '') {
        player1Name = document.getElementById('player1').value;
    } else {
        player1Name = 1;
    }
    if (document.getElementById('player2').value != '') {
        player2Name = document.getElementById('player2').value;
    } else {
        player2Name = 2;
    }
    //show player 1 name at the status
    gameboard.playerTurn(player1Name)
}); 