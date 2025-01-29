const MIN_TILE_HEIGHT = 0;
const MAX_TILE_HEIGHT = 510;

const MAP_WIDTH = 167;
const MAP_LENGTH = 150;
const MAP_AREA = 25050;

// NTW settings
const DIVIDER_LENGTH = 12;
const BORDER_SIZE = 5;
const NUM_PLAYERS = 10;
const TEAM_SIZE = 5;
const GROUND_HEIGHT = 208;

// Maze settings
// const MAZE_WALL_SIZE = 5;
// const MAZE_PATH_SIZE = 13;
// const MAZE_CELL_SIZE = 18;
// const MAZE_WIDTH = 9;
// const MAZE_LENGTH = 5;
// const MAZE_ORIGIN_X = 5;
// const MAZE_ORIGIN_Y = 32;
// const MAZE_GAP = 16;

// const MAZE_WALL_SIZE = 4;
// const MAZE_PATH_SIZE = 19;
// const MAZE_CELL_SIZE = 23;
// const MAZE_WIDTH = 7;
// const MAZE_LENGTH = 4;
// const MAZE_ORIGIN_X = 5;
// const MAZE_ORIGIN_Y = 31;
// const MAZE_GAP = 14;

const MAZE_WALL_SIZE = 3;
const MAZE_PATH_SIZE = 17;
const MAZE_CELL_SIZE = 20;
const MAZE_WIDTH = 8;
const MAZE_LENGTH = 5;
// const MAZE_LENGTH_t = 5(20)-3 = 97;
const MAZE_ORIGIN_X = 5;
const MAZE_ORIGIN_Y = 26; // 5+12+10 (-1)
const MAZE_GAP = 10; // space between the divider and the maze // ceil(150-5-12-97-12-5 / 2)

const TEXTURE = 70; // Control the texture of the maze. 0 to 100. bigger = more horizontal, lower = more vertical
const GAP_CHANCE = 38; // % chance that a wall is removed
const WATER_CHANCE = 4; // chance that a removed wall is water. probability = 1/WATER_CHANCE


// Arizona Tileset (MANY OMITTED)
const Texture = Object.freeze({
    WATER: 17,
    DOUBLE_CLIFF: 18,
    CONCRETE: 22,
    RED_CRATER: 56,
    ROAD: 59,
});

const BaseLayouts = Object.freeze({
    "20x29_normal-cF1-rF": [
        "                             ",
        "      x   x   x   x   x      ",
        "      c   c   c   c   c      ",
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "             txxt            ",
        " o o o o     txht            ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        "                             ",
    ],
    "20x29_normal-cF1-rB": [
        "                             ",
        "      x   x   x   x   x      ",
        "      c   c   c   c   c      ",
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "             txxt            ",
        " o o o o     txht            ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        "                             ",
    ],
    "20x29_normal-cF2-rF": [
        "                             ",
        "       x   x   x   x   x     ",
        "       c   c   c   c   c     ",
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "             txxt            ",
        " o o o o     txht            ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        "                             ",
    ],
    "20x29_normal-cF2-rB": [
        "                             ",
        "       x   x   x   x   x     ",
        "       c   c   c   c   c     ",
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "             txxt            ",
        " o o o o     txht            ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        "                             ",
    ],
    "20x29_normal-cF3-rF": [
        "                             ",
        "        x   x   x   x   x    ",
        "        c   c   c   c   c    ",
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "             txxt            ",
        " o o o o     txht            ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        "                             ",
    ],
    "20x29_normal-cF3-rB": [
        "                             ",
        "        x   x   x   x   x    ",
        "        c   c   c   c   c    ",
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "             txxt            ",
        " o o o o     txht            ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        "                             ",
    ],
    "21x29_normal-cFF1-rF": [
        "                             ",
        "      x   x   x   x   x      ",
        "      c   c   c   c   c      ",
        "                             ",
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "             txxt            ",
        " o o o o     txht            ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        "                             ",
    ],
    "21x29_normal-cFF1-rB": [
        "                             ",
        "      x   x   x   x   x      ",
        "      c   c   c   c   c      ",
        "                             ",
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "             txxt            ",
        " o o o o     txht            ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        "                             ",
    ],
    "21x29_normal-cFF2-rF": [
        "                             ",
        "       x   x   x   x   x     ",
        "       c   c   c   c   c     ",
        "                             ",
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "             txxt            ",
        " o o o o     txht            ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        "                             ",
    ],
    "21x29_normal-cFF2-rB": [
        "                             ",
        "       x   x   x   x   x     ",
        "       c   c   c   c   c     ",
        "                             ",
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "             txxt            ",
        " o o o o     txht            ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        "                             ",
    ],
    "21x29_normal-cFF3-rF": [
        "                             ",
        "        x   x   x   x   x    ",
        "        c   c   c   c   c    ",
        "                             ",
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "             txxt            ",
        " o o o o     txht            ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        "                             ",
    ],
    "21x29_normal-cFF3-rB": [
        "                             ",
        "        x   x   x   x   x    ",
        "        c   c   c   c   c    ",
        "                             ",
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "             txxt            ",
        " o o o o     txht            ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        "                             ",
    ],
    "17x29_normal-cB1-rF": [
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "         txxtx x x x x       ",
        " o o o o txhtc c c c c       ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        "                             ",
    ],
    "17x29_normal-cB1-rB": [
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "         txxtx x x x x       ",
        " o o o o txhtc c c c c       ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        "                             ",
    ],
    "17x29_normal-cB2-rF": [
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "          txxtx x x x x      ",
        " o o o o  txhtc c c c c      ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        "                             ",
    ],
    "17x29_normal-cB2-rB": [
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "          txxtx x x x x      ",
        " o o o o  txhtc c c c c      ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        "                             ",
    ],
    "17x29_normal-cB3-rF": [
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "          x xtxxtx x x       ",
        " o o o o  c ctxhtc c c       ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        "                             ",
    ],
    "17x29_normal-cB3-rB": [
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "          x xtxxtx x x       ",
        " o o o o  c ctxhtc c c       ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        "                             ",
    ],
    "17x29_compact-c1-rF": [
        "                             ",
        "     xxx xxx xxx xxx xxx     ",
        "     xfx xfx xfx xfx xfx     ",
        "     xxx xxx xxx xxx xxx     ",
        "                             ",
        "          txxtx x x x x      ",
        "    oo oo txhtc c c c c      ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xr xr xr xr xr    ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xp xp xp xp xp    ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xp xp xp xp xp    ",
        "                             ",
    ],
    "17x29_compact-c2-rF": [
        "                             ",
        "     xxx xxx xxx xxx xxx     ",
        "     xfx xfx xfx xfx xfx     ",
        "     xxx xxx xxx xxx xxx     ",
        "                             ",
        "           txxtx x x x x     ",
        "    oo oo  txhtc c c c c     ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xr xr xr xr xr    ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xp xp xp xp xp    ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xp xp xp xp xp    ",
        "                             ",
    ],
    "17x29_compact-c3-rF": [
        "                             ",
        "     xxx xxx xxx xxx xxx     ",
        "     xfx xfx xfx xfx xfx     ",
        "     xxx xxx xxx xxx xxx     ",
        "                             ",
        "           x xtxxtx x x      ",
        "    oo oo  c ctxhtc c c      ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xr xr xr xr xr    ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xp xp xp xp xp    ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xp xp xp xp xp    ",
        "                             ",
    ],
    "17x29_compact-c1-rB": [
        "                             ",
        "     xxx xxx xxx xxx xxx     ",
        "     xfx xfx xfx xfx xfx     ",
        "     xxx xxx xxx xxx xxx     ",
        "                             ",
        "          txxtx x x x x      ",
        "    oo oo txhtc c c c c      ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xp xp xp xp xp    ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xp xp xp xp xp    ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xr xr xr xr xr    ",
        "                             ",
    ],
    "17x29_compact-c2-rB": [
        "                             ",
        "     xxx xxx xxx xxx xxx     ",
        "     xfx xfx xfx xfx xfx     ",
        "     xxx xxx xxx xxx xxx     ",
        "                             ",
        "           txxtx x x x x     ",
        "    oo oo  txhtc c c c c     ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xp xp xp xp xp    ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xp xp xp xp xp    ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xr xr xr xr xr    ",
        "                             ",
    ],
    "17x29_compact-c3-rB": [
        "                             ",
        "     xxx xxx xxx xxx xxx     ",
        "     xfx xfx xfx xfx xfx     ",
        "     xxx xxx xxx xxx xxx     ",
        "                             ",
        "           x xtxxtx x x      ",
        "    oo oo  c ctxhtc c c      ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xp xp xp xp xp    ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xp xp xp xp xp    ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xr xr xr xr xr    ",
        "                             ",
    ],
    "17x29_short-3-c": [
        "                             ",
        "      x   x   x   x   x      ",
        "      c   c   c   c   c      ",
        "                             ",
        "     xxx xxx xxx xxx xxx     ",
        "     xfx xfx xfx xfx xfx     ",
        "     xxx xxx xxx xxx xxx     ",
        "                             ",
        "   xx xx xxtxxtxx xx xx xx   ",
        "   xp xr xrtxhtxr xr xr xp   ",
        "                             ",
        "   xx xx oo oo oo oo xx xx   ",
        "   xp xp oo oo oo oo xp xp   ",
        "         oo oo oo oo         ",
        "   xx xx oo oo oo oo xx xx   ",
        "   xp xp oo oo oo oo xp xp   ",
        "                             ",
    ],
    "17x29_short-4-c": [
        "                             ",
        "      x   x   x   x   x      ",
        "      c   c   c   c   c      ",
        "                             ",
        "     xxx xxx xxx xxx xxx     ",
        "     xfx xfx xfx xfx xfx     ",
        "     xxx xxx xxx xxx xxx     ",
        "                             ",
        "   xx xx xxtxxtxx xx xx xx   ",
        "   xp xr xrtxhtxr xr xr xp   ",
        "                             ",
        "   xx xx xx xx xx xx xx xx   ",
        "   xp xp xp xp xp xp xp xp   ",
        "                             ",
        "   ooooo ooooo ooooo ooooo   ",
        "   ooooo ooooo ooooo ooooo   ",
        "                             ",
    ],
    "17x29_kracker-rF": [
        "                             ",
        "        x   x   x   x   x    ",
        "        c   c   c   c   c    ",
        "                             ",
        "        xxx xxx xxx xxx xxx  ",
        "    txxtxfx xfx xfx xfx xfx  ",
        "    txhtxxx xxx xxx xxx xxx  ",
        "                             ",
        "   o o o o o xx xx xx xx xx  ",
        "   o o o o o xr xr xr xr xr  ",
        "   o o o o o                 ",
        "   o o o o o xx xx xx xx xx  ",
        "   o o o o o xp xp xp xp xp  ",
        "   o o o o o                 ",
        "   o o o o o xx xx xx xx xx  ",
        "   o o o o o xp xp xp xp xp  ",
        "                             ",
    ],
    "17x29_kracker-rB": [
        "                             ",
        "        x   x   x   x   x    ",
        "        c   c   c   c   c    ",
        "                             ",
        "        xxx xxx xxx xxx xxx  ",
        "    txxtxfx xfx xfx xfx xfx  ",
        "    txhtxxx xxx xxx xxx xxx  ",
        "                             ",
        "   o o o o o xx xx xx xx xx  ",
        "   o o o o o xp xp xp xp xp  ",
        "   o o o o o                 ",
        "   o o o o o xx xx xx xx xx  ",
        "   o o o o o xp xp xp xp xp  ",
        "   o o o o o                 ",
        "   o o o o o xx xx xx xx xx  ",
        "   o o o o o xr xr xr xr xr  ",
        "                             ",
    ],
    "17x29_twin-1-rF": [
        "                             ",
        "     xxx xxx xxx xxx xxx     ",
        "     xfx xfx xfx xfx xfx     ",
        "     xxx xxx xxx xxx xxx     ",
        "                             ",
        "         x xtxxtx x x        ",
        " o o     c ctxhtc c c    o o ",
        " o o                     o o ",
        " o o     xx xx xx xx xx  o o ",
        " o o     xr xr xr xr xr  o o ",
        " o o                     o o ",
        " o o     xx xx xx xx xx  o o ",
        " o o     xp xp xp xp xp  o o ",
        " o o                     o o ",
        " o o     xx xx xx xx xx  o o ",
        " o o     xp xp xp xp xp  o o ",
        "                             ",
    ],
    "17x29_twin-1-rB": [
        "                             ",
        "     xxx xxx xxx xxx xxx     ",
        "     xfx xfx xfx xfx xfx     ",
        "     xxx xxx xxx xxx xxx     ",
        "                             ",
        "         x xtxxtx x x        ",
        " o o     c ctxhtc c c    o o ",
        " o o                     o o ",
        " o o     xx xx xx xx xx  o o ",
        " o o     xp xp xp xp xp  o o ",
        " o o                     o o ",
        " o o     xx xx xx xx xx  o o ",
        " o o     xp xp xp xp xp  o o ",
        " o o                     o o ",
        " o o     xx xx xx xx xx  o o ",
        " o o     xr xr xr xr xr  o o ",
        "                             ",
    ],
    "17x29_twin-2-rF": [
        "                             ",
        "     xxx xxx xxx xxx xxx     ",
        "     xfx xfx xfx xfx xfx     ",
        "     xxx xxx xxx xxx xxx     ",
        "                             ",
        "      x   x   x   x   x      ",
        " o o  c   c   c   c   c  o o ",
        " o o                     o o ",
        " o o txxtxx xx xx xx xx  o o ",
        " o o txhtxr xr xr xr xr  o o ",
        " o o                     o o ",
        " o o     xx xx xx xx xx  o o ",
        " o o     xp xp xp xp xp  o o ",
        " o o                     o o ",
        " o o     xx xx xx xx xx  o o ",
        " o o     xp xp xp xp xp  o o ",
        "                             ",
    ],
    "17x29_twin-2-rB": [
        "                             ",
        "     xxx xxx xxx xxx xxx     ",
        "     xfx xfx xfx xfx xfx     ",
        "     xxx xxx xxx xxx xxx     ",
        "                             ",
        "      x   x   x   x   x      ",
        " o o  c   c   c   c   c  o o ",
        " o o                     o o ",
        " o o txxtxx xx xx xx xx  o o ",
        " o o txhtxp xp xp xp xp  o o ",
        " o o                     o o ",
        " o o     xx xx xx xx xx  o o ",
        " o o     xp xp xp xp xp  o o ",
        " o o                     o o ",
        " o o     xx xx xx xx xx  o o ",
        " o o     xr xr xr xr xr  o o ",
        "                             ",
    ]
});


// x, y     - the northwest corner of the location where the layout is to be pasted
// layout   - an array of strings representing the layout
// rotation - an integer 0, 1, 2, or 3 representing 0, 90, 180, and 270 degree clockwise rotation of the layout
// mirror   - a boolean for if the layout should be mirrored lengthwise (left becomes right, right becomes left)
// player   - an integer repsenting the player that the structures/droids belong to
function pasteLayout(x, y, layout, rotation, mirror, player) {
    let width_t = layout[0].length;
    let length_t = layout.length;

    for (let row = 0; row < length_t; row++) {
        for (let col = 0; col < width_t; col++) {
            let char = (() => {
                switch (rotation) {
                    case 0: return mirror ? layout[row][width_t-1-col] : layout[row][col];
                    case 1: throw new Error("Not yet implemented"); // TODO
                    case 2: return mirror ? layout[length_t-1-row][col] : layout[length_t-1-row][width_t-1-col];
                    case 3: throw new Error("Not yet implemented"); // TODO
                }
            })();

            switch (char) {
                case "c":
                    structures.push({
                        name: "A0CyborgFactory",
                        position: [128 * (x+col) + 64, 128 * (y+row+(rotation==2)) + 64],
                        direction: ((2+rotation)%4) * 0x4000,
                        modules: 0,
                        player: player
                    });
                    break;
                case "f":
                    structures.push({
                        name: "A0LightFactory",
                        position: [128 * (x+col) + 64, 128 * (y+row) + 64],
                        direction: ((2+rotation)%4) * 0x4000,
                        modules: 2,
                        player: player
                    });
                    break;
                case "h":
                    structures.push({
                        name: "A0CommandCentre",
                        position: [128 * (x+col+(mirror!=(rotation==2))) + 64, 128 * (y+row+(rotation==2)) + 64],
                        direction: ((0+rotation)%4) * 0x4000,
                        modules: 0,
                        player: player
                    });
                    break;
                case "p":
                    structures.push({
                        name: "A0PowerGenerator",
                        position: [128 * (x+col+(mirror!=(rotation==2))) + 64, 128 * (y+row+(rotation==2)) + 64],
                        direction: ((0+rotation)%4) * 0x4000,
                        modules: 1,
                        player: player
                    });
                    break;
                case "r":
                    structures.push({
                        name: "A0ResearchFacility",
                        position: [128 * (x+col+(mirror!=(rotation==2))) + 64, 128 * (y+row+(rotation==2)) + 64],
                        direction: ((0+rotation)%4) * 0x4000,
                        modules: 1,
                        player: player
                    });
                    break;
                case "o":
                    structures.push({
                        name: "A0ResourceExtractor",
                        position: [128 * (x+col) + 64, 128 * (y+row) + 64],
                        direction: ((0+rotation)%4) * 0x4000,
                        modules: 0,
                        player: player
                    });
                    texturemap[(y+row)*MAP_WIDTH + (x+col)] = Texture.RED_CRATER;
                    break;
                case "t":
                    droids.push({
                        name: "ConstructionDroid",
                        position: [128 * (x+col) + 64, 128 * (y+row) + 64],
                        direction: (2+rotation)%4 * 0x4000,
                        player: player
                    });
                    break;
            }
        }
    }
}

const BaseLayoutWeights = Object.freeze({
    "20x29_normal-cF1-rF": 1,
    "20x29_normal-cF1-rB": 1,
    "20x29_normal-cF2-rF": 1,
    "20x29_normal-cF2-rB": 1,
    "20x29_normal-cF3-rF": 1,
    "20x29_normal-cF3-rB": 1,
    "21x29_normal-cFF1-rF": 1,
    "21x29_normal-cFF1-rB": 1,
    "21x29_normal-cFF2-rF": 1,
    "21x29_normal-cFF2-rB": 1,
    "21x29_normal-cFF3-rF": 1,
    "21x29_normal-cFF3-rB": 1,
    "17x29_normal-cB1-rF": 1,
    "17x29_normal-cB1-rB": 1,
    "17x29_normal-cB2-rF": 1,
    "17x29_normal-cB2-rB": 1,
    "17x29_normal-cB3-rF": 1,
    "17x29_normal-cB3-rB": 1,

    "17x29_compact-c1-rF": 3,
    "17x29_compact-c2-rF": 3,
    "17x29_compact-c3-rF": 3,
    "17x29_compact-c1-rB": 3,
    "17x29_compact-c2-rB": 3,
    "17x29_compact-c3-rB": 3,

    "17x29_short-3-c": 18,

    "17x29_short-4-c": 18,

    "17x29_kracker-rF": 9,
    "17x29_kracker-rB": 9,

    "17x29_twin-1-rF": 9,
    "17x29_twin-1-rB": 9,

    "17x29_twin-2-rF": 9,
    "17x29_twin-2-rB": 9,
});

function weightedRandom(object) {
    let sum = 0;
    for (const property in object) {
        sum += object[property];
    }

    let choice = gameRand(sum) + 1;
    for (const property in object) {
        choice -= object[property];
        if (choice <= 0) {
            return property;
        }
    }
    throw new Error("weightedRandom");
}


class MazeCell {
    constructor(i) {
        this.index = i; // the index of this MazeCell in the row
        this.prev = null; // point to the previous MazeCell in the same group
        this.next = null; // point to the next MazeCell in the same group
        this.wall_right = false;
        this.wall_bottom = false;
    }

    // Get the first (leftmost) MazeCell
    head() {
        let curr = this;
        while (curr.prev != null) {
            curr = curr.prev;
        }
        return curr;
    }

    // Get the last (rightmost) MazeCell
    tail() {
        let curr = this;
        while (curr.next != null) {
            curr = curr.next;
        }
        return curr;
    }

    // Get the size of this group (how many MazeCells it contains)
    size() {
        let size = 1;

        // Seek left
        for (let curr = this.prev; curr != null; curr = curr.prev) {
            size++;
        }

        // Seek right
        for (let curr = this.next; curr != null; curr = curr.next) {
            size++;
        }

        return size;
    }

    // Join this MazeCell's group with the other MazeCell's group.
    // Preserve order!
    // Groups may be disjoint:      [A B]
    // or contained within another: [A B A]
    // But never:                   [A B A B]
    union(other) {

        // Identify the group that is farthest to the left (A = leftmost)
        let A = this.head();
        let B = other.head();
        if (B.index < A.index) {
            [A, B] = [B, A];
        }

        let A_head = A;
        let A_tail = A.tail();
        let B_head = B;
        let B_tail = B.tail();

        // Case 1: Disjoint
        if (B_head.index > A_tail.index) {
            A_tail.next = B_head;
            B_head.prev = A_tail;
        }

        // Case 2: Contained within
        if (B_head.index < A_tail.index) {
            // Get the last MazeCell in A that comes before B
            let last = A_head;
            while (last.next.index < B_head.index) {
                last = last.next;
            }
            B_tail.next = last.next;
            last.next.prev = B_tail;
            last.next = B_head;
            B_head.prev = last;
        }
    }

    // Pick one random MazeCell from this MazeCell's group
    pick() {
        let curr = this.head();
        for (let i = gameRand(this.size()); i > 0; i--) {
            curr = curr.next;
        }
        return curr;
    }

    // Remove the MazeCell from its group
    remove() {
        if (this.prev != null) {this.prev.next = this.next;}
        if (this.next != null) {this.next.prev = this.prev;}
        this.prev = null;
        this.next = null;
    }

    static node(mx, my) {
        const [tx, ty] = MazeCell.tile_position(mx, my);
        return [tx+MAZE_PATH_SIZE, ty+MAZE_PATH_SIZE];
    }

    static right_wall(mx, my) {
        const [tx, ty] = MazeCell.tile_position(mx, my);
        return [tx+MAZE_PATH_SIZE, ty];
    }

    static bottom_wall(mx, my) {
        const [tx, ty] = MazeCell.tile_position(mx, my);
        return [tx, ty+MAZE_PATH_SIZE];
    }

    static has_right_wall(mx, my) { // if there is a cliff here
        const [tx, ty] = MazeCell.right_wall(mx, my);
        const i = ty*MAP_WIDTH + tx;
        return texturemap[i] != Texture.CONCRETE && texturemap[i] != Texture.WATER;
    }

    static has_bottom_wall(mx, my) { // if there is a cliff here
        const [tx, ty] = MazeCell.bottom_wall(mx, my);
        const i = ty*MAP_WIDTH + tx;
        return texturemap[i] != Texture.CONCRETE && texturemap[i] != Texture.WATER;
    }

    static has_right_obstruction(mx, my) { // if there is a cliff or water here
        const [tx, ty] = MazeCell.right_wall(mx, my);
        const i = ty*MAP_WIDTH + tx;
        return texturemap[i] != Texture.CONCRETE;
    }

    static has_bottom_obstruction(mx, my) { // if there is a cliff or water here
        const [tx, ty] = MazeCell.bottom_wall(mx, my);
        const i = ty*MAP_WIDTH + tx;
        return texturemap[i] != Texture.CONCRETE;
    }

    static tile_position(mx, my) {
        return [MAZE_ORIGIN_X + mx*MAZE_CELL_SIZE, MAZE_ORIGIN_Y + my*MAZE_CELL_SIZE];
    }

    static make_right_door(mx, my) {
        // Don't make right door if on the right edge
        if (mx == MAZE_WIDTH - 1) {
            return;
        }

        // Don't make a door if there's no wall to begin with
        if (!MazeCell.has_right_wall(mx, my)) {
            return;
        }

        let ok1 = true;
        let ok2 = true;

        // // Check the right wall's upper node
        // if (my != 0) { // only if this MazeCell isn't top row
        //     ok1 = MazeCell.has_right_wall(mx, my-1) || MazeCell.has_bottom_wall(mx, my-1) || MazeCell.has_bottom_wall(mx+1, my-1);
        // }
        //
        // // Check the right wall's lower node
        // if (my != MAZE_LENGTH - 1) { // only if this MazeCell isn't bottom row
        //     ok2 = MazeCell.has_right_wall(mx, my+1) || MazeCell.has_bottom_wall(mx, my) || MazeCell.has_bottom_wall(mx+1, my);
        // }

        if (ok1 && ok2) { // Safe to remove this wall without creating an isolated node
            const [tx, ty] = MazeCell.right_wall(mx, my);
            carve(
                tx, ty,
                MAZE_WALL_SIZE,
                MAZE_PATH_SIZE,
                gameRand(WATER_CHANCE) || my == 0  || my == MAZE_LENGTH-1 ? Texture.CONCRETE : Texture.WATER,
                GROUND_HEIGHT
            );
        }
    }

    static make_bottom_door(mx, my) {
        // Don't make bottom door if on the bottom row
        if (my == MAZE_LENGTH - 1) {
            return;
        }

        // Don't make a door if there's no wall to begin with
        if (!MazeCell.has_bottom_wall(mx, my)) {
            return;
        }

        let ok1 = true;
        let ok2 = true;

        // // Check the bottom wall's left node
        // if (mx != 0) { // only if this MazeCell isn't on the left edge
        //     ok1 = MazeCell.has_right_wall(mx-1, my) || MazeCell.has_bottom_wall(mx-1, my) || MazeCell.has_right_wall(mx-1, my+1);
        // }
        //
        // // Check the bottom wall's right node
        // if (mx != MAZE_WIDTH - 1) { // only if this MazeCell isn't on the right edge
        //     ok2 = MazeCell.has_right_wall(mx, my) || MazeCell.has_right_wall(mx, my+1) || MazeCell.has_bottom_wall(mx+1, my);
        // }

        if (ok1 && ok2) { // Safe to remove this wall without creating an isolated node
            const [tx, ty] = MazeCell.bottom_wall(mx, my);
            carve(
                tx, ty,
                MAZE_PATH_SIZE,
                MAZE_WALL_SIZE,
                gameRand(WATER_CHANCE) || my == 0  || my == MAZE_LENGTH-1 ? Texture.CONCRETE : Texture.WATER,
                GROUND_HEIGHT
            );
        }
    }

    static isolated_node(mx, my) {
        if (mx == MAZE_WIDTH - 1 || my == MAZE_LENGTH - 1) {
            return false;
        }
        let w1 = MazeCell.has_right_obstruction(mx, my);
        let w2 = MazeCell.has_bottom_obstruction(mx, my);
        let w3 = MazeCell.has_right_obstruction(mx, my+1);
        let w4 = MazeCell.has_bottom_obstruction(mx+1, my);
        return !w1 && !w2 && !w3 && !w4;
    }
}

class MazeBuilder {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    build_row(row, row_number) {

        // "Typewriter" algorithm

        let original_x = this.x;

        for (let i = 0; i < row.length; i++) { // iterate through the row left to right
            carve(this.x, this.y, MAZE_PATH_SIZE, MAZE_PATH_SIZE, Texture.CONCRETE, GROUND_HEIGHT);

            if (i != row.length-1) {
                if (!row[i].wall_right) {
                    carve(this.x + MAZE_PATH_SIZE, this.y, MAZE_WALL_SIZE, MAZE_PATH_SIZE, Texture.CONCRETE, GROUND_HEIGHT);
                }
            }

            if (row_number != MAZE_LENGTH) { // not the final row
                if (!row[i].wall_bottom) {
                    carve(this.x, this.y + MAZE_PATH_SIZE, MAZE_PATH_SIZE, MAZE_WALL_SIZE, Texture.CONCRETE, GROUND_HEIGHT);
                }
            }

            // Advance to the next "letter"
            this.x += MAZE_CELL_SIZE;
        }
        // "Carriage return"
        this.x = original_x;
        this.y += MAZE_CELL_SIZE;
    }
}

function carve(x, y, width, length, texture, height) {
    // Main
    for (let dy = 0; dy < length; dy++) {
        for (let dx = 0; dx < width; dx++) {
            const i = (y+dy)*MAP_WIDTH + (x+dx);
            texturemap[i] = texture;
            heightmap[i] = height;
        }
    }

    // Get the right edge
    for (let dy = 0; dy < length + 1; dy++) {
        const i = (y+dy)*MAP_WIDTH + (x+width);
        heightmap[i] = height;
    }

    // Get the bottom edge
    for (let dx = 0; dx < width; dx++) {
        const i = (y+length)*MAP_WIDTH + (x+dx);
        heightmap[i] = height;
    }
}

////////////////////////////////////////////////////////////////////////////////

let texturemap = Array.from({length: MAP_AREA}, () => Texture.DOUBLE_CLIFF | (gameRand(4) * 0x1000));
let heightmap = Array.from({length: MAP_AREA}, () => MAX_TILE_HEIGHT - gameRand(48));
let structures = [];
let droids = [];
let features = [];

let mzbr = new MazeBuilder(MAZE_ORIGIN_X, MAZE_ORIGIN_Y);

// Generate a maze using Eller's Algorithm

// Initialize a row
let row = Array(MAZE_WIDTH);
for (let i = 0; i < row.length; i++) { // iterate through the row left to right
    row[i] = new MazeCell(i);
}

for (let len = 0; len < MAZE_LENGTH; len++) {

    // Add walls between cells
    for (let i = 0; i < row.length-1; i++) {
        if (!(gameRand(100) < TEXTURE) || row[i].next == row[i+1]) {
            row[i].wall_right = true;
        } else {
            row[i].union(row[i+1]);
        }
    }

    // Create bottom walls
    for (let i = 0; i < row.length; i++) { // iterate through the row left to right
        row[i].wall_bottom = true;
    }

    // Create openings to the row below
    for (let i = 0; i < row.length; i++) { // iterate through the row left to right
        if (row[i].prev == null) { // This MazeCell is the head of its group
            // Pick 1 random MazeCell from the group
            let pick = row[i].pick();
            // There must be at least 1 guaranteed opening
            pick.wall_bottom = false;
            // The others may or may not open to the row below
            for (let curr = pick.prev; curr != null; curr = curr.prev) {
                curr.wall_bottom = gameRand(100) < TEXTURE;
            }
            for (let curr = pick.next; curr != null; curr = curr.next) {
                curr.wall_bottom = gameRand(100) < TEXTURE;
            }
        }
    }

    // SPECIAL CASE: final row
    if (len == MAZE_LENGTH-1) {
        break;
    }

    // OUTPUT THE ROW
    mzbr.build_row(row, len);

    // Prepare to create the next row
    for (let i = 0; i < row.length; i++) { // iterate through the row left to right
        // Remove right walls
        row[i].wall_right = false;
        // If a cell has a bottom wall, remove it from its group:
        if (row[i].wall_bottom == true) {
            row[i].remove();
        }
        // Remove bottom walls
        row[i].wall_bottom = false;
    }
}
// Handle the special case of the final row
for (let i = 0; i < row.length-1; i++) {
    // Knock down walls that separate two cells of different groups
    if (row[i].next != row[i+1]) {
        row[i].wall_right = false;
    }
}

// OUTPUT THE ROW
mzbr.build_row(row, MAZE_LENGTH);

// Create random "doors" in the walls
for (let dy = 0; dy < MAZE_LENGTH; dy++) {
    for (let dx = 0; dx < MAZE_WIDTH; dx++) {
        if (gameRand(2)) {
            if (gameRand(100) < GAP_CHANCE) {
                MazeCell.make_right_door(dx, dy);
            }
            if (gameRand(100) < GAP_CHANCE) {
                MazeCell.make_bottom_door(dx, dy);
            }
        } else {
            if (gameRand(100) < GAP_CHANCE) {
                MazeCell.make_bottom_door(dx, dy);
            }
            if (gameRand(100) < GAP_CHANCE) {
                MazeCell.make_right_door(dx, dy);
            }
        }
        if (MazeCell.isolated_node(dx, dy)) {
            const [x, y] = MazeCell.node(dx, dy);
            carve(x, y, MAZE_WALL_SIZE, MAZE_WALL_SIZE, Texture.CONCRETE, GROUND_HEIGHT);
        }
    }
}

// Build basezone buffers
carve(
    BORDER_SIZE,
    BORDER_SIZE + DIVIDER_LENGTH,
    MAP_WIDTH - 2*BORDER_SIZE,
    MAZE_GAP,
    Texture.CONCRETE,
    GROUND_HEIGHT
);
carve(
    BORDER_SIZE,
    MAP_LENGTH - BORDER_SIZE - DIVIDER_LENGTH - MAZE_GAP,
    MAP_WIDTH - 2*BORDER_SIZE,
    MAZE_GAP,
    Texture.CONCRETE,
    GROUND_HEIGHT
);

// Build the bases
for (let i = 0; i < TEAM_SIZE; i++) {
    const layout = BaseLayouts[weightedRandom(BaseLayoutWeights)];
    const x = BORDER_SIZE + i*32;
    const y = BORDER_SIZE;
    pasteLayout(x, y, layout, 2, gameRand(2), i);
    carve(x, y, 29, DIVIDER_LENGTH, Texture.CONCRETE, GROUND_HEIGHT);
}
for (let i = 0; i < TEAM_SIZE; i++) {
    const layout = BaseLayouts[weightedRandom(BaseLayoutWeights)];
    const x = BORDER_SIZE + i*32;
    const y = MAP_LENGTH - BORDER_SIZE - layout.length;
    pasteLayout(x, y, layout, 0, gameRand(2), i+TEAM_SIZE);
    carve(x, MAP_LENGTH - BORDER_SIZE - DIVIDER_LENGTH, 29, DIVIDER_LENGTH, Texture.CONCRETE, GROUND_HEIGHT);
}

// Draw the battle line
for (let i = (Math.ceil(MAP_LENGTH / 2) - 1) * MAP_WIDTH; i < (Math.floor(MAP_LENGTH / 2) + 1) * MAP_WIDTH; i++) {
    if (texturemap[i] == Texture.CONCRETE) {
        texturemap[i] = Texture.ROAD;
    }
}

setMapData(MAP_WIDTH, MAP_LENGTH, texturemap, heightmap, structures, droids, features);
