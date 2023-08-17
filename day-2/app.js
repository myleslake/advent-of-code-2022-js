const fs = require("fs");

const strategyGuide = getFileData("./strategy-guide.txt");
const rounds = strategyGuide.split("\r\n");

let totalScore = 0;

for(const round of rounds) {
    const moves = round.split(" ");
    const opponentMove = moves[0];
    const playerOutcome = moves[1];

    const roundScore = getScore(opponentMove, playerOutcome);

    totalScore += roundScore;
}

console.log(totalScore);

function getScore(opponentMove, playerOutcome) {
    const playerMove = getPlayerMove(opponentMove, playerOutcome);
    const outcomeScore = getPlayerOutcomescore(playerOutcome);
    const moveScore = getPlayerMoveScore(playerMove);

    return outcomeScore + moveScore;
}

function getPlayerMove(opponentMove, playerOutcome) {
    const playerWin = "Z";
    const playerDraw = "Y";
    let playerMove = "";

    const opponentMoves = ["A", "B", "C"];
    const playerMoves = ["Rock", "Paper", "Scissors"];

    const opponentIndex = opponentMoves.indexOf(opponentMove);
    
    if(playerOutcome === playerWin) {
        let playerIndex = opponentIndex + 1;

        if((playerIndex + 1) % 3 > 0) {
            playerIndex = (playerIndex + 1) % 3 - 1;
        }

        playerMove = playerMoves[playerIndex];
    } else if (playerOutcome === playerDraw) {      
        playerMove = playerMoves[opponentIndex];
    } else {
        let playerIndex = opponentIndex + 2;

        if((playerIndex + 1) % 3 > 0) {
            playerIndex = (playerIndex + 1) % 3 - 1;
        }

        playerMove = playerMoves[playerIndex];        
    }

    return playerMove;
}

function getPlayerOutcomescore(playerOutcome) {   
    if(playerOutcome === "Z") {
        return 6;
    } else if (playerOutcome === "Y") {
        return 3;
    } else {
        return 0;
    }
}

function getPlayerMoveScore(move) {
    if(move === "Rock") {
        return 1;
    } else if (move === "Paper") {
        return 2;
    } else if (move === "Scissors") {
        return 3;
    } else {
        console.log('Invalid player move');
    }
}

function getFileData(filePath) {
    try {
        const data = fs.readFileSync(filePath, { encoding: "utf-8" });
        return data;
    } catch (err) {
        console.log(err);
    }
}

// async version
// async function getFileData(filePath) {
//     return fs.readFile(filePath, { encoding: "utf-8"})
//         .then(data => {
//             return data;
//         })
//         .catch(err => {
//             console.log(`An error occured while reading the file ${filePath}`);
//         });
// }