const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf-8').trim().split('\n')

const grid = input.map(row => row.split('').map(Number))

const edgeTreesCount = 4 * grid.length - 4;

const countViewingDistance = (view, currTree) => {
  let count = 0;

  for (let i = 0; i < view.length; ++i) {
    if (currTree <= view[i]) {
      count++;
      return count;
    }

    count++;
  }

  return count;
}

const getVisibleTrees = grid => {
  let visibleTrees = 0;
  let maxScenicScore = 0;
  let viewingDistance = 1;

  for (let i = 1; i < grid.length - 1; ++i) {
    for (let j = 1; j < grid[i].length - 1; ++j) {
      const tree = grid[i][j];

      const topOfTree = grid.map(row => row[j]).slice(0, i).reverse();
      const bottomOfTree = grid.map(row => row[j]).slice(i + 1);
      const rightOfTree = grid[i].slice(j + 1);
      const leftOfTree = grid[i].slice(0, j).reverse();

      viewingDistance *= [topOfTree, bottomOfTree, leftOfTree, rightOfTree]
        .reduce((acc, view) => acc * countViewingDistance(view, tree), 1);

      [topOfTree, bottomOfTree, leftOfTree, rightOfTree]
        .map(view => view.every(t => t < tree))
        .some(Boolean) && visibleTrees++;

      maxScenicScore = Math.max(maxScenicScore, viewingDistance);
      viewingDistance = 1;
    }
  }

  return { visibleTrees, maxScenicScore };
}

const { visibleTrees, maxScenicScore } = getVisibleTrees(grid)

console.log({ p1: visibleTrees + edgeTreesCount, p2: maxScenicScore })
