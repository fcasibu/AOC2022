const fs = require("fs");

const pathName = process.argv[2];

const input = fs
    .readFileSync(__dirname + `/${pathName}`, "utf8")
    .trim()
    .split("\n");

Array.prototype.cons = function(n, cb) {
    for (let i = 0; i < this.length - n + 1; ++i) {
        cb(this.slice(i, i + n));
    }
};

class Particle {
    constructor({ x, y }, type) {
        this.x = x;
        this.y = y;
        this.type = type;
    }

    move({ x, y }) {
        this.x += x;
        this.y += y;
    }

    toString() {
        return `${this.x},${this.y}`;
    }
}

class Cave {
    particles = new Map();
    droppingPoint = new Particle({ x: 500, y: 0 });
    bottomParticle = 0;

    constructor(input) {
        this.create(input);
    }

    setParticle(key, particle) {
        this.particles.set(key, particle);
    }

    dropSand(sand) {
        while (sand.y <= this.bottomParticle) {
            const next = this.moveParticle(sand.x, sand.y);

            if (next) {
                sand.move(next);
                continue;
            }

            return sand;
        }

        return null;
    }

    moveParticle(x, y) {
        const down = this.isBlocking(x, y + 1);
        const left = this.isBlocking(x - 1, y + 1);
        const right = this.isBlocking(x + 1, y + 1);

        if (!down) return { x: 0, y: 1 };
        if (!left) return { x: -1, y: 1 };
        if (!right) return { x: 1, y: 1 };
        return null;
    }

    isBlocking(x, y) {
        return this.particles.has(new Particle({ x, y }).toString());
    }

    create(input) {
        input.forEach((line) => {
            const positions = line.split(" -> ").map((pos) =>
                pos
                    .trim()
                    .split(",")
                    .map((n) => Number(n)),
            );
            this.bottomParticle = Math.max(
                this.bottomParticle,
                ...positions.map((pos) => pos[1]),
            );

            positions.cons(2, ([[x1, y1], [x2, y2]]) => {
                if (x1 === x2) {
                    const minY = Math.min(y1, y2);
                    const maxY = Math.max(y1, y2);

                    for (let y = minY; y <= maxY; ++y) {
                        const rock = new Particle({ x: x1, y }, "█");
                        this.particles.set(rock.toString(), rock);
                    }
                }

                if (y1 === y2) {
                    const minX = Math.min(x1, x2);
                    const maxX = Math.max(x1, x2);

                    for (let x = minX; x <= maxX; ++x) {
                        const rock = new Particle({ x, y: y1 }, "█");
                        this.particles.set(rock.toString(), rock);
                    }
                }
            });
        });
    }

    prettyPrint() {
        const particles = [...this.particles.values()];
        const minX = Math.min(...particles.map((p) => p.x));
        const maxX = Math.max(...particles.map((p) => p.x));
        const minY = Math.min(...particles.map((p) => p.y));
        const maxY = Math.max(...particles.map((p) => p.y));

        for (let y = minY; y <= maxY; ++y) {
            let line = "";
            for (let x = minX; x <= maxX; ++x) {
                const particle = this.particles.get(`${x},${y}`);
                line += particle ? particle.type : ".";
            }
            console.log(line);
        }
    }
}

const sleep = (delay) => new Promise((res) => setTimeout(res, delay));

function part1(cave) {
    let unitsOfSand = 0;
    while (true) {
        const sand = new Particle(cave.droppingPoint, "o");
        const droppedSand = cave.dropSand(sand);

        if (!droppedSand) break;

        cave.setParticle(sand.toString(), sand);
        unitsOfSand++;
    }

    cave.prettyPrint();
    return unitsOfSand;
}

function part2(cave) {
    let unitsOfSand = 0;
    while (true) {
        let sand = new Particle(cave.droppingPoint, "o");
        let droppedSand = cave.dropSand(sand);

        if (droppedSand) {
            sand = droppedSand;
        }

        cave.setParticle(sand.toString(), sand);
        unitsOfSand++;

        if (sand.toString() === cave.droppingPoint.toString()) {
            break;
        }
    }

    cave.prettyPrint();
    return unitsOfSand;
}

console.log({ p1: part1(new Cave(input)), p2: part2(new Cave(input)) });
