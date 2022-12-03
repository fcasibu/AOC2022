const fs = require("fs");

const input = fs
  .readFileSync(process.cwd() + "/input.txt", "utf-8")
  .split("\n");

const getPriority = (char) => {
  if (!char) return;
  return char && char.toLowerCase() === char
    ? char.charCodeAt() - 96
    : char.charCodeAt() - 38;
};

const p1Sum = input
  .map((compartment) => [
    compartment.slice(0, compartment.length / 2),
    compartment.slice(compartment.length / 2),
  ])
  .reduce(
    (total, [a, b]) =>
      total + (getPriority([...a].find((char) => b.includes(char))) || 0),
    0
  );

const p2Sum = input
  .reduce(
    (group, item) => {
      if (group[group.length - 1].length === 3) group.push([]);

      group[group.length - 1].push(item);
      return group;
    },
    [[]]
  )
  .map((group) =>
    [...group[0]].find(
      (char) => group[1].includes(char) & group[2].includes(char)
    )
  )
  .reduce((total, char) => total + (getPriority(char) || 0), 0);

console.log({ p1Sum, p2Sum });
