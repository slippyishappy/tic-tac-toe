function Player(marker) {
    let score = 0;
    const addScore = () => score++;
    const getScore = () => score;

    return {marker, getScore, addScore};
};

function setGame() {
    let gameBoard = [];
    const rows = 3;
    const columns = 3;
    
    for (let i = 0; i < rows; i++) {
        gameBoard[i] = [];
        for (let j = 0; j < columns; j++) {
            gameBoard[i][j] = [];
        }
    }

    let putMarker = (player) => {
        let chosenRow = prompt(`What row would you like to place ${player.marker}?`);
        let chosenColumn = prompt(`What about the column? ${player.marker}`);

        if (gameBoard[parseInt(chosenRow) - 1][parseInt(chosenColumn) - 1].length === 0) {
            gameBoard[parseInt(chosenRow) - 1][parseInt(chosenColumn) - 1] = player.marker;
            console.log(gameBoard);
        } else {
            alert('Cell is full, please choose another cell');
            putMarker(player);
        }
    }
    return {gameBoard, putMarker};
};

function gameController() {
    const playerX = Player('X');
    const playerO = Player('O');

    let players = [playerX, playerO];

    let currentPlayer = players[0];

    let game = setGame();

    const switchTurns = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    };

    const playGame = () => {
        let result;
        do {
            console.log(`Player ${currentPlayer.marker}'s turn`);
            game.putMarker(currentPlayer);
            result = checkWinner();
            if (result) {
                if (result === 'tie') {
                    console.log("It's a tie!");
                } else {
                    console.log(`Player ${result} wins!`);
                }
            } else {
                switchTurns();
            }
        } while (!result);
    };

    const checkWinner = () => {
        for (let i = 0; i < 3; i++) {
            if (game.gameBoard[i][0] && game.gameBoard[i][0] ===
                game.gameBoard[i][1] && game.gameBoard[i][0] === 
                game.gameBoard[i][2]) {
                return game.gameBoard[i][0];
            }
        }
    
        // Check columns
        for (let j = 0; j < 3; j++) {
            if (game.gameBoard[0][j] && 
                game.gameBoard[0][j] === game.gameBoard[1][j] && 
                game.gameBoard[0][j] === game.gameBoard[2][j]) {
                return game.gameBoard[0][j];
            }
        }

            // Check diagonals
        if (game.gameBoard[0][0] && 
            game.gameBoard[0][0] === game.gameBoard[1][1] && 
            game.gameBoard[0][0] === game.gameBoard[2][2]) {
            return game.gameBoard[0][0];
            }

        if (game.gameBoard[0][2] && 
            game.gameBoard[0][2] === game.gameBoard[1][1] && 
            game.gameBoard[0][2] === game.gameBoard[2][0]) {
            return game.gameBoard[0][2];
        }
        }

    playGame();
};

gameController();
