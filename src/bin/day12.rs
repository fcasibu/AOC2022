use std::collections::{HashSet, VecDeque};
use std::fs;

#[derive(Debug, Copy, Clone, Eq, Hash, PartialEq)]
struct Point {
    x: i64,
    y: i64,
}

#[derive(Debug)]
struct Q {
    point: Point,
    value: char,
    moves: i64,
}

fn main() {
    let input = fs::read_to_string("./src/bin/day12.txt").expect("Failed to read input");

    let grid = create_grid(input);
    let p1 = get_starting_points(&grid, 'S');
    let p2 = get_starting_points(&grid, 'a');

    let p1 = bfs(&grid, p1, 'E');
    let p2 = bfs(&grid, p2, 'E');

    println!("Part 1: {:?}, Part 2: {:?}", p1, p2)
}

fn bfs(grid: &Vec<Vec<char>>, starting_points: VecDeque<Q>, end: char) -> i64 {
    let mut queue = starting_points;
    let mut visited: HashSet<Point> = HashSet::new();

    while let Some(node) = queue.pop_front() {
        if node.value == end {
            return node.moves;
        }
        if visited.contains(&node.point) {
            continue;
        }

        visited.insert(node.point);

        get_neighbors(&grid, &node.point, node.value)
            .iter()
            .for_each(|&neighbor| {
                let x = neighbor.x as usize;
                let y = neighbor.y as usize;

                queue.push_back(Q {
                    point: neighbor,
                    value: grid[y][x],
                    moves: node.moves + 1,
                })
            })
    }

    0
}

fn get_neighbors(grid: &Vec<Vec<char>>, current_point: &Point, val: char) -> Vec<Point> {
    let Point { x, y } = current_point;

    [(0, 1), (0, -1), (1, 0), (-1, 0)]
        .iter()
        .filter_map(|(point_x, point_y)| {
            let point = Point {
                x: point_x + x,
                y: point_y + y,
            };
            if point.x >= 0
                && point.x < grid[0].len() as i64
                && point.y >= 0
                && point.y < grid.len() as i64
            {
                let y = point.y as usize;
                let x = point.x as usize;
                let neighbor = match grid[y][x] {
                    'E' => 'z',
                    char => char,
                };
                let val = match val {
                    'S' => 'a',
                    char => char,
                };

                if neighbor as i8 <= val as i8 + 1 {
                    Some(point)
                } else {
                    None
                }
            } else {
                None
            }
        })
        .collect::<Vec<Point>>()
}

fn get_starting_points(grid: &Vec<Vec<char>>, val: char) -> VecDeque<Q> {
    grid.iter()
        .enumerate()
        .flat_map(|(row_idx, row)| {
            row
                .iter()
                .enumerate()
                .filter(|(_, cell)| **cell == val)
                .map(move |(col_idx, cell)| Q {
                    point: Point {
                        x: col_idx as i64,
                        y: row_idx as i64,
                    },
                    value: *cell,
                    moves: 0,
                })
        })
        .collect()
}

fn create_grid(input: String) -> Vec<Vec<char>> {
    input.lines().map(|row| row.chars().collect()).collect()
}
