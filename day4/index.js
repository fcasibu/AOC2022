const fs = require("fs");

const input = fs
  .readFileSync(process.cwd() + "/input.txt", "utf-8")
  .trim()
  .split("\n");

const pairs = input
  .map(pair => pair.split(","))
  .map(rangePair => rangePair.flatMap(range => range.split("-")).map(Number));

const overlapsInP1 = pair =>
  (pair[0] >= pair[2] && pair[1] <= pair[3]) ||
  (pair[2] >= pair[0] && pair[3] <= pair[1]);

const overlapsInP2 = pair => pair[0] <= pair[3] && pair[1] >= pair[2];

const p1 = pairs.filter(overlapsInP1).length;

const p2 = pairs.filter(overlapsInP2).length;

console.log({ p1, p2 });
