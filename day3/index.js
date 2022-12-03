const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input.txt", "utf-8")
  .trim()
  .split("\n");

/* Refactored Solution */

const getPriority = (item) => {
  if (!item) return 0;
  return item.toLowerCase() === item
    ? item.charCodeAt() - 96
    : item.charCodeAt() - 38;
};

const splitRucksack = (rucksack) => {
  return [
    rucksack.slice(0, rucksack.length / 2),
    rucksack.slice(rucksack.length / 2),
  ];
};

const getCompartmentPairs = (rucksacks) => {
  return rucksacks.map(splitRucksack);
};

const getCommonItem = (compartments, finder) => {
  return compartments.map(finder);
};

const getSumOfPriorities = (items) => {
  return items.reduce((total, item) => total + getPriority(item), 0);
};

const getGroupsOfThree = (rucksacks) => {
  return rucksacks.reduce(
    (group, rucksack) => {
      if (group[group.length - 1].length === 3) group.push([]);

      group[group.length - 1].push(rucksack);
      return group;
    },
    [[]]
  );
};

const p1Solution = (rucksacks) => {
  const findCommon = ([firstCompartment, secondCompartment]) =>
    [...firstCompartment].find((item) => secondCompartment.includes(item));

  return getSumOfPriorities(
    getCommonItem(getCompartmentPairs(rucksacks), findCommon)
  );
};

const p2Solution = (rucksacks) => {
  const findCommon = (groups) =>
    [...groups[0]].find(
      (item) => groups[1].includes(item) && groups[2].includes(item)
    );

  return getSumOfPriorities(
    getCommonItem(getGroupsOfThree(rucksacks), findCommon)
  );
};

console.log({ p1Sum: p1Solution(input), p2Sum: p2Solution(input) });

/* Old Solution */

/* const p1Sum = input
  .map((rucksack) => [
    rucksack.slice(0, rucksack.length / 2),
    rucksack.slice(rucksack.length / 2),
  ])
  .map(([firstCompartment, secondCompartment]) =>
    [...firstCompartment].find((item) => secondCompartment.includes(item))
  )
  .reduce((total, item) => total + (getPriority(item) || 0), 0);

const p2Sum = input
  .reduce(
    (group, rucksack) => {
      if (group[group.length - 1].length === 3) group.push([]);

      group[group.length - 1].push(rucksack);
      return group;
    },
    [[]]
  )
  .map((groups) =>
    [...groups[0]].find(
      (item) => groups[1].includes(item) && groups[2].includes(item)
    )
  )
  .reduce((total, item) => total + (getPriority(item) || 0), 0); */
