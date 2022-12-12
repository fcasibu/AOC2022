use itertools::Itertools;

#[derive(Clone)]
struct Operation {
    operator: &'static str,
    operand: i64,
    has_old: bool,
}

#[derive(Clone)]
struct Test {
    divisor: i64,
    if_true: usize,
    if_false: usize,
}

#[derive(Clone)]
struct Monkey {
    starting_items: Vec<i64>,
    operation: Operation,
    test: Test,
    inspected: usize,
}

fn solve(monkeys: &Vec<Monkey>, total_rounds: i64, product_of_divisors: Option<i64>) -> usize {
    let mut monkeys = monkeys.clone();
    for _ in 1..=total_rounds {
        for i in 0..monkeys.len() {
            monkeys[i].inspected += monkeys[i].starting_items.len();
            let Monkey { starting_items, operation, test, .. } = monkeys[i].clone();

            for old in starting_items {
                let old = match operation.has_old {
                    true => operate(operation.operator, old, old),
                    false => operate(operation.operator, old, operation.operand),
                };

                let old = match product_of_divisors {
                    Some(product_of_divisors) => old % product_of_divisors,
                    None => old / 3,
                };

                if old % test.divisor == 0 {
                    monkeys[test.if_true].starting_items.push(old);
                } else {
                    monkeys[test.if_false].starting_items.push(old)
                }
            }
            monkeys[i].starting_items.clear();
        }
    }

    monkeys.iter().map(|m| m.inspected).sorted().rev().take(2).product()
}

fn main() {
    let monkeys = create_monkeys();
    let product_of_divisors: i64 = monkeys.iter().map(|m| m.test.divisor).product();

    let p1 = solve(&monkeys, 20, None);
    let p2 = solve(&monkeys, 10_000, Some(product_of_divisors));

    println!("Part 1: {}", p1);
    println!("Part 2: {}", p2);
}

fn operate(operator: &str, a: i64, b: i64) -> i64 {
    match operator {
        "+" => a + b,
        _ => a * b
    }
}

// don't know how to parse so i just hardcoded it lol
fn create_monkeys() -> Vec<Monkey> {
    vec![
        Monkey {
            starting_items: vec![78, 53, 89, 51, 52, 59, 58, 85],
            operation: Operation {
                operator: "*",
                operand: 3,
                has_old: false,
            },
            test: Test {
                divisor: 5,
                if_true: 2,
                if_false: 7,
            },
            inspected: 0,
        },
        Monkey {
            starting_items: vec![64],
            operation: Operation {
                operator: "+",
                operand: 7,
                has_old: false,
            },
            test: Test {
                divisor: 2,
                if_true: 3,
                if_false: 6,
            },
            inspected: 0,
        },
        Monkey {
            starting_items: vec![71, 93, 65, 82],
            operation: Operation {
                operator: "+",
                operand: 5,
                has_old: false,
            },
            test: Test {
                divisor: 13,
                if_true: 5,
                if_false: 4,
            },
            inspected: 0,
        },
        Monkey {
            starting_items: vec![67, 73, 95, 75, 56, 74],
            operation: Operation {
                operator: "+",
                operand: 8,
                has_old: false,
            },
            test: Test {
                divisor: 19,
                if_true: 6,
                if_false: 0,
            },
            inspected: 0,
        },
        Monkey {
            starting_items: vec![85, 91, 90],
            operation: Operation {
                operator: "+",
                operand: 4,
                has_old: false,
            },
            test: Test {
                divisor: 11,
                if_true: 3,
                if_false: 1,
            },
            inspected: 0,
        },
        Monkey {
            starting_items: vec![67, 96, 69, 55, 70, 83, 62],
            operation: Operation {
                operator: "*",
                operand: 2,
                has_old: false,
            },
            test: Test {
                divisor: 3,
                if_true: 4,
                if_false: 1,
            },
            inspected: 0,
        },
        Monkey {
            starting_items: vec![53, 86, 98, 70, 64],
            operation: Operation {
                operator: "+",
                operand: 6,
                has_old: false,
            },
            test: Test {
                divisor: 7,
                if_true: 7,
                if_false: 0,
            },
            inspected: 0,
        },
        Monkey {
            starting_items: vec![88, 64],
            operation: Operation {
                operator: "*",
                operand: 0,
                has_old: true,
            },
            test: Test {
                divisor: 17,
                if_true: 2,
                if_false: 5,
            },
            inspected: 0,
        },
    ]
}
