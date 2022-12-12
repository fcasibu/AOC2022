const fs = require("fs");

const input = fs
    .readFileSync(__dirname + "/input.txt", "utf8")
    .trim()
    .split("\n");

const grid = input.map((row) => row.split(""));

const bfs = (grid, startingPoints, end) => {
    const visited = new Set();
    const queue = startingPoints.map((point) => ({ point, val: "S", moves: 0 }));

    while (queue.length) {
        const node = queue.shift();

        if (visited.has(JSON.stringify(node.point))) continue

        visited.add(JSON.stringify(node.point));

        if (node.val === end) {
            return node.moves;
        }

        queue.push(
            ...getNeighbors(grid, node.point, node.val)
                .map((neighbor) => {
                    return {
                        point: neighbor,
                        val: grid[neighbor[0]][neighbor[1]],
                        moves: node.moves + 1,
                    };
                }),
        );
    }
};

const getNeighbors = (grid, [row, col], val) => {
    return [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ]
        .map(([neighborRow, neighborCol]) => [neighborRow + row, neighborCol + col])
        .filter(
            ([neighborRow, neighborCol]) =>
                neighborRow >= 0 &&
                neighborRow < grid.length &&
                neighborCol >= 0 &&
                neighborCol < grid[0].length,
        )
        .filter(([neighborRow, neighborCol]) => {
            const gridValue = grid[neighborRow][neighborCol];
            if (gridValue === "E") {
                return gridValue.charCodeAt() <= "z".charCodeAt() + 1;
            } else if (val === "S") {
                return gridValue.charCodeAt() <= "a".charCodeAt() + 1;
            } else {
                return gridValue.charCodeAt() <= val.charCodeAt() + 1;
            }
        });
};

const find = (row, val) => row.indexOf(val);

const findAll = (grid, val) => {
    return grid
        .reduce((acc, row, rowIdx) => {
            const colIdx = find(row, val);

            if (colIdx !== -1) {
                acc.push([rowIdx, colIdx])
            }

            return acc;
        }, [])
};


const p1 = bfs(grid, findAll(grid, "S"), "E");
const p2 = bfs(grid, findAll(grid, "a"), "E");

console.log({ p1, p2 });
