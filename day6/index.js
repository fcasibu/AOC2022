const fs = require("fs");

// I was writing code on half screen i didn't notice the split at the end which caused me a lot of confusion
// I timeout'd a lot because of it lol
// const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").split("\n");

const input = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// first thought, sliding window, a leetcode problem :O
function findMarker(input, nDistinctCharacters) {
  for (let i = 0; i < input.length; ++i) {
    if (
      new Set(input.slice(i, i + nDistinctCharacters)).size ===
      nDistinctCharacters
    ) {
      return i + nDistinctCharacters;
    }
  }
}

console.log(findMarker(input, 4));
console.log(findMarker(input, 14));
