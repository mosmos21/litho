import { Piece, Coord, PieceCell } from "@/types/litho";
import { numbers } from "@/utils/array";
import { BOARD_CELL_COUNT, INITIAL_PIECE_PLACEMENTS } from "@/constants/litho";
import { TileGrid } from "@/lib/litho/tileGrid.ts";
import { Grid } from "@/lib/litho/grid";
import { sameCoord } from "@/utils/coord.ts";

/**
 * 盤面の駒の配置を管理する
 */
type RawPieceGrid = Grid<Piece>;

/**
 * 駒の配置を操作するための関数群
 */
const build = (grid: RawPieceGrid) => ({
  hasPiece: hasPiece(grid),
  get: get(grid),
  set: set(grid),
  getMoveablePieceCoords: getMoveablePieceCoords(grid),
  canMovePiece: canMovePiece(grid),
  move: move(grid),
  toArray: toArray(grid),
});

export type PieceGrid = ReturnType<typeof build>;

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
const hasPiece = (grid: RawPieceGrid) => (coord: Coord) =>
  Boolean(get(grid)(coord));

/**
 * 指定された座標の駒を移動する
 */
const move = (grid: RawPieceGrid) => (from: Coord, to: Coord) =>
  set(grid)(to, get(grid)(from)).set(from, undefined);

/**
 * 指定された駒から移動可能な座標を返す
 */
export const getMoveablePieceCoords =
  (grid: RawPieceGrid) => (tileGrid: TileGrid, from: Coord) => {
    const piece = get(grid)(from);
    if (!piece) return [];

    const moveableCoords: Coord[] = [];
    const visitedTileCoords: Grid<boolean> = {};
    const queue: Coord[] = [{ x: 0, y: 0 }];
    while (queue.length) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const coord = queue.shift()!;
      const pieceCoord = { x: from.x + coord.x, y: from.y + coord.y };

      visitedTileCoords[coord.y] ??= {};
      visitedTileCoords[coord.y][coord.x] = true;

      // NOTE: 駒を飛び越えてはいけないので、駒がある場合はスキップする
      if (
        !(pieceCoord.x === from.x && pieceCoord.y === from.y) &&
        hasPiece(grid)(pieceCoord)
      ) {
        continue;
      }

      tileGrid.getMoveableDirections(coord).forEach((direction) => {
        const nextTileCoord = {
          x: coord.x + direction.x,
          y: coord.y + direction.y,
        };
        const nextPieceCoord = {
          x: from.x + nextTileCoord.x,
          y: from.y + nextTileCoord.y,
        };
        const nextCoordPiece = get(grid)(nextPieceCoord);

        // NOTE: まだ行ったことのない方向で自分の駒が置いてなければ遷移可能
        if (
          !visitedTileCoords[nextTileCoord.y]?.[nextTileCoord.x] &&
          nextCoordPiece?.color !== piece.color
        ) {
          moveableCoords.push(nextPieceCoord);
          queue.push(nextTileCoord);
        }
      });
    }

    return moveableCoords;
  };

/**
 * 指定された座標から座標まで駒が移動可能かどうかを返す
 */
export const canMovePiece =
  (grid: RawPieceGrid) => (tileGrid: TileGrid, from: Coord, to: Coord) => {
    return getMoveablePieceCoords(grid)(tileGrid, from).some((coord) =>
      sameCoord(coord, to)
    );
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
