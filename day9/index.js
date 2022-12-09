const fs = require('fs')

const motions = fs.readFileSync(__dirname + '/input.txt', 'utf8')
  .trim()
  .split('\n')
  .map(line => line.split(" "))
  .map(line => ({ dir: line[0], steps: Number(line[1]) }));

const visited = new Set();

const dirs = {
  U: [0, -1],
  D: [0, 1],
  L: [-1, 0],
  R: [1, 0],
};

const start = [0, 0];

const moveHead = (head, dir) => {
  const [x, y] = head;
  const [dx, dy] = dirs[dir];
  const newHead = [x + dx, y + dy];
  return newHead;
}

const moveTailDiagonally = (tail, head) => {
  const [x1, y1] = tail;
  const [x2, y2] = head;
  const [dx, dy] = [Math.sign(x2 - x1), Math.sign(y2 - y1)];
  const newTail = [x1 + dx, y1 + dy];
  return newTail;
}

const moveTail = (head, tail) => {
  if (checkIsTailStillAdjacent(head, tail)) {
    return tail;
  } else {
    return moveTailAdjacentToHead(head, tail);
  }
}

const checkIsTailStillAdjacent = (head, tail) => {
  const [x1, y1] = head;
  const [x2, y2] = tail;
  return Math.abs(x1 - x2) <= 1 && Math.abs(y1 - y2) <= 1;
}

const moveTailAdjacentToHead = (head, tail) => {
  const [x1, y1] = head;
  const [x2, y2] = tail;

  if (x1 === x2) {
    const dy = Math.sign(y2 - y1);
    const newTail = [x1, y1 + dy];
    return newTail;
  }

  if (y1 === y2) {
    const dx = Math.sign(x2 - x1);
    const newTail = [x1 + dx, y1];
    return newTail;
  }

  return moveTailDiagonally(tail, head);
}

const stepper = (motions) => {
  let knots = Array(10).fill(start)

  motions.forEach(({ dir, steps }) => {
    for (let i = 1; i <= steps; ++i) {
      knots.forEach((knot, idx) => {
        if (idx === 0) {
          knots[idx] = moveHead(knot, dir)
        } else {
          knots[idx] = moveTail(knots.at(idx - 1), knot)
        }
      })
      // visited.add(knots.at(1).toString()) // part 1
      visited.add(knots.at(-1).toString()); // part 2
    }
  });
  return visited.size;
}

console.log(stepper(motions))
