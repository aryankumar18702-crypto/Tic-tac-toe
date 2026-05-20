const cells = document.querySelectorAll(".cell");

const statusText =
    document.getElementById("status");

const restartBtn =
    document.getElementById("restartBtn");

const roundsText =
    document.getElementById("rounds");

const xWinsText =
    document.getElementById("xWins");

const oWinsText =
    document.getElementById("oWins");

const drawsText =
    document.getElementById("draws");

const pvpBtn =
    document.getElementById("pvpBtn");

const aiBtn =
    document.getElementById("aiBtn");

const playerOName =
    document.getElementById("playerOName");

let currentPlayer = "X";

let gameActive = true;

let gameMode = "pvp";

let roundsCompleted = 0;

let xWins = 0;

let oWins = 0;

let draws = 0;

let gameState = [
    "", "", "",
    "", "", "",
    "", "", ""
];

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

    playerOName.textContent =
        "Player O";

    restartMatch();
});

aiBtn.addEventListener("click", () => {

    gameMode = "ai";

    playerOName.textContent =
        "Computer";

    restartMatch();
});

function handleCellClick() {

    const index =
        this.getAttribute("data-index");

    if (
        gameState[index] !== "" ||
        !gameActive
    ) {
        return;
    }

    makeMove(index, currentPlayer);

    if (
        gameMode === "ai" &&
        gameActive &&
        currentPlayer === "O"
    ) {

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

    for (
        let i = 0;
        i < winningConditions.length;
        i++
    ) {

        const [a, b, c] =
            winningConditions[i];

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

        roundsCompleted++;

        roundsText.textContent =
            `Rounds Completed: ${roundsCompleted}`;

        if (currentPlayer === "X") {

            xWins++;

            xWinsText.textContent =
                xWins;

            statusText.textContent =
                "Player X Wins This Round!";

        } else {

            oWins++;

            oWinsText.textContent =
                oWins;

            if (gameMode === "ai") {

                statusText.textContent =
                    "Computer Wins This Round!";

            } else {

                statusText.textContent =
                    "Player O Wins This Round!";
            }
        }

        setTimeout(resetBoard, 1500);

        return;
    }

    if (!gameState.includes("")) {

        gameActive = false;

        draws++;

        roundsCompleted++;

        drawsText.textContent =
            draws;

        roundsText.textContent =
            `Rounds Completed: ${roundsCompleted}`;

        statusText.textContent =
            "Round Draw!";

        setTimeout(resetBoard, 1500);

        return;
    }

    currentPlayer =
        currentPlayer === "X"
        ? "O"
        : "X";

    if (
        gameMode === "ai" &&
        currentPlayer === "O"
    ) {

        statusText.textContent =
            "Computer's Turn";

    } else {

        statusText.textContent =
            `Player ${currentPlayer}'s Turn`;
    }
}

function computerMove() {

    let emptyCells = [];

    for (
        let i = 0;
        i < gameState.length;
        i++
    ) {

        if (gameState[i] === "") {

            emptyCells.push(i);
        }
    }

    if (emptyCells.length === 0) {

        return;
    }

    const randomIndex =
        emptyCells[
            Math.floor(
                Math.random() *
                emptyCells.length
            )
        ];

    makeMove(randomIndex, "O");
}

function resetBoard() {

    gameState = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    currentPlayer = "X";

    gameActive = true;

    statusText.textContent =
        "Player X's Turn";

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

    cell.addEventListener(
        "click",
        handleCellClick
    );
});

restartBtn.addEventListener(
    "click",
    restartMatch
);
