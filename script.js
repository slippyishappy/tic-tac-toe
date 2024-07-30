function setGame() {
    let boardContainer = document.querySelector('.board');
    let boardArray = [];
    let resultDisplay = document.querySelector('.resultDisplay');
    const rows = 3;
    const columns = 3;
    let cell;

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

    // Creates the board/grid in the DOM
    let createGrid = () => {
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
                    const clickedCell = event.target;
                    let rowCell = clickedCell.dataset.row;
                    let columnCell = clickedCell.dataset.column;
                    if (clickedCell.innerHTML === '') {
                        boardArray[rowCell][columnCell] = `${currentPlayer}`;
                        console.log(boardArray);
                        clickedCell.innerHTML = `${currentPlayer}`;
                        switchTurns();
                    } else {
                        resultDisplay.textContent = "The cell is full, please choose another one!";
                    }
                });

                boardContainer.appendChild(cell);
            }
        }
    };

    createGrid();
}

setGame();