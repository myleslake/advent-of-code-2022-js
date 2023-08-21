const fs = require("fs");

const rucksackContents = readFile("rucksack-contents-min.txt");
const rucksacks = rucksackContents.split("\r\n");

for(const rucksack of rucksacks) {
    console.log(rucksack);
    
    const split = rucksack.length / 2;  

    const part1 = rucksack.substr(0, split);
    const part2 = rucksack.substr(split, split);

    console.log(part1);
    console.log(part2);

}








function readFile(fileName) {
    try {
        return fs.readFileSync(fileName, "utf8");
    } catch (err) {
        console.log(`There was an error opening the file ${fileName}`);
        console.log(err);
    }
}