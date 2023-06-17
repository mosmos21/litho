import { TileType, Coord, TileCell } from "@/types/ritho";
import { range } from "@/utils/array";
import {
  DIAGONAL_TILE,
  INITIAL_TILE_PLACEMENTS,
  VERTICAL_AND_HORIZONTAL_TILE,
} from "@/constants/ritho.ts";
import { Grid } from "@/lib/ritho/grid";
import { sameCoord } from "@/utils/coord.ts";

/**
 * 石板タイルの配置を管理する
 */
type RawTileGrid = Grid<TileType>;

/**
 * 石板タイルの配置を操作するための関数群
 */
const build = (grid: RawTileGrid) => ({
  hasTile: hasTile(grid),
  get: get(grid),
  getPlaceableCoords: getPlaceableCoords(grid),
  getMoveableDirections: getMoveableDirections(grid),
  set: set(grid),
  toArray: toArray(grid),
  canPlaceTile: canPlaceTile(grid),
});

export type TileGrid = ReturnType<typeof build>;

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
const set = (grid: RawTileGrid) => (coord: Coord, tile: TileType) => {
  return build({
    ...grid,
    [coord.y]: {
      ...grid[coord.y],
      [coord.x]: get(grid)(coord) ?? tile,
    },
  });
};

const getPlaceableCoords = (grid: RawTileGrid) => () => {
  const around = (coord: Coord) =>
    [
      { x: -1, y: -1 },
      { x: 0, y: -1 },
      { x: 1, y: -1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: -1, y: 1 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ].map(({ x, y }) => ({ x: x + coord.x, y: y + coord.y }));
  const toCoords = (coords: RawTileGrid) =>
    Object.entries(coords).flatMap(([y, row]) =>
      Object.keys(row).map<Coord>((x) => ({
        x: Number(x),
        y: Number(y),
      }))
    );

  const gridCoords = toCoords(grid);
  const aroundCoords = gridCoords
    .flatMap(around)
    .filter((coord) => !hasTile(grid)(coord))
    .reduce<RawTileGrid>(
      (acc, coord) => ({
        ...acc,
        [coord.y]: {
          ...acc[coord.y],
          [coord.x]: true,
        },
      }),
      {}
    );

  return toCoords(aroundCoords);
};

/**
 * 指定した座標にタイルを置くことができるかを返す
 */
export const canPlaceTile =
  (grid: RawTileGrid) =>
  (coord: Coord): boolean =>
    getPlaceableCoords(grid)().some((c) => sameCoord(c, coord));

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

/**
 * 指定された座標から移動可能な方向を返す
 */
export const getMoveableDirections = (grid: RawTileGrid) => (coord: Coord) => {
  const tile = get(grid)(coord);
  if (!tile) return [];

  const ds = [
    { x: -1, y: -1 },
    { x: -1, y: 1 },
    { x: 1, y: -1 },
    { x: 1, y: 1 },
  ];
  const vhs = [
    { x: -1, y: 0 },
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: 1, y: 0 },
  ];

  const result = [];

  if (DIAGONAL_TILE.includes(tile)) {
    result.push(
      ...ds.filter(({ x, y }) =>
        DIAGONAL_TILE.includes(get(grid)({ x: coord.x + x, y: coord.y + y }))
      )
    );
  }
  if (VERTICAL_AND_HORIZONTAL_TILE) {
    result.push(
      ...vhs.filter(({ x, y }) =>
        VERTICAL_AND_HORIZONTAL_TILE.includes(
          get(grid)({ x: coord.x + x, y: coord.y + y })
        )
      )
    );
  }

  return result;
};

export const buildTileGrid = (): TileGrid =>
  INITIAL_TILE_PLACEMENTS.reduce(
    (grid, { coord, tile }) => grid.set(coord, tile),
    build({})
  );
