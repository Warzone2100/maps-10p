const MAX_TILE_HEIGHT = 510;

const MAP_WIDTH = 250;
const MAP_LENGTH = 250;
const MAP_AREA = MAP_WIDTH * MAP_LENGTH;

const STEEPNESS = 48;

function on_border(x, y, r) {
    return x < r || y < r || x >= MAP_WIDTH-r || y >= MAP_WIDTH-r;
}

// Faster flood fill by ChatGPT 5.5 Thinking
// const flood_fill = create_flood_fill(MAP_WIDTH, MAP_LENGTH);
//
// flood_fill(i, max_count, shape,
//     i => texturemap[i] === Texture.SAND,
//     i => texturemap[i] = Texture.WATER,
//     () => false
// );
function create_flood_fill(width, length) {
    const size = width * length;

    const seen = new Array(size);
    const queue = new Array(size);

    let stamp = 1;

    return function flood_fill_i(
        start_i,
        max_count,
        shape,
        can_visit,
        visit,
        stop = () => false
    ) {
        if (start_i < 0 || start_i >= size) {
            return 0;
        }

        if (max_count == null) {
            max_count = Infinity;
        }

        const current_stamp = stamp++;

        if (stamp === 0xffffffff) {
            seen.fill(0);
            stamp = 1;
        }

        let head = 0;
        let tail = 0;
        let visit_count = 0;

        seen[start_i] = current_stamp;
        queue[tail++] = start_i;

        while (head < tail && visit_count < max_count && !stop()) {
            const i = queue[head++];

            if (!can_visit(i)) {
                continue;
            }

            visit(i);
            visit_count++;

            const hasNorth = i >= width;
            const hasSouth = i < size - width;
            const hasWest = i % width !== 0;
            const hasEast = (i + 1) % width !== 0;

            let ni;

            // Cardinal neighbors.
            // South
            if (hasSouth) {
                ni = i + width;
                if (seen[ni] !== current_stamp) {
                    seen[ni] = current_stamp;
                    queue[tail++] = ni;
                }
            }

            // East
            if (hasEast) {
                ni = i + 1;
                if (seen[ni] !== current_stamp) {
                    seen[ni] = current_stamp;
                    queue[tail++] = ni;
                }
            }

            // North
            if (hasNorth) {
                ni = i - width;
                if (seen[ni] !== current_stamp) {
                    seen[ni] = current_stamp;
                    queue[tail++] = ni;
                }
            }

            // West
            if (hasWest) {
                ni = i - 1;
                if (seen[ni] !== current_stamp) {
                    seen[ni] = current_stamp;
                    queue[tail++] = ni;
                }
            }

            if (shape) {
                // Preserve original behavior: one RNG roll per ordinal direction.
                if (gameRand(100) < shape && hasSouth && hasEast) {
                    ni = i + width + 1;
                    if (seen[ni] !== current_stamp) {
                        seen[ni] = current_stamp;
                        queue[tail++] = ni;
                    }
                }

                if (gameRand(100) < shape && hasNorth && hasEast) {
                    ni = i - width + 1;
                    if (seen[ni] !== current_stamp) {
                        seen[ni] = current_stamp;
                        queue[tail++] = ni;
                    }
                }

                if (gameRand(100) < shape && hasSouth && hasWest) {
                    ni = i + width - 1;
                    if (seen[ni] !== current_stamp) {
                        seen[ni] = current_stamp;
                        queue[tail++] = ni;
                    }
                }

                if (gameRand(100) < shape && hasNorth && hasWest) {
                    ni = i - width - 1;
                    if (seen[ni] !== current_stamp) {
                        seen[ni] = current_stamp;
                        queue[tail++] = ni;
                    }
                }
            }
        }

        return visit_count;
    };
}

// For flood-fill
const Cardinals = [[0, 1], [1, 0], [0, -1], [-1, 0]];
const Ordinals = [[1, 1], [1, -1], [-1, 1], [-1, -1]];

function flood_fill(sx, sy, width, length, max_count, shape, can_visit, visit, stop) {
    function add_to_queue([x, y]) {
        if (x >= 0 && y >= 0 && x < width && y < length && !seen[x][y]) {
            seen[x][y] = true;
            queue.push([x, y]);
        }
    }
    const seen = Array(width).fill().map(() => Array(length).fill(false));
    const queue = [[sx, sy]];
    let queue_head = 0;
    let visit_count = 0;
    seen[sx][sy] = true;
    while (queue_head < queue.length && visit_count < max_count && !stop()) {
        const [x, y] = queue[queue_head++];
        if (can_visit(x, y)) {
            visit(x, y);
            visit_count++;
            for (const [dx, dy] of Cardinals) {
                add_to_queue([x+dx, y+dy]);
            }
            for (const [dx, dy] of Ordinals) {
                if (shape && gameRand(100) < shape) {
                    add_to_queue([x+dx, y+dy]);
                }
            }
        }
    }
    return visit_count;
}

function steepness(i) {
    const h1 = heightmap[i];
    const h2 = heightmap[i+1] ?? 0;
    const h3 = heightmap[i+MAP_WIDTH] ?? 0;
    const h4 = heightmap[i+1+MAP_WIDTH] ?? 0;
    const dx = h2 + h4 - h1 - h3;
    const dy = h3 + h4 - h1 - h2;
    return dx*dx + dy*dy;
}

const TileType = Object.freeze({
    PATH: 0,
    ROAD: 1,
    GROUND: 2,
    FEATURE: 3,
    WATER: 4,
    CLIFF: 5
});

// y - 1
function i_N(i) {
    return i - MAP_WIDTH < 0 ? i : i - MAP_WIDTH;
}
// x + 1
function i_E(i) {
    return (i + 1) % MAP_WIDTH == 0 ? i : i + 1;
}
// y + 1
function i_S(i) {
    return i + MAP_WIDTH >= MAP_AREA ? i : i + MAP_WIDTH;
}
// x - 1
function i_W(i) {
    return i % MAP_WIDTH == 0 ? i : i - 1;
}
// x - 1, y - 1
function i_NW(i) {
    return i - MAP_WIDTH < 0 || i % MAP_WIDTH == 0 ? i : i - 1 - MAP_WIDTH;
}
// x + 1, y - 1
function i_NE(i) {
    return i - MAP_WIDTH < 0 || (i + 1) % MAP_WIDTH == 0 ? i : i + 1 - MAP_WIDTH;
}
// x - 1, y + 1
function i_SW(i) {
    return i + MAP_WIDTH >= MAP_AREA || i % MAP_WIDTH == 0 ? i : i - 1 + MAP_WIDTH;
}
// x + 1, y + 1
function i_SE(i) {
    return i + MAP_WIDTH >= MAP_AREA || (i + 1) % MAP_WIDTH == 0 ? i : i + 1 + MAP_WIDTH;
}

const CliffLife = new Set([
    0b00001111,
    0b00010110,
    0b00010111,
    0b00011011,
    0b00011110,
    0b00011111,
    0b00101011,
    0b00101111,
    0b00111011,
    0b00111110,
    0b00111111,
    0b01001111,
    0b01010110,
    0b01010111,
    0b01011011,
    0b01011110,
    0b01011111,
    0b01101000,
    0b01101001,
    0b01101010,
    0b01101011,
    0b01101110,
    0b01101111,
    0b01110110,
    0b01110111,
    0b01111000,
    0b01111001,
    0b01111010,
    0b01111011,
    0b01111100,
    0b01111101,
    0b01111110,
    0b01111111,
    0b10010110,
    0b10010111,
    0b10011011,
    0b10011110,
    0b10011111,
    0b10111011,
    0b10111110,
    0b10111111,
    0b11001011,
    0b11001111,
    0b11010000,
    0b11010010,
    0b11010011,
    0b11010100,
    0b11010110,
    0b11010111,
    0b11011000,
    0b11011001,
    0b11011010,
    0b11011011,
    0b11011100,
    0b11011101,
    0b11011110,
    0b11011111,
    0b11101000,
    0b11101001,
    0b11101010,
    0b11101011,
    0b11101110,
    0b11101111,
    0b11110000,
    0b11110010,
    0b11110011,
    0b11110100,
    0b11110110,
    0b11110111,
    0b11111000,
    0b11111001,
    0b11111010,
    0b11111011,
    0b11111100,
    0b11111101,
    0b11111110,
    0b11111111,
]);

const WaterLife = new Set([
    0b00001011,
    0b00001111,
    0b00010110,
    0b00010111,
    0b00011011,
    0b00011110,
    0b00011111,
    0b00101011,
    0b00101111,
    0b00110110,
    0b00110111,
    0b00111011,
    0b00111110,
    0b00111111,
    0b01001011,
    0b01001111,
    0b01010110,
    0b01010111,
    0b01011011,
    0b01011110,
    0b01011111,
    0b01101000,
    0b01101001,
    0b01101010,
    0b01101011,
    0b01101100,
    0b01101101,
    0b01101110,
    0b01101111,
    0b01110110,
    0b01110111,
    0b01111000,
    0b01111001,
    0b01111010,
    0b01111011,
    0b01111100,
    0b01111101,
    0b01111110,
    0b01111111,
    0b10001011,
    0b10001111,
    0b10010110,
    0b10010111,
    0b10011011,
    0b10011110,
    0b10011111,
    0b10101011,
    0b10101111,
    0b10110110,
    0b10110111,
    0b10111011,
    0b10111110,
    0b10111111,
    0b11001011,
    0b11001111,
    0b11010000,
    0b11010001,
    0b11010010,
    0b11010011,
    0b11010100,
    0b11010101,
    0b11010110,
    0b11010111,
    0b11011000,
    0b11011001,
    0b11011010,
    0b11011011,
    0b11011100,
    0b11011101,
    0b11011110,
    0b11011111,
    0b11101000,
    0b11101001,
    0b11101010,
    0b11101011,
    0b11101100,
    0b11101101,
    0b11101110,
    0b11101111,
    0b11110000,
    0b11110001,
    0b11110010,
    0b11110011,
    0b11110100,
    0b11110101,
    0b11110110,
    0b11110111,
    0b11111000,
    0b11111001,
    0b11111010,
    0b11111011,
    0b11111100,
    0b11111101,
    0b11111110,
    0b11111111,
]);

const Texture = Object.freeze({
    TRANSITION:       0, // sand + yellow
    TRANSITION:       1, // sand + yellow
    TRANSITION:       2, // brown + sand
    TRANSITION:       3, // brown + sand
    TRANSITION:       4, // brown + sand
    BROWN_1:          5, // darkness: -1
    BROWN_2:          6, // darkness: 0
    BROWN_3:          7, // darkness: 1
    BROWN_4:          8, // darkness: 2
    YELLOW_1:         9, // light
    TRANSITION:       10, // sand + yellow
    YELLOW_2:         11, // dark
    SAND:             12,
    TRANSITION:       13, // brown + sand + water
    TRANSITION:       14, // sand + water
    TRANSITION:       15, // sand + water
    TRANSITION:       16, // sand + water
    WATER:            17,
    CLIFF_DOUBLE:     18,
    TRANSITION:       19, // concrete + red
    TRANSITION:       20, // concrete + red
    TRANSITION:       21, // concrete + red
    CONCRETE_1:       22, // dirty
    GREEN:            23,
    TRANSITION:       24, // green + brown
    TRANSITION:       25, // green + brown
    TRANSITION:       26, // green + brown
    TRANSITION:       27, // red + yellow
    TRANSITION:       28, // red + yellow
    TRANSITION:       29, // red + yellow
    TRANSITION:       30, // brown + green + water
    TRANSITION:       31, // green + water
    TRANSITION:       32, // green + water
    TRANSITION:       33, // green + water
    TRANSITION:       34, // brown + red
    TRANSITION:       35, // brown + red
    TRANSITION:       36, // brown + red
    ROAD_PATH:        37,
    TRANSITION:       38,
    TRANSITION:       39,
    TRANSITION:       40,
    TRANSITION:       41,
    TRANSITION:       42,
    TRANSITION:       43,
    RED_1:            44, // darkness: 0
    CLIFF_CORNER_1:   45, // light
    CLIFF_STRAIGHT_1: 46, // light
    ROAD_END:         47,
    RED_2:            48, // darkness: 4
    PATH_STRAIGHT_1:  49, // weak
    PATH_CORNER:      50,
    PATH_STRAIGHT_2:  51, // strong
    PATH_END:         52,
    RED_3:            53, // darkness: 3
    RED_4:            54, // darkness: 5
    CRATER_YELLOW:    55,
    CRATER_RED:       56,
    ROAD_T:           57,
    CRATER_BROWN:     58,
    ROAD_STRAIGHT:    59,
    DITCH_1:          60, // weak
    DITCH_2:          61, // strong
    CRATER_GREEN:     62,
    CRATER_BIG:       63,
    CRATER_BIG:       64,
    CRATER_BIG:       65,
    CRATER_BIG:       66,
    CRATER_BIG:       67,
    CRATER_BIG:       68,
    CRATER_BIG:       69,
    CRATER_BIG:       70,
    CLIFF_STRAIGHT_2: 71, // dark
    PATH_T:           72,
    PATH_PLUS:        73,
    RED_5:            74, // darkness: 1
    CLIFF_CORNER_2:   75, // dark
    RED_6:            76, // darkness: 2
    CONCRETE_2:       77, // clean

    // Returns the texture without rotation data
    id(texture) {
        return texture & 0x0fff;
    },
    // Returns the rotation of the texture (0, 1, 2, 3)
    rotation(texture) {
        return texture >> 12;
    },
    // Returns the texture rotated by some amount
    rotate(texture, amount=1) {
        if (amount === 0) return texture;
        if (amount < 0 || amount > 3) throw new Error("Texture.rotate() accepts 0, 1, 2, or 3");
        const rotation = (this.rotation(texture) + amount) % 4;
        return this.id(texture) | (rotation * 0x1000);
    },
    // Returns the texture rotated by a random amount
    spin(texture) {
        return texture | (gameRand(4) * 0x1000);
    },
    isBrown(texture) {
        const id = this.id(texture);
        return id === this.BROWN_1
            || id === this.BROWN_2
            || id === this.BROWN_3
            || id === this.BROWN_4;
    },
    isRed(texture) {
        const id = this.id(texture);
        return id === this.RED_1
            || id === this.RED_2
            || id === this.RED_3
            || id === this.RED_4
            || id === this.RED_5
            || id === this.RED_6;
    },
    isConcrete(texture) {
        const id = this.id(texture);
        return id === this.CONCRETE_1
            || id === this.CONCRETE_2;
    },
    isYellow(texture) {
        const id = this.id(texture);
        return id === this.YELLOW_1
            || id === this.YELLOW_2;
    },
    isRoad(texture) {
        const id = this.id(texture);
        return id === this.ROAD_PATH
            || id === this.ROAD_END
            || id === this.ROAD_T
            || id === this.ROAD_STRAIGHT;
    },
    isCliff(texture) {
        const id = this.id(texture);
        return id === this.CLIFF_DOUBLE
            || id === this.CLIFF_CORNER_1
            || id === this.CLIFF_STRAIGHT_1
            || id === this.CLIFF_CORNER_2
            || id === this.CLIFF_STRAIGHT_2;
    },
    isWater(texture) {
        return this.id(texture) === this.WATER;
    },
    isSand(texture) {
        return this.id(texture) === this.SAND;
    },
});

const Road = Object.freeze({
    W: Texture.ROAD_END | 0 * 0x1000,
    N: Texture.ROAD_END | 1 * 0x1000,
    E: Texture.ROAD_END | 2 * 0x1000,
    S: Texture.ROAD_END | 3 * 0x1000,

    EW: Texture.ROAD_STRAIGHT | 0 * 0x1000,
    NS: Texture.ROAD_STRAIGHT | 1 * 0x1000,

    ESW: Texture.ROAD_T | 0 * 0x1000,
    NSW: Texture.ROAD_T | 1 * 0x1000,
    ENW: Texture.ROAD_T | 2 * 0x1000,
    ENS: Texture.ROAD_T | 3 * 0x1000
});

const Path = Object.freeze({
    S: Texture.PATH_END | 0 * 0x1000,
    W: Texture.PATH_END | 1 * 0x1000,
    N: Texture.PATH_END | 2 * 0x1000,
    E: Texture.PATH_END | 3 * 0x1000,

    NS: Texture.PATH_STRAIGHT_2 | 0 * 0x1000,
    EW: Texture.PATH_STRAIGHT_2 | 1 * 0x1000,

    ES: Texture.PATH_CORNER | 0 * 0x1000,
    SW: Texture.PATH_CORNER | 1 * 0x1000,
    NW: Texture.PATH_CORNER | 2 * 0x1000,
    EN: Texture.PATH_CORNER | 3 * 0x1000,

    ENS: Texture.PATH_T | 0 * 0x1000,
    ESW: Texture.PATH_T | 1 * 0x1000,
    NSW: Texture.PATH_T | 2 * 0x1000,
    ENW: Texture.PATH_T | 3 * 0x1000,

    ENSW: Texture.PATH_PLUS
});

const TexRot = {
    ROAD_T: {
        S: 0,
        W: 1,
        N: 2,
        E: 3
    },
    ROAD_END: {
        E: 0,
        S: 1,
        W: 2,
        N: 3
    },
    ROAD_STRAIGHT: {
        W: 0,
        E: 0,
        N: 1,
        S: 1
    },
    PATH_T: {
        E: 0,
        S: 1,
        W: 2,
        N: 3
    },
    PATH_PLUS: {
        N: 0,
        E: 1,
        S: 2,
        W: 3
    },
    PATH_STRAIGHT_2: {
        N: 0,
        S: 0,
        E: 1,
        W: 1
    },
    PATH_CORNER: {
        E: 0,
        S: 1,
        W: 2,
        N: 3
    },
    PATH_END: {
        N: 0,
        E: 1,
        S: 2,
        W: 3
    }
}

const Delta = {
    E: {
        i: 1,
        x: 1,
        y: 0,
        invert: "W"
    },
    N: {
        i: -MAP_WIDTH,
        x: 0,
        y: -1,
        invert: "S"
    },
    S: {
        i: MAP_WIDTH,
        x: 0,
        y: 1,
        invert: "N"
    },
    W: {
        i: -1,
        x: -1,
        y: 0,
        invert: "E"
    }
}

const AutoCliff = [
    null,                                  // 0b0000
    Texture.CLIFF_CORNER_2   | 3 * 0x1000, // 0b0001
    Texture.CLIFF_CORNER_2   | 2 * 0x1000, // 0b0010
    Texture.CLIFF_STRAIGHT_2 | 0 * 0x1000, // 0b0011
    Texture.CLIFF_CORNER_2   | 1 * 0x1000, // 0b0100
    null,                                  // 0b0101
    Texture.CLIFF_STRAIGHT_2 | 1 * 0x1000, // 0b0110
    Texture.CLIFF_CORNER_2   | 0 * 0x1000, // 0b0111
    Texture.CLIFF_CORNER_2   | 0 * 0x1000, // 0b1000
    Texture.CLIFF_STRAIGHT_2 | 1 * 0x1000, // 0b1001
    null,                                  // 0b1010
    Texture.CLIFF_CORNER_2   | 1 * 0x1000, // 0b1011
    Texture.CLIFF_STRAIGHT_2 | 0 * 0x1000, // 0b1100
    Texture.CLIFF_CORNER_2   | 2 * 0x1000, // 0b1101
    Texture.CLIFF_CORNER_2   | 3 * 0x1000, // 0b1110
    null                                   // 0b1111
];

function auto_cliff(i) {
    const NW = heightmap[i];
    const NE = heightmap[i+1];
    const SE = heightmap[i+1+MAP_WIDTH];
    const SW = heightmap[i+MAP_WIDTH];
    const avg = (NW + NE + SE + SW) / 4;
    let key = 0b0000;
    if (NW > avg) key |= 0b1000;
    if (NE > avg) key |= 0b0100;
    if (SE > avg) key |= 0b0010;
    if (SW > avg) key |= 0b0001;
    return AutoCliff[key] ?? Texture.CLIFF_DOUBLE | gameRand(4) * 0x1000;
}

// Take an object containing weights and return a closure that can be called
// repeatedly. Also takes a post-processing function. Usage example:
//
// const randomColor = make_randomizer(k => k.toUpperCase(), {
//     "Red": 4,
//     "Blue": 5,
//     "Green": 16
// });
//
// const color1 = randomColor();
// const color2 = randomColor();
// const color3 = randomColor();
//
// (by claude.ai)
function make_randomizer(postprocess, weights) {
    // Precompute total sum
    let totalWeight = 0;

    // Create an array of cumulative thresholds and keys
    const thresholds = [];
    const keys = [];

    for (const key in weights) {
        totalWeight += weights[key];
        thresholds.push(totalWeight);
        keys.push(key);
    }

    // Return a closure that can be called repeatedly
    return function () {
        const rand = gameRand(totalWeight);

        for (let i = 0; i < thresholds.length; i++) {
            if (rand < thresholds[i]) {
                return postprocess(keys[i]);
            }
        }

        throw new Error("Impossible");
    };
}

// Create an object containing pre-computed weighted random functions.
// Usage: texturemap[i] = WeightedRandom.RED();
const WeightedRandom = Object.freeze({
    RED: make_randomizer(k => k | gameRand(4) * 0x1000, {
        [Texture.RED_1]:      157,
        [Texture.RED_2]:      157,
        [Texture.RED_3]:      157,
        [Texture.RED_4]:      157,
        [Texture.RED_5]:      157,
        [Texture.RED_6]:      157,
        [Texture.CRATER_RED]: 22
    }),
    YELLOW: make_randomizer(k => k | gameRand(4) * 0x1000, {
        [Texture.YELLOW_1]:      49,
        [Texture.YELLOW_2]:      49,
        [Texture.CRATER_YELLOW]: 2
    }),
    BROWN: make_randomizer(k => k | gameRand(4) * 0x1000, {
        [Texture.BROWN_1]:      24,
        [Texture.BROWN_2]:      24,
        [Texture.BROWN_3]:      24,
        [Texture.BROWN_4]:      24,
        [Texture.CRATER_BROWN]: 4
    }),
    GREEN: make_randomizer(k => k | gameRand(4) * 0x1000, {
        [Texture.GREEN]:        96,
        [Texture.CRATER_GREEN]: 4
    }),
    CONCRETE: make_randomizer(k => k | gameRand(4) * 0x1000, {
        [Texture.CONCRETE_1]: 50,
        [Texture.CONCRETE_2]: 50
    }),
    ARIZONA: make_randomizer(k => k, {
        "Chevy":                 2,
        "Pickup":                2,
        "WreckedVertCampVan":    2,
        "WreckedSuzukiJeep":     2,
        "BlueCar":               2,
        "WaterTower":            6,
        "Ruin1":                 14,
        "Ruin3":                 14,
        "Ruin5":                 14,
        "Ruin7":                 14,
        "Ruin9":                 14,
        "BarbHUT":               14
    })
});

function build_roads(i, x, y, length) {
    if (x < 1 || y < 1 || x >= MAP_WIDTH-1 || y >= MAP_LENGTH-1) {
        return;
    }
    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            const i = (y+dy)*MAP_WIDTH + (x+dx);
            if (tiletypemap[i] !== TileType.GROUND) {
                return;
            }
        }
    }

    tiletypemap[i] = TileType.ROAD;

    const types = [
        {
            texture: "ROAD_T",
            rotation: "S",
            deltas: ["S", "E", "W"]
        },
        {
            texture: "ROAD_T",
            rotation: "W",
            deltas: ["W", "N", "S"]
        },
        {
            texture: "ROAD_T",
            rotation: "N",
            deltas: ["N", "E", "W"]
        },
        {
            texture: "ROAD_T",
            rotation: "E",
            deltas: ["E", "N", "S"]
        },
        {
            texture: "ROAD_STRAIGHT",
            rotation: "E",
            deltas: ["E", "W"]
        },
        {
            texture: "ROAD_STRAIGHT",
            rotation: "N",
            deltas: ["N", "S"]
        }
    ];

    const type = types[gameRand(types.length)];

    roadmap[i] = Texture[type.texture] | TexRot[type.texture][type.rotation] * 0x1000;

    for (const d of type.deltas) {
        roadmap[i+Delta[d].i] = Texture["ROAD_END"] | TexRot["ROAD_END"][d] * 0x1000;
        extend_road(i+Delta[d].i, x+Delta[d].x, y+Delta[d].y, d, gameRand(length));
    }
}

// Recursive
function extend_road(i, x, y, d, length) {
    tiletypemap[i] = TileType.ROAD;

    if (length === 0 || x < 1 || y < 1 || x >= MAP_WIDTH - 1 || y >= MAP_LENGTH - 1) {
        return;
    }

    // Check the 3 tiles in front depending on direction
    let n0, n1, n2;
    if (d === "N") {
        n0 = (y-1)*MAP_WIDTH + (x-1);
        n1 = (y-1)*MAP_WIDTH + (x  );
        n2 = (y-1)*MAP_WIDTH + (x+1);
    } else if (d === "S") {
        n0 = (y+1)*MAP_WIDTH + (x-1);
        n1 = (y+1)*MAP_WIDTH + (x  );
        n2 = (y+1)*MAP_WIDTH + (x+1);
    } else if (d === "W") {
        n0 = (y-1)*MAP_WIDTH + (x-1);
        n1 = (y  )*MAP_WIDTH + (x-1);
        n2 = (y+1)*MAP_WIDTH + (x-1);
    } else { // east
        n0 = (y-1)*MAP_WIDTH + (x+1);
        n1 = (y  )*MAP_WIDTH + (x+1);
        n2 = (y+1)*MAP_WIDTH + (x+1);
    }

    if (tiletypemap[n0] !== TileType.GROUND || tiletypemap[n1] !== TileType.GROUND || tiletypemap[n2] !== TileType.GROUND) {
        return;
    }

    let straightRot = 0, endRot = 0, offset = 0, nx = x, ny = y;

    if (d === "N") {
        straightRot = 1; endRot = 3; offset = -MAP_WIDTH; ny--;
    } else if (d === "S") {
        straightRot = 1; endRot = 1; offset = MAP_WIDTH; ny++;
    } else if (d === "W") {
        straightRot = 0; endRot = 2; offset = -1; nx--;
    } else { // east
        straightRot = 0; endRot = 0; offset = 1; nx++;
    }

    roadmap[i] = Texture.ROAD_STRAIGHT | straightRot * 0x1000;
    roadmap[i+offset] = Texture.ROAD_END | endRot * 0x1000;

    extend_road(i+offset, nx, ny, d, length-1);
}

function build_paths(i, x, y, length) {
    if (x < 1 || y < 1 || x >= MAP_WIDTH-1 || y >= MAP_LENGTH-1) {
        return;
    }

    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            const i = (y+dy)*MAP_WIDTH + (x+dx);
            if (tiletypemap[i] !== TileType.GROUND) {
                return;
            }
        }
    }

    const options = [
        ["E", "N"],
        ["N", "S"],
        ["S", "W"],
        ["W", "E"],
        ["E", "W"],
        ["N", "S"],
        ["E", "N", "S"],
        ["S", "E", "W"],
        ["W", "N", "S"],
        ["N", "E", "W"],
        ["E", "N", "S", "W"]
    ];

    pathmap[i] = options[gameRand(options.length)];
    tiletypemap[i] = TileType.PATH;

    for (const d of pathmap[i]) {
        const ni = i+Delta[d].i;
        pathmap[ni] = [Delta[d].invert];
        tiletypemap[ni] = TileType.PATH;
    }

    for (const d of pathmap[i]) {
        extend_path(i+Delta[d].i, x+Delta[d].x, y+Delta[d].y, gameRand(length));
    }
}

// Recursive
function extend_path(i, x, y, length) {
    if (length === 0 || x < 1 || y < 1 || x >= MAP_WIDTH-1 || y >= MAP_LENGTH-1) {
        return;
    }

    const main_direction = Delta[pathmap[i][0]].invert; // bias the path to be straight

    for (const d in Delta) {
        if (d !== main_direction && gameRand(100) < 90) {
            continue; // bias the path to be straight
        }
        const ni = i+Delta[d].i;
        if (tiletypemap[ni] === TileType.GROUND) {
            pathmap[i].push(d);
            pathmap[ni] = [Delta[d].invert];
            tiletypemap[ni] = TileType.PATH;
            extend_path(ni, x+Delta[d].x, y+Delta[d].y, length-1);
        }
    }
}

/**
 * @param {number} n
 * @param {(x, y) => boolean} isValid - a function that returns true if x, y satisfies the tolerance
 * @param {(x, y) => boolean} isInvalid - a function that returns true if x, y invalidates the current start position
 * @param {(x, y) => {}} onPick - a function that performs some action at each selected start position
 * @param {number} initialTolerance - an integer representing the area (in tiles) that the start position must satisfy. As the number of placement attempts increases, the tolerance will decrease until any start position is allowed.
 * @param {number} resistance - a float in range [0, 1) that represents how quickly the tolerance will drop. Lower resistance = faster decrease.
 */
function pickStartPositions(n, isValid, isInvalid, onPick, initialTolerance = 1000, resistance = 0.9) {

    function tolerance(attempts) {
        return Math.floor(
            (resistance - 1) * attempts ** 2 + initialTolerance
        );
    };

    const flood_fill = create_flood_fill(MAP_WIDTH, MAP_LENGTH);

    let attempts = 0;
    let player = 0;

    while (player < n) {

        // Pick a random spot
        const BORDER = 4;
        const x = BORDER + gameRand(MAP_WIDTH-1 - BORDER*2);
        const y = BORDER + gameRand(MAP_LENGTH-1 - BORDER*2);
        const i = y*MAP_WIDTH + x;

        if (!isValid(x, y)) {
            continue;
        }

        const tol = tolerance(attempts);

        // Flood fill
        let invalid = false;
        const area = flood_fill(i, tol, 25,
            /* can_visit */ (i) => {
                if (isInvalid(i)) {
                    invalid = true;
                    return false;
                }
                return isValid(i);
            },
            /* visit */ () => {},
            /* stop */ () => invalid
        );

        if (invalid || area < tol) {
            attempts++;
            continue;
        }

        // Success!
        onPick(x, y, i, player);
        player++;
    }
}

////////////////////////////////////////////////////////////////////////////////

// Required data structures
const texturemap = Array(MAP_AREA);
const heightmap = generateFractalValueNoise(
        /* width     = */ MAP_WIDTH,
        /* length    = */ MAP_LENGTH,
        /* range     = */ MAX_TILE_HEIGHT,
        /* crispness = */ 6,
        /* scale     = */ 32,
        /* normalize = */ MAX_TILE_HEIGHT * 2.00,
        /* regions   = */ [],
        /* rowMajor  = */ true
);
const structures = [];
const droids = [];
const features = [];

// Helper data structures
const tiletypemap = Array(MAP_AREA);
const roadmap = Array(MAP_AREA);
const pathmap = Array(MAP_AREA);
const water_tiles = new Set();
const cliff_tiles = new Set();

for (let i = 0; i < MAP_AREA; i++) {
    // Make lakes
    heightmap[i] = Math.max(0, heightmap[i] - 320);
    // Trim the tops
    if (heightmap[i] > MAX_TILE_HEIGHT - 64) {
        heightmap[i] = MAX_TILE_HEIGHT - 64;
    }
}

// Roughen the edges
for (let x = 0; x < MAP_WIDTH; x++) {
    for (let y = 0; y < 2; y++) {
        const i = y*MAP_WIDTH + x;
        heightmap[i] = Math.min(MAX_TILE_HEIGHT, heightmap[i] + gameRand(128));
    }
    for (let y = MAP_LENGTH - 2; y < MAP_LENGTH; y++) {
        const i = y*MAP_WIDTH + x;
        heightmap[i] = Math.min(MAX_TILE_HEIGHT, heightmap[i] + gameRand(128));
    }
}
for (let y = 0; y < MAP_LENGTH; y++) {
    for (let x = 0; x < 2; x++) {
        const i = y*MAP_WIDTH + x;
        heightmap[i] = Math.min(MAX_TILE_HEIGHT, heightmap[i] + gameRand(128));
    }
    for (let x = MAP_WIDTH - 2; x < MAP_WIDTH; x++) {
        const i = y*MAP_WIDTH + x;
        heightmap[i] = Math.min(MAX_TILE_HEIGHT, heightmap[i] + gameRand(128));
    }
}

// Set tiletypes
for (let i = 0; i < MAP_AREA; i++) {
    if (heightmap[i] === 0 && heightmap[i+1] === 0 && heightmap[i+MAP_WIDTH] === 0 && heightmap[i+1+MAP_WIDTH] === 0) {
        tiletypemap[i] = TileType.WATER;
        water_tiles.add(i);
    } else if (steepness(i) > 3500) {
        tiletypemap[i] = TileType.CLIFF;
        cliff_tiles.add(i);
    } else {
        tiletypemap[i] = TileType.GROUND;
    }
}

// // Steepen cliffs
// for (let i = 0; i < MAP_AREA; i++) {
//     if (tiletypemap[i] !== TileType.CLIFF) {
//         continue;
//     }
//
//     const x = i % MAP_WIDTH;
//     const y = Math.floor(i / MAP_WIDTH);
//
//     if (on_border(x, y, 2)) {
//         continue;
//     }
//
//     let v0 = heightmap[i];
//     let v1 = heightmap[i+1];
//     let v2 = heightmap[i+MAP_WIDTH];
//     let v3 = heightmap[i+MAP_WIDTH+1];
//
//     // Case 1: The north edge is sufficiently higher than the south edge
//     if (Math.min(v0, v1) - Math.max(v2, v3) > STEEPNESS) {
//         // Raise the north edge
//         heightmap[i] = heightmap[i+1] = Math.max(heightmap[i-MAP_WIDTH], heightmap[i-MAP_WIDTH+1]);
//
//         // Lower the south edge
//         heightmap[i+MAP_WIDTH] = heightmap[i+MAP_WIDTH+1] = Math.min(heightmap[i+MAP_WIDTH+MAP_WIDTH], heightmap[i+MAP_WIDTH+MAP_WIDTH+1]);
//
//         continue;
//     }
//     // Case 2: The south edge is sufficiently higher than the north edge
//     if (Math.min(v2, v3) - Math.max(v0, v1) > STEEPNESS) {
//         // Raise the south edge
//         heightmap[i+MAP_WIDTH] = heightmap[i+MAP_WIDTH+1] = Math.max(heightmap[i+MAP_WIDTH+MAP_WIDTH], heightmap[i+MAP_WIDTH+MAP_WIDTH+1]);
//
//         // Lower the north edge
//         heightmap[i] = heightmap[i+1] = Math.min(heightmap[i-MAP_WIDTH], heightmap[i-MAP_WIDTH+1]);
//
//         continue;
//     }
//     // Case 3: The west edge is sufficiently higher than the east edge
//     if (Math.min(v0, v2) - Math.max(v1, v3) > STEEPNESS) {
//         // Raise the west edge
//         heightmap[i] = heightmap[i+MAP_WIDTH] = Math.max(heightmap[i-1], heightmap[i+MAP_WIDTH-1]);
//
//         // Lower the east edge
//         heightmap[i+1] = heightmap[i+MAP_WIDTH+1] = Math.min(heightmap[i+1+1], heightmap[i+MAP_WIDTH+1+1]);
//
//         continue;
//     }
//
//     // Case 4: The east edge is sufficiently higher than the west edge
//     if (Math.min(v1, v3) - Math.max(v0, v2) > STEEPNESS) {
//         // Raise the east edge
//         heightmap[i+1] = heightmap[i+MAP_WIDTH+1] = Math.max(heightmap[i+1+1], heightmap[i+MAP_WIDTH+1+1]);
//
//         // Lower the west edge
//         heightmap[i] = heightmap[i+MAP_WIDTH] = Math.min(heightmap[i-1], heightmap[i+MAP_WIDTH-1]);
//
//         continue;
//     }
// }

// Smooth cliffs
for (let passes = 0; passes < 2; passes++) {
    for (const i of cliff_tiles) {
        // Ignore tiles on the map edge
        if (i < MAP_WIDTH ||i >= MAP_AREA - MAP_WIDTH || i % MAP_WIDTH == 0 || (i + 1) % MAP_WIDTH == 0) {
            continue;
        }

        let bitmap = 0b00000000;

        if (tiletypemap[i - 1 - MAP_WIDTH] == TileType.CLIFF) bitmap |= 0b10000000; // NW
        if (tiletypemap[i     - MAP_WIDTH] == TileType.CLIFF) bitmap |= 0b01000000; // N
        if (tiletypemap[i + 1 - MAP_WIDTH] == TileType.CLIFF) bitmap |= 0b00100000; // NE
        if (tiletypemap[i - 1            ] == TileType.CLIFF) bitmap |= 0b00010000; // W
        if (tiletypemap[i + 1            ] == TileType.CLIFF) bitmap |= 0b00001000; // E
        if (tiletypemap[i - 1 + MAP_WIDTH] == TileType.CLIFF) bitmap |= 0b00000100; // SW
        if (tiletypemap[i     + MAP_WIDTH] == TileType.CLIFF) bitmap |= 0b00000010; // S
        if (tiletypemap[i + 1 + MAP_WIDTH] == TileType.CLIFF) bitmap |= 0b00000001; // SE

        if (!CliffLife.has(bitmap)) {
            tiletypemap[i] = TileType.GROUND;
            cliff_tiles.delete(i);
        }
    }
}

// Smooth water
for (const i of water_tiles) {
    // Ignore tiles on the map edge
    if (i < MAP_WIDTH ||i >= MAP_AREA - MAP_WIDTH || i % MAP_WIDTH == 0 || (i + 1) % MAP_WIDTH == 0) {
        continue;
    }

    let bitmap = 0b00000000;

    if (tiletypemap[i - 1 - MAP_WIDTH] == TileType.WATER) bitmap |= 0b10000000; // NW
    if (tiletypemap[i     - MAP_WIDTH] == TileType.WATER) bitmap |= 0b01000000; // N
    if (tiletypemap[i + 1 - MAP_WIDTH] == TileType.WATER) bitmap |= 0b00100000; // NE
    if (tiletypemap[i - 1            ] == TileType.WATER) bitmap |= 0b00010000; // W
    if (tiletypemap[i + 1            ] == TileType.WATER) bitmap |= 0b00001000; // E
    if (tiletypemap[i - 1 + MAP_WIDTH] == TileType.WATER) bitmap |= 0b00000100; // SW
    if (tiletypemap[i     + MAP_WIDTH] == TileType.WATER) bitmap |= 0b00000010; // S
    if (tiletypemap[i + 1 + MAP_WIDTH] == TileType.WATER) bitmap |= 0b00000001; // SE

    if (!WaterLife.has(bitmap)) {
        tiletypemap[i] = TileType.GROUND;
        water_tiles.delete(i);
    }
}

// Boost cliff heights
for (const i of cliff_tiles) {
    if (tiletypemap[i_N (i)] == TileType.CLIFF &&
        tiletypemap[i_W (i)] == TileType.CLIFF &&
        tiletypemap[i_NW(i)] == TileType.CLIFF) {

        // const boost = 1.5 + gameRand(6) / 10;
        // heightmap[i] = Math.max(96 + gameRand(96), Math.min(MAX_TILE_HEIGHT - gameRand(32), heightmap[i] * boost));
        heightmap[i] = Math.min(MAX_TILE_HEIGHT - gameRand(32), heightmap[i] + 128 + gameRand(128));
    }
}

// Place roads
for (let roads = 0; roads < 500; roads++) {
    const x = 2 + gameRand(MAP_WIDTH-4);
    const y = 2 + gameRand(MAP_LENGTH-4);
    const i = y*MAP_WIDTH + x;
    if (tiletypemap[i] !== TileType.GROUND) {
        continue;
    }
    build_roads(i, x, y, 10);
}

// Place paths
for (let paths = 0; paths < 500; paths++) {
    const x = 2 + gameRand(MAP_WIDTH-4);
    const y = 2 + gameRand(MAP_LENGTH-4);
    const i = y*MAP_WIDTH + x;
    if (tiletypemap[i] !== TileType.GROUND) {
        continue;
    }
    build_paths(i, x, y, 10);
}

// Place oils and decoration
for (let y = 5; y < MAP_LENGTH-5; y++) {
    for (let x = 5; x < MAP_WIDTH-5; x++) {
        const i = y*MAP_WIDTH + x;
        if (tiletypemap[i] !== TileType.GROUND) {
            continue;
        }
        const n = gameRand(200);
        if (n === 0) {
            tiletypemap[i] = TileType.FEATURE;
            features.push({
                name: "OilResource",
                position: [128*x + 64, 128*y + 64],
                direction: 0
            });
        } else if (n < 10) {
            tiletypemap[i] = TileType.FEATURE;
            features.push({
                name: WeightedRandom.ARIZONA(),
                position: [128*x + 64, 128*y + 64],
                direction: gameRand(4) * 0x4000
            });
        }
    }
}

// Paint textures
for (let i = 0; i < MAP_AREA; i++) {
    switch (tiletypemap[i]) {
        case TileType.FEATURE:
        case TileType.GROUND:
            {
                const h = heightmap[i];
                if (h < 64) {
                    texturemap[i] = gameRand(2) ? WeightedRandom.BROWN() : WeightedRandom.GREEN();
                } else if (h === heightmap[i+1] && h === heightmap[i+MAP_WIDTH] && h === heightmap[i+1+MAP_WIDTH]) {
                    texturemap[i] = WeightedRandom.CONCRETE();
                } else if (h % 50 < 30) {
                    texturemap[i] = WeightedRandom.RED();
                } else {
                    texturemap[i] = WeightedRandom.YELLOW();
                }
            }
            break;
        case TileType.WATER:
            texturemap[i] = Texture.WATER;
            break;
        case TileType.CLIFF:
            texturemap[i] = auto_cliff(i);
            break;
        case TileType.ROAD:
            texturemap[i] = roadmap[i];
            break;
        case TileType.PATH:
            texturemap[i] = Path[pathmap[i].sort().join("")];
            break;
    }
}

// Pick start positions
const startPositions = [];
pickStartPositions(10,
    /* isValid */ i => tiletypemap[i] <= TileType.GROUND,
    /* isInvalid */ i => startPositions.includes(i),
    /* onPick */ (x, y, i, player) => {
        startPositions.push(i);
        droids.push({
            name: "ConstructionDroid",
            position: [128*x + 0, 128*y + 0],
            direction: gameRand(0x10000),
            player
        });
        droids.push({
            name: "ConstructionDroid",
            position: [128*x + 127, 128*y + 0],
            direction: gameRand(0x10000),
            player
        });
        droids.push({
            name: "ConstructionDroid",
            position: [128*x + 0, 128*y + 127],
            direction: gameRand(0x10000),
            player
        });
        droids.push({
            name: "ConstructionDroid",
            position: [128*x + 127, 128*y + 127],
            direction: gameRand(0x10000),
            player
        });

        let placedHQ = false;
        flood_fill(x, y, MAP_WIDTH, MAP_LENGTH, 900, 0,
            /* can_visit */ (x, y) => {
                const i = y*MAP_WIDTH + x;
                return tiletypemap[i] <= TileType.GROUND;
            },
            /* visit */ (x, y) => {
                const i = y*MAP_WIDTH + x;
                if (tiletypemap[i-1-MAP_WIDTH] <= TileType.GROUND &&
                    tiletypemap[i+0-MAP_WIDTH] <= TileType.GROUND &&
                    tiletypemap[i+1-MAP_WIDTH] <= TileType.GROUND &&
                    tiletypemap[i+2-MAP_WIDTH] <= TileType.GROUND &&

                    tiletypemap[i-1] <= TileType.GROUND &&
                    tiletypemap[i+0] <= TileType.GROUND &&
                    tiletypemap[i+1] <= TileType.GROUND &&
                    tiletypemap[i+2] <= TileType.GROUND &&

                    tiletypemap[i-1+MAP_WIDTH] <= TileType.GROUND &&
                    tiletypemap[i+0+MAP_WIDTH] <= TileType.GROUND &&
                    tiletypemap[i+1+MAP_WIDTH] <= TileType.GROUND &&
                    tiletypemap[i+2+MAP_WIDTH] <= TileType.GROUND &&

                    tiletypemap[i-1+MAP_WIDTH+MAP_WIDTH] <= TileType.GROUND &&
                    tiletypemap[i+0+MAP_WIDTH+MAP_WIDTH] <= TileType.GROUND &&
                    tiletypemap[i+1+MAP_WIDTH+MAP_WIDTH] <= TileType.GROUND &&
                    tiletypemap[i+2+MAP_WIDTH+MAP_WIDTH] <= TileType.GROUND &&

                    !startPositions.includes(i) &&
                    !startPositions.includes(i+1) &&
                    !startPositions.includes(i+MAP_WIDTH) &&
                    !startPositions.includes(i+1+MAP_WIDTH)
                ) {
                    placedHQ = true;
                    structures.push({
                        name: "A0CommandCentre",
                        position: [128*(x+1), 128*(y+1)],
                        direction: 0,
                        modules: 0,
                        player
                    });
                }
            },
            /* stop */ () => placedHQ
        );
    }
);

setMapData(MAP_WIDTH, MAP_LENGTH, texturemap, heightmap, structures, droids, features);
