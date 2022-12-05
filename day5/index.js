const fs = require("fs");

const input = fs
  .readFileSync(process.cwd() + "/input.txt", "utf-8")
  .trim()
  .split("\n");

const inputCrates = [
  ["D", "B", "J", "V"],
  ["P", "V", "B", "W", "R", "D", "F"],
  ["R", "G", "F", "L", "D", "C", "W", "Q"],
  ["W", "J", "P", "M", "L", "N", "D", "B"],
  ["H", "N", "B", "P", "C", "S", "Q"],
  ["R", "D", "B", "S", "N", "G"],
  ["Z", "B", "P", "M", "Q", "F", "S", "H"],
  ["W", "L", "F"],
  ["S", "V", "F", "M", "R"],
];

const testCrates = [["Z", "N"], ["M", "C", "D"], ["P"]];

const sol = input
  .map(el => el.split(" "))
  .map(step => {
    const crates = [...inputCrates];
    const [crateCount, from, to] = [step[1], step[3], step[5]].map(Number);

    const cratesToMove = crates.at(from - 1).splice(-crateCount);
    crates.at(to - 1).push(...cratesToMove.reverse()); // part1
    // crates[to - 1].push(...cratesToMove); // part2
    return crates;
  })
  .reduce((acc, crates, i) => {
    if (crates.at(i)) {
      acc.push(crates.at(i).at(-1));
    }
    return acc;
  }, []);

console.log(sol.join(``));
