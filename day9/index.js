const fs = require('fs')

const motions = fs.readFileSync(__dirname + '/input.txt', 'utf8').trim().split('\n').map(line => line.split(" ")).map(line => ({ dir: line[0], steps: Number(line[1]) }));

const visited = new Set();

const dirs = {
  U: [1, 0],
  D: [-1, 0],
  L: [0, -1],
  R: [0, 1],
};

const start = [0, 0];

const moveHead = (head, dir) => {
  const [y, x] = head;
  const [dy, dx] = dirs[dir];
  const newHead = [y + dy, x + dx];
  return newHead;
}

const moveTailDiagonally = (tail, head) => {
  const [y, x] = tail;
  const [a, b] = head;
  const [dy, dx] = [Math.sign(a - y), Math.sign(b - x)];
  const newTail = [y + dy, x + dx];
  return newTail;
}

const moveTail = (head, tail) => {
  const [y, x] = tail;
  if (checkIsTailStillAdjacent(head, tail)) {
    return [y, x];
  } else {
    return moveTailAdjacentToHead(head, tail);
  }
}

const checkIsTailStillAdjacent = (head, tail) => {
  const [y, x] = head;
  const [a, b] = tail;
  return Math.abs(y - a) <= 1 && Math.abs(x - b) <= 1;
}

const moveTailAdjacentToHead = (head, tail) => {
  const [y, x] = head;
  const [a, b] = tail;

  if (y === a) {
    const dx = Math.sign(b - x);
    const newTail = [y, x + dx];
    return newTail;
  }

  if (x === b) {
    const dy = Math.sign(a - y);
    const newTail = [y + dy, x];
    return newTail;
  }

  return moveTailDiagonally(tail, head);
}



const stepper = (motions) => {
  let head = start;
  let tails = Array(9).fill(start)

  motions.forEach(({ dir, steps }) => {
    for (let i = 1; i <= steps; ++i) {
      head = moveHead(head, dir);
      tails[0] = moveTail(head, tails[0]);
      tails[1] = moveTail(tails[0], tails[1]);
      tails[2] = moveTail(tails[1], tails[2]);
      tails[3] = moveTail(tails[2], tails[3]);
      tails[4] = moveTail(tails[3], tails[4]);
      tails[5] = moveTail(tails[4], tails[5]);
      tails[6] = moveTail(tails[5], tails[6]);
      tails[7] = moveTail(tails[6], tails[7]);
      tails[8] = moveTail(tails[7], tails[8]);
      // visited.add(tails[0].toString()) // part 1
      visited.add(tails[8].toString()); // part 2
    }
  });
  return visited.size;
}

console.log(stepper(motions))
