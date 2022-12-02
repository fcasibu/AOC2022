const fs = require("fs");

const map = {
  A: "Y",
  B: "Z",
  C: "X",
  X: "B",
  Y: "C",
  Z: "A",
};

const input = fs
  .readFileSync(process.cwd() + "/input.txt", "utf-8")
  .split("\n")
  .map((el) => el.split(" "))
  .slice(0, -1);

const part1 = input.reduce(
  (total, [x, y]) =>
    total +
    (map[y] === x ? 0 : map[x] === y ? 6 : 3) +
    (y === "X" ? 1 : y === "Y" ? 2 : 3),
  0
);

const part2 = input.reduce(
  (total, [x, y]) =>
    // lol
    total +
    (y === "X"
      ? (x === "A" ? 3 : x === "B" ? 1 : 2) + 0
      : y === "Z"
      ? (x === "A" ? 2 : x === "B" ? 3 : 1) + 6
      : (x === "A" ? 1 : x === "B" ? 2 : 3) + 3),
  0
);

console.log({ part1, part2 });
