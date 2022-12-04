const fs = require("fs");

const counter = condition => {
    return condition ? 1 : 0;
};

const input = fs
    .readFileSync(process.cwd() + "/input.txt", "utf-8")
    .trim()
    .split("\n");

const pairs = input
    .map(line => line.split(","))
    .map(rangePair => rangePair.flatMap(range => range.split("-")).map(Number))
    .sort((a, b) => a[0] - b[0]);

const p1 = pairs.reduce(
    (total, rangePair) =>
        total +
        counter(
            (rangePair[0] >= rangePair[2] && rangePair[1] <= rangePair[3]) ||
                (rangePair[2] >= rangePair[0] && rangePair[3] <= rangePair[1])
        ),
    0
);

const p2 = pairs.reduce(
    (total, rangePair) =>
        total +
        counter(rangePair[0] <= rangePair[3] && rangePair[1] >= rangePair[2]),
    0
);

console.log({ p1, p2 });
