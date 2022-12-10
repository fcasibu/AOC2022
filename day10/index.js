const fs = require("fs");

const instructions = fs.readFileSync(__dirname + "/input.txt", "utf8")
  .trim()
  .split("\n")
  .map(line => line.split(" "))
  .map(el => ({ op: el[0], arg: Number(el[1] ?? 0) }));

/*
  * If any of hte pixels in the sprite is on the currently drawn pixel (overlapping) 
  * we return true so it draws a sprite or block to represent a "lit" pixel, 
  * otherwise it's just a dot to represent a "dark" pixel
  *
  * In their example:
  
    Sprite position: ###.....................................

    Start cycle   1: begin executing addx 15
    During cycle  1: CRT draws pixel in position 0
    Current CRT row: #

  * The register is still at 1 so the sprite position is going to be placed
  * at position 0, the middle being 1 as per the register
  *
  * The sprite is 3 pixels wide, therefore two of those are overlapping 
  * pixels and with addx there's two cycles, so on those
  * two cycles, it will draw a lit pixel in position 0 and 1 
  *
  * The new sprite position will now be at position 15, middle at 16 because 
  * the register is at 16 because of addx 15
  * so the following cycles will only draw a "dark" pixel
  * since the sprite is not on the pixel anymore
  */
const isSpriteOnPixel = (cycle, register, SCREEN_WIDTH) => {
  const spritePosition = cycle % SCREEN_WIDTH;
  return Math.abs(register - spritePosition) <= 1;
}

const runProgram = (instructions) => {
  const nthCycles = [20, 60, 100, 140, 180, 220];
  const SCREEN_WIDTH = 40;
  let register = 1;
  let cycle = 0;
  let sumOfCycles = 0;
  let pixels = "";

  for (const { op, arg } of instructions) {
    if (op === "addx") {
      pixels += isSpriteOnPixel(cycle, register, SCREEN_WIDTH) ? "█" : ".";
      cycle++;
      if (nthCycles.includes(cycle)) {
        sumOfCycles += register * cycle;
      }
    }

    pixels += isSpriteOnPixel(cycle, register, SCREEN_WIDTH) ? "█" : ".";
    cycle++;
    if (nthCycles.includes(cycle)) {
      sumOfCycles += register * cycle;
    }

    register += arg;
  }

  return { sumOfCycles, pixels }
}


const { pixels, sumOfCycles } = runProgram(instructions);

console.log("Part 1:", sumOfCycles)
console.log("Part 2:")
for (let i = 0; i < pixels.length; i += 40) {
  console.log(pixels.slice(i, i + 40));
}
