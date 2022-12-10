use std::fs;

fn main() {
    let input = fs::read_to_string("./src/bin/day10.txt").expect("Failed to read input");

    let mut current_cycle = 0;
    let mut register = 1;
    let mut total = 0;
    let mut pixels = String::new();

    for line in input.lines().filter(|x| !x.is_empty()) {
        let line_split: Vec<&str> = line.split_whitespace().collect();
        let to_add = line_split.get(1).and_then(|x| x.parse().ok()).unwrap_or(0);

        if line_split.len() == 2 {
            let pixel = draw_pixel(current_cycle, register);
            pixels.push_str(pixel);
            current_cycle += 1;
            total += increment_total(current_cycle, register)
        }

        let pixel = draw_pixel(current_cycle, register);
        pixels.push_str(pixel);
        current_cycle += 1;
        total += increment_total(current_cycle, register);
        register += to_add;
    }

    println!("Part 1: {}", total);

    println!("Part 2: ");
    for chunk in pixels.as_bytes().chunks(40) {
        println!("{}", String::from_utf8(chunk.to_vec()).unwrap());
    }
}

fn is_sprite_overlapping(current_cycle: i32, register: i32) -> bool {
    let sprite_position = current_cycle % 40;
    (sprite_position - register).abs() <= 1
}

fn increment_total(current_cycle: i32, register: i32) -> i32 {
    match current_cycle {
        20 | 60 | 100 | 140 | 180 | 220 => register * current_cycle,
        _ => 0,
    }
}

fn draw_pixel(current_cycle: i32, register: i32) -> &'static str {
    match is_sprite_overlapping(current_cycle, register) {
        true => "@",
        false => ".",
    }
}
