const cells = document.querySelectorAll(".cell");

const statusText = document.getElementById("status");

const restartBtn = document.getElementById("restartBtn");

const roundText = document.getElementById("round");

const pvpBtn = document.getElementById("pvpBtn");

const aiBtn = document.getElementById("aiBtn");

let currentPlayer = "X";

let gameActive = true;

let gameMode = "pvp";

let roundsPlayed = 0;

let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [

    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]
];

pvpBtn.addEventListener("click", () => {

    gameMode = "pvp";

    restartGame();
});

aiBtn.addEventListener("click", () => {

    gameMode = "ai";

    restartGame();
});

function handleCellClick() {

    const index = this.getAttribute("data-index");

    if (gameState[index] !== "" || !gameActive) {

        return;
    }

    makeMove(index, currentPlayer);

    if (gameMode === "ai" && gameActive && currentPlayer === "O") {

        setTimeout(computerMove, 500);
    }
}

function makeMove(index, player) {

    gameState[index] = player;

    cells[index].textContent = player;

    roundsPlayed++;

    roundText.textContent = `Rounds Played: ${roundsPlayed}`;

    checkWinner();
}

function checkWinner() {

    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {

        const [a, b, c] = winningConditions[i];

        if (
            gameState[a] &&
            gameState[a] === gameState[b] &&
            gameState[a] === gameState[c]
        ) {

            roundWon = true;

            break;
        }
    }

    if (roundWon) {

        statusText.textContent = `Player ${currentPlayer} Wins!`;

        gameActive = false;

        return;
    }

    if (!gameState.includes("")) {

        statusText.textContent = "Game Draw!";

        gameActive = false;

        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function computerMove() {

    let emptyCells = [];

    for (let i = 0; i < gameState.length; i++) {

        if (gameState[i] === "") {

            emptyCells.push(i);
        }
    }

    if (emptyCells.length === 0) {

        return;
    }

    const randomIndex =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];

    makeMove(randomIndex, "O");
}

function restartGame() {

    currentPlayer = "X";

    gameActive = true;

    roundsPlayed = 0;

    gameState = ["", "", "", "", "", "", "", "", ""];

    statusText.textContent = `Player X's Turn`;

    roundText.textContent = `Rounds Played: 0`;

    cells.forEach(cell => {

        cell.textContent = "";
    });
}

cells.forEach(cell => {

    cell.addEventListener("click", handleCellClick);
});

restartBtn.addEventListener("click", restartGame);
