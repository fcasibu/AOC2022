const fs = require('fs');

const input = fs.readFileSync(__dirname + '/input.txt', 'utf8').trim().split("\n");

const createGrid = (input) => {
  const grid = [];
  input.forEach(line => grid.push(line.split("")))
  return grid;
}

const grid = createGrid(input);

const bfs = (grid, start, end) => {
  const visited = new Set();
  const queue = start.map(point => ({ point, val: "S", moves: 0 }));
  visited.add(JSON.stringify(queue[0]));

  while (queue.length) {
    const node = queue.shift();

    if (node.val === end) {
      return node.moves;
    }

    getNeighbors(grid, node.point, node.val)
      .filter(neighbor => !visited.has(JSON.stringify(neighbor)))
      .forEach(neighbor => {
        visited.add(JSON.stringify(neighbor))
        queue.push({ point: neighbor, val: grid[neighbor[0]][neighbor[1]], moves: node.moves + 1 });
      })
  }
}

const getNeighbors = (grid, [row, col], val) => {
  return [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]
    .map(dir => [dir[0] + row, dir[1] + col])
    .filter(([neighborRow, neighborCol]) =>
      neighborRow >= 0 && neighborRow < grid.length
      && neighborCol >= 0 && neighborCol < grid[0].length)
    .filter(([neighborRow, neighborCol]) => {
      if (grid[neighborRow][neighborCol] === "E") {
        return grid[neighborRow][neighborCol].charCodeAt() <= "z".charCodeAt() + 1;
      }

      if (val === "S") {
        return grid[neighborRow][neighborCol].charCodeAt() <= "a".charCodeAt() + 1
      }

      return grid[neighborRow][neighborCol].charCodeAt() <= grid[row][col].charCodeAt() + 1;
    })
}

const findStart = (row, val) => {
  return row.findIndex(col => col === val);
}

const findAllStart = (grid, val) => {
  return grid.reduce((acc, curr, rowIdx) => {
    const point = findStart(curr, val);
    if (point !== -1) {
      acc.push([rowIdx, point]);
    }
    return acc;
  }, [])
}

const p1 = bfs(grid, findAllStart(grid, "S"), "E");
const p2 = bfs(grid, findAllStart(grid, 'a'), "E");

console.log({ p1, p2 });
