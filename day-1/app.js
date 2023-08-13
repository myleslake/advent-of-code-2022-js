const fs = require('fs');
const readLine = require("readline");

// As a file stream
const fileStream = openFileStream("./elves.txt");

let totalCals = 0;
const elves = [];

fileStream.on("line", (line) => {
    const isEmptyLine = line.trim().length === 0;
    if(isEmptyLine) {
        if(totalCals > 0) elves.push(totalCals);       
        totalCals = 0;
    } else {
        const cals = parseInt(line, 10);
        totalCals += cals;
    }
});

fileStream.on("close", () => {
    if(totalCals > 0) elves.push(totalCals);
    const highestTotal = Math.max(...elves);
    console.log(highestTotal);
});

fileStream.on('error', (err) => {
    console.error('Error reading a line:', err);
});

function openFileStream (fileName) {
    const fileStream = fs.createReadStream(fileName);
    const rl = readLine.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    return rl;
};


// Way to do it reading the entire file at once.
// fs.readFile('./elves.txt', 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//       return;
//     }

//     let elves = getTotal(data);

//     const max = Math.max(...elves);

//     console.log(max);
//   });

// function getTotal(data) {
//     const lines = data.split("\n");

//     let total = 0;
//     const elves = [];

//     for(line of lines) { 
//         if(line.trim() == "") {
//             // end of elf
//             elves.push(total);
//             total = 0;
//         } else {
//             let cals = parseInt(line, 10);
//             total += cals;
//         }     
//     }

//     if(total > 0) elves.push(total);

//     return elves;   
// }