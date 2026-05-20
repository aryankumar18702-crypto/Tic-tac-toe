const cells = document.querySelectorAll(".cell");

const statusText = document.getElementById("status");

const restartBtn = document.getElementById("restartBtn");

const roundsText = document.getElementById("rounds");

const xWinsText = document.getElementById("xWins");

const oWinsText = document.getElementById("oWins");

const drawsText = document.getElementById("draws");

const targetWinsSelect = document.getElementById("targetWins");

const pvpBtn = document.getElementById("pvpBtn");

const aiBtn = document.getElementById("aiBtn");

let currentPlayer = "X";

let gameActive = true;

let gameMode = "pvp";

let roundsCompleted = 0;

let xWins = 0;

let oWins = 0;

let draws = 0;

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

    restartMatch();
});

aiBtn.addEventListener("click", () => {

    gameMode = "ai";

    restartMatch();
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

        gameActive = false;

        if (currentPlayer === "X") {

            xWins++;

            xWinsText.textContent = xWins;

        } else {

            oWins++;

            oWinsText.textContent = oWins;
        }

        roundsCompleted++;

        roundsText.textContent =
            `Rounds Completed: ${roundsCompleted}`;

        const targetWins = parseInt(targetWinsSelect.value);

        if (xWins === targetWins) {

            statusText.textContent =
                "Player X Wins The Match!";

            return;
        }

        if (oWins === targetWins) {

            statusText.textContent =
                gameMode === "ai"
                ? "Computer Wins The Match!"
                : "Player O Wins The Match!";

            return;
        }

        statusText.textContent =
            `Player ${currentPlayer} Wins Round!`;

        setTimeout(resetBoard, 1500);

        return;
    }

    if (!gameState.includes("")) {

        draws++;

        drawsText.textContent = draws;

        roundsCompleted++;

        roundsText.textContent =
            `Rounds Completed: ${roundsCompleted}`;

        statusText.textContent = "Round Draw!";

        gameActive = false;

        setTimeout(resetBoard, 1500);

        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.textContent =
        `Player ${currentPlayer}'s Turn`;
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

function resetBoard() {

    gameState = ["", "", "", "", "", "", "", "", ""];

    currentPlayer = "X";

    gameActive = true;

    statusText.textContent = "Player X's Turn";

    cells.forEach(cell => {

        cell.textContent = "";
    });
}

function restartMatch() {

    xWins = 0;

    oWins = 0;

    draws = 0;

    roundsCompleted = 0;

    xWinsText.textContent = 0;

    oWinsText.textContent = 0;

    drawsText.textContent = 0;

    roundsText.textContent =
        "Rounds Completed: 0";

    resetBoard();
}

cells.forEach(cell => {

    cell.addEventListener("click", handleCellClick);
});

restartBtn.addEventListener("click", restartMatch);
