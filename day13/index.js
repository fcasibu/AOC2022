const fs = require("fs");

const pathName = process.argv[2];

const input = fs.readFileSync(__dirname + `/${pathName}`, "utf8")
  .trim()
  .split("\n\n")
  .map(l => l.split("\n").map(l => JSON.parse(l)));

function compareArray(a, b) {
  let i = 0;

  while (i < a.length && i < b.length) {
    console.log("{a} x {b}", a[i], 'x', b[i])
    const result = compare(a[i], b[i]);
    if (result === -1) {
      return -1;
    } else if (result === 1) {
      return 1;
    }
    i++;
  }

  return a.length < b.length ? -1 : a.length > b.length ? 1 : 0;
}

function compare(a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    return a < b ? -1 : a > b ? 1 : 0;
  } else if (typeof a === 'object' && typeof b === 'number') {
    return compareArray(a, [b]);
  } else if (typeof a === 'number' && typeof b === 'object') {
    return compareArray([a], b);
  } else {
    return compareArray(a, b);
  }
}

function solve(input) {
  const indices = [];
  const packets = [[[2]], [[6]]];

  for (let i = 0; i < input.length; ++i) {
    let [first, second] = input[i];

    if (compare(first, second) === -1) {
      indices.push(i + 1)
    }

    packets.push(...[first, second])
  }

  packets.sort(compareArray);
  const two = packets.findIndex(p => JSON.stringify(p) === JSON.stringify([[2]])) + 1;
  const six = packets.findIndex(p => JSON.stringify(p) === JSON.stringify([[6]])) + 1;
  return { p1: indices.reduce((acc, curr) => acc + curr, 0), p2: two * six };
}

const { p1, p2 } = solve(input);

console.log({ p1, p2 });
