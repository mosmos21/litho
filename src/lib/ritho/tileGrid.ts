import { TileType, Coord, TileCell } from "@/types/ritho";
import { range } from "@/utils/array";
import { INITIAL_TILE_PLACEMENTS } from "@/constants/ritho.ts";

/**
 * 石板タイルの配置を管理する
 */
type RawTileGrid = Record<string, Record<string, TileType | undefined>>;

/**
 * 石板タイルの配置を操作するための関数群
 */
export type TileGrid = {
  hasTile: (coord: Coord) => boolean;
  get: (coord: Coord) => TileType | undefined;
  set: (coord: Coord, tile: TileType) => TileGrid;
  toArray: (margin?: number) => TileCell[][];
};

const build = (grid: RawTileGrid): TileGrid => ({
  hasTile: hasTile(grid),
  get: get(grid),
  set: set(grid),
  toArray: toArray(grid),
});

/**
 * 座標に対応するタイルを取得する
 */
const get = (grid: RawTileGrid) => (coord: Coord) => grid[coord.y]?.[coord.x];

/**
 * 座標にタイルが存在するかどうかを返す
 */
const hasTile = (grid: RawTileGrid) => (coord: Coord) =>
  Boolean(get(grid)(coord));

/**
 * 座標にタイルを追加する
 */
const set = (grid: RawTileGrid) => (coord: Coord, tile: TileType) =>
  build({
    ...grid,
    [coord.y]: {
      ...grid[coord.y],
      [coord.x]: get(grid)(coord) ?? tile,
    },
  });

/**
 * タイルが存在する範囲を返す
 * @return {number} タイルが存在する範囲 (-d ~ +d) の間に全てのタイルが収まっている
 */
const detectTileRegionArea = (grid: RawTileGrid, d = 1): number => {
  const coords = [
    ...[-d, d].flatMap((x) => range(-d, d).map((y) => ({ x, y }))),
    ...[-d, d].flatMap((y) => range(-d + 1, d - 1).map((x) => ({ x, y }))),
  ];

  return coords.some((coord) => hasTile(grid)(coord))
    ? detectTileRegionArea(grid, d + 1)
    : d - 1;
};

/**
 * タイルが存在する範囲の情報を配列で返す
 */
const toArray =
  (grid: RawTileGrid) =>
  (margin = 0): TileCell[][] => {
    const d = detectTileRegionArea(grid) + margin;

    return range(-d, d).map((y) =>
      range(-d, d)
        .map<[number, TileType | undefined]>((x) => [x, get(grid)({ x, y })])
        .map(([x, tile]) => {
          const coord = { x, y };
          return tile ? { tile, coord } : { coord };
        })
    );
  };

export const buildTileGrid = (): TileGrid =>
  INITIAL_TILE_PLACEMENTS.reduce(
    (grid, { coord, tile }) => grid.set(coord, tile),
    build({})
  );
