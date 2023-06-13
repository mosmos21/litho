import { Piece, Coord, PieceCell } from "@/types/ritho";
import { numbers } from "@/utils/array";
import { BOARD_CELL_COUNT, INITIAL_PIECE_PLACEMENTS } from "@/constants/ritho";

/**
 * 盤面の駒の配置を管理する
 */
type RawPieceGrid = Record<string, Record<string, Piece | undefined>>;

/**
 * 駒の配置を操作するための関数群
 */
export type PieceGrid = {
  hasTile: (coord: Coord) => boolean;
  set: (coord: Coord, piece?: Piece) => PieceGrid;
  move: (from: Coord, to: Coord) => PieceGrid;
  toArray: () => PieceCell[][];
};

const build = (grid: RawPieceGrid): PieceGrid => ({
  hasTile: hasTile(grid),
  set: set(grid),
  move: move(grid),
  toArray: toArray(grid),
});

/**
 * 盤面から駒を取得する
 */
const get = (grid: RawPieceGrid) => (coord: Coord) => grid[coord.y]?.[coord.x];

/**
 * 座標に駒を追加する
 */
const set = (grid: RawPieceGrid) => (coord: Coord, piece?: Piece) =>
  build({
    ...grid,
    [coord.y]: {
      ...grid[coord.y],
      [coord.x]: piece,
    },
  });

/**
 * 座標に駒が存在するかどうかを返す
 */
const hasTile = (grid: RawPieceGrid) => (coord: Coord) =>
  Boolean(get(grid)(coord));

/**
 * 指定された座標の駒を移動する
 */
const move = (grid: RawPieceGrid) => (from: Coord, to: Coord) =>
  set(grid)(to, get(grid)(from)).set(from, undefined);

/**
 * 盤面を配列に変換して返す
 */
const toArray = (grid: RawPieceGrid) => (): PieceCell[][] =>
  numbers(BOARD_CELL_COUNT).map((y) =>
    numbers(BOARD_CELL_COUNT)
      .map<[number, Piece | undefined]>((x) => [x, get(grid)({ x, y })])
      .map(([x, piece]) => {
        const coord = { x, y };
        return piece ? { piece, coord } : { coord };
      })
  );

/**
 * 初期の盤面状態を生成して返す
 */
export const buildPieceGrid = (): PieceGrid =>
  INITIAL_PIECE_PLACEMENTS.reduce(
    (grid, { coord, piece }) => grid.set(coord, piece),
    build({})
  );
