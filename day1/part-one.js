const fs = require("fs");

const input = fs
  .readFileSync(process.cwd() + "/input.txt", "utf-8")
  .split("\n")
  .reduce((acc, curr) => {
    return (
      !Array.isArray(acc[0]) || curr === ""
        ? acc.push([])
        : acc[acc.length - 1].push(Number(curr)),
      acc
    );
  }, [])
  .slice(0, -1)
  .map((numbers) => numbers.reduce((acc, curr) => acc + curr));

console.log(Math.max(...input));
