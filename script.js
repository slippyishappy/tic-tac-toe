function Player(marker) {
    let score = 0;
    const addScore = () => score++;
    const getScore = () => score;

    return {marker, getScore, addScore};
};

function startGame() {
    
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
            alert('Place is cell, please choose another cell');
            putMarker(player);
        }
    }
    
    return {playerX, playerO, gameBoard, putMarker};
};

const playerX = Player('X');
const playerO = Player('O');

let game1 = startGame();