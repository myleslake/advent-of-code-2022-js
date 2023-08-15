const fs = require("fs");

const strategyGuide = getFileData("./strategy-guide.txt");
const rounds = strategyGuide.split("\r\n");

let totalScore = 0;

for(const round of rounds) {
    const moves = round.split(" ");
    const opponentMove = moves[0];
    const playerMove = moves[1];

    const roundScore = getScore(opponentMove, playerMove);

    totalScore += roundScore;
}

console.log(totalScore);

function getScore(opponentMove, playerMove) {
    const outcomeScore = getPlayerOutcomescore(opponentMove, playerMove);
    const moveScore = getPlayerMoveScore(playerMove);

    return outcomeScore + moveScore;
}

function getPlayerOutcomescore(opponentMove, playerMove) {   
    const playerWon = (playerMove === "X" && opponentMove === "C") 
        || (playerMove === "Y" && opponentMove === "A") 
        || (playerMove === "Z" && opponentMove === "B");

    const playerDraw = (playerMove === "X" && opponentMove === "A") 
        || (playerMove === "Y" && opponentMove === "B") 
        || (playerMove === "Z" && opponentMove === "C");
    
    if(playerWon) {
        return 6;
    } else if (playerDraw) {
        return 3;
    } else {
        return 0;
    }
}

function getPlayerMoveScore(move) {
    if(move === "X") {
        return 1;
    } else if (move === "Y") {
        return 2;
    } else if (move === "Z") {
        return 3;
    } else {
        throw new Error('Invalid player move');
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