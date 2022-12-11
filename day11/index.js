const fs = require('fs');

const input = fs.readFileSync(__dirname + '/input.txt', 'utf8').trim().split("\n\n");

const toUpperCase = (str) => {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

const toCamelCase = (str) => {
  const [first, ...rest] = str.trim().split(' ');
  return first.toLowerCase() + rest.map(toUpperCase).join('');
}

const monkeys = input.map(line => {
  const monkey = line.split('\n').slice(1);

  return monkey.reduce((acc, curr) => {
    const [key, value] = curr.split(":");

    acc[toCamelCase(key)] = value.trim();
    return acc;
  }, {});
});

monkeys.forEach(monkey => {
  monkey.startingItems = monkey.startingItems.split(',').map(item => Number(item));
  const [operation, operand] = monkey.operation.split(" ").slice(-2);
  monkey.operation = { operation, operand };
  monkey.divisor = Number(monkey.test.split(" ")[2])
  monkey.ifTrue = Number(monkey.ifTrue.slice(-1))
  monkey.ifFalse = Number(monkey.ifFalse.slice(-1))
  monkey.inspected = 0;
});

const ops = {
  "+": (a, b) => a + b,
  "*": (a, b) => a * b,
}

const solve = (monkeys, TOTAL_ROUNDS, productOfDivisors) => {
  const clonedMonkeys = JSON.parse(JSON.stringify(monkeys));
  for (let currentRound = 1; currentRound <= TOTAL_ROUNDS; ++currentRound) {
    clonedMonkeys.forEach(monkey => {
      for (let i = monkey.startingItems.length - 1; i >= 0; --i) {
        monkey.inspected += 1;
        const old = monkey.startingItems.pop();
        const { operation, operand } = monkey.operation;
        const newWorryLevel = ops[operation](old, operand === "old" ? old : Number(operand));

        // monkeys care only the divisbility?
        const worryLevelAfterMod = productOfDivisors ? newWorryLevel % productOfDivisors : Math.floor(newWorryLevel / 3);

        if (worryLevelAfterMod % monkey.divisor === 0) {
          clonedMonkeys[monkey.ifTrue].startingItems.push(worryLevelAfterMod);
        } else {
          clonedMonkeys[monkey.ifFalse].startingItems.push(worryLevelAfterMod);
        }
      }
    });
  }

  return clonedMonkeys;
}

const getLevelOfMonkeyBusiness = monkeys => {
  return monkeys
    .map(monkey => monkey.inspected)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((acc, curr) => acc * curr, 1);
}

const productOfDivisors = monkeys.reduce((acc, curr) => acc * curr.divisor, 1);

const p1 = solve(monkeys, 20);
const p2 = solve(monkeys, 10_000, productOfDivisors);
console.log(p1)

console.log({ p1: getLevelOfMonkeyBusiness(p1), p2: getLevelOfMonkeyBusiness(p2) });
