const fs = require("fs");

const instructions = fs.readFileSync(__dirname + "/input.txt", "utf8")
  .trim()
  .split("\n")
  .map(line => line.split(" "))
  .map(el => ({ op: el[0], arg: Number(el[1] ?? 0) }));

const runProgram = (instructions) => {
  const nthCycles = [20, 60, 100, 140, 180, 220];
  let register = 1;
  let cycle = 0;
  let sumOfCycles = 0;
  let pixels = "";

  for (const { op, arg } of instructions) {
    if (op === "noop") {
      pixels += Math.abs(register - (cycle % 40)) <= 1 ? "█" : ".";
      cycle++;

      if (nthCycles.includes(cycle)) {
        sumOfCycles += register * cycle;
      }
    } else {
      for (let i = 0; i < 2; ++i) {
        pixels += Math.abs(register - (cycle % 40)) <= 1 ? "█" : ".";
        cycle++;
        if (nthCycles.includes(cycle)) {
          sumOfCycles += register * cycle;
        }
      }
      register += arg;
    }
  }


  return { sumOfCycles, pixels }
}

const { pixels, sumOfCycles } = runProgram(instructions);

console.log("Part 1:", sumOfCycles)
console.log("Part 2:")
for (let i = 0; i < pixels.length; i += 40) {
  console.log(pixels.slice(i, i + 40));
}
