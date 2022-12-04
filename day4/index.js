const fs = require("fs");

const isOverlapping = condition => {
    return condition ? 1 : 0;
};

const input = fs
    .readFileSync(process.cwd() + "/input.txt", "utf-8")
    .trim()
    .split("\n");

const pairs = input
    .map(pair => pair.split(","))
    .map(rangePair => rangePair.flatMap(range => range.split("-")).map(Number));

const p1 = pairs.reduce(
    (total, pair) =>
        total +
        isOverlapping(
            (pair[0] >= pair[2] && pair[1] <= pair[3]) ||
                (pair[2] >= pair[0] && pair[3] <= pair[1])
        ),
    0
);

const p2 = pairs.reduce(
    (total, pair) =>
        total + isOverlapping(pair[0] <= pair[3] && pair[1] >= pair[2]),
    0
);

console.log({ p1, p2 });
