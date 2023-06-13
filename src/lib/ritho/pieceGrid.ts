import { Piece, Coord, PieceCell } from "@/types/ritho";
import { numbers } from "@/utils/array";
import { BOARD_CELL_COUNT, INITIAL_PIECE_PLACEMENTS } from "@/constants/ritho";
import { TileGrid } from "@/lib/ritho/tileGrid.ts";
import { Grid } from "@/lib/ritho/grid";

/**
 * 盤面の駒の配置を管理する
 */
type RawPieceGrid = Grid<Piece>;

/**
 * 駒の配置を操作するための関数群
 */
export type PieceGrid = {
  hasTile: (coord: Coord) => boolean;
  get: (coord: Coord) => Piece | undefined;
  set: (coord: Coord, piece?: Piece) => PieceGrid;
  canMovePiece: (tileGrid: TileGrid, from: Coord, to: Coord) => boolean;
  move: (from: Coord, to: Coord) => PieceGrid;
  toArray: () => PieceCell[][];
};

const build = (grid: RawPieceGrid): PieceGrid => ({
  hasTile: hasTile(grid),
  get: get(grid),
  set: set(grid),
  canMovePiece: canMovePiece(grid),
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
 * 指定された座標から座標まで駒が移動可能かどうかを返す
 */
export const canMovePiece =
  (grid: RawPieceGrid) => (tileGrid: TileGrid, from: Coord, to: Coord) => {
    const piece = get(grid)(from);
    if (!piece) return false;

    const visitedTileCoords: Grid<boolean> = {};
    const queue: Coord[] = [{ x: 0, y: 0 }];
    while (queue.length) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const coord = queue.shift()!;
      const pieceCoord = { x: from.x + coord.x, y: from.y + coord.y };
      if (pieceCoord.x === to.x && pieceCoord.y === to.y) return true;

      // NOTE: 駒を飛び越えてはいけないので、駒がある場合はスキップする
      if (hasTile(grid)(coord)) continue;

      visitedTileCoords[coord.y] ??= {};
      visitedTileCoords[coord.y][coord.x] = true;

      tileGrid.getMoveableDirections(coord).forEach((direction) => {
        const nextTileCoord = {
          x: coord.x + direction.x,
          y: coord.y + direction.y,
        };
        const nextCoordPiece = get(grid)({
          x: from.x + direction.x,
          y: from.y + direction.y,
        });

        // NOTE: まだ行ったことのない方向で自分の駒が置いてなければ遷移可能
        if (
          !visitedTileCoords[nextTileCoord.y]?.[nextTileCoord.x] &&
          nextCoordPiece?.color !== piece.color
        ) {
          queue.push(nextTileCoord);
        }
      });
    }

    return false;
  };

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
