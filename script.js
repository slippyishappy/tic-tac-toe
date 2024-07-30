let start = document.querySelector('#start');
let restartBtn = document.querySelector("#restart");

function setGame() {
    let boardContainer = document.querySelector('#container');
    let boardArray = [];
    let resultDisplay = document.querySelector('.resultDisplay');
    const rows = 3;
    const columns = 3;
    let cell;
    let gameActive = true;

    // Sets up the two players, an array of them, and the current player to switch later on.
    const playerX = 'X';
    const playerO = 'O';
    let players = [playerX, playerO];
    let currentPlayer = players[0];

    // Function to switch turns for the players
    let switchTurns = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
        resultDisplay.textContent = `It's player ${currentPlayer}'s turn`;
    }

    let checkWinner = () => {
        for (let i = 0; i < 3; i++) {
            if (boardArray[i][0] && boardArray[i][0] ===
                boardArray[i][1] && boardArray[i][0] === 
                boardArray[i][2]) {
                return boardArray[i][0];
            }
        }
    
        // Check columns
        for (let j = 0; j < 3; j++) {
            if (boardArray[0][j] && 
                boardArray[0][j] === boardArray[1][j] && 
                boardArray[0][j] === boardArray[2][j]) {
                return boardArray[0][j];
            }
        }

            // Check diagonals
        if (boardArray[0][0] && 
            boardArray[0][0] === boardArray[1][1] && 
            boardArray[0][0] === boardArray[2][2]) {
            return boardArray[0][0];
            }

        if (boardArray[0][2] && 
            boardArray[0][2] === boardArray[1][1] && 
            boardArray[0][2] === boardArray[2][0]) {
            return boardArray[0][2];
        }

        if (boardArray.every(row => row.every(cell => cell !== ''))) {
            return 'tie';
        }

        return null;
    };

    // Creates the board/grid in the DOM
    let createGrid = () => {
        boardContainer.classList.add('board');
        for (let i = 0; i < rows; i++) {
            boardArray[i] = [];
            for (let j = 0; j < columns; j++) {
                cell = document.createElement("button");
                cell.classList.add(`cell`);
                cell.dataset.row = i;
                cell.dataset.column = j;
                boardArray[i][j] = '';
    
                // Adds an event listener for each one of the cells created
                cell.addEventListener('click', (event) => {
                    if (!gameActive) {
                        return;
                    }
                    const clickedCell = event.target;
                    let rowCell = clickedCell.dataset.row;
                    let columnCell = clickedCell.dataset.column;

                    if (currentPlayer === 'X') {
                        clickedCell.style.color = "#E3651D";
                    } else if (currentPlayer === 'O') {
                        clickedCell.style.color = "#005B41";
                    }

                    if (clickedCell.innerHTML === '') {
                        boardArray[rowCell][columnCell] = `${currentPlayer}`;
                        console.log(boardArray);
                        clickedCell.innerHTML = `${currentPlayer}`;
                        
                        const winner = checkWinner();
                        if (winner) {
                            gameActive = false;
                            if (winner === 'tie') {
                                resultDisplay.textContent = "It's a tie!";
                            } else {
                                resultDisplay.textContent = `Player ${winner} wins!`;
                            }
                        } else {
                            switchTurns();
                        }
                    } else {
                        resultDisplay.textContent = "The cell is full, please choose another one!";
                    }
                });
    
                boardContainer.appendChild(cell);
            }
        }
    };

    restartBtn.addEventListener("click", () => {
        const cells = document.querySelectorAll(".cell");

        cells.forEach((cell) => {
            cell.innerHTML = '';
            let rowCell = cell.dataset.row;
            let columnCell = cell.dataset.column;
            boardArray[rowCell][columnCell] = '';
            resultDisplay.textContent = '';
            currentPlayer = players[0];
        });
        gameActive = true;
    });

    createGrid();
}

start.addEventListener('click', () => {
    setGame();
    start.style.visibility = 'hidden';
    restartBtn.removeAttribute('hidden');
});