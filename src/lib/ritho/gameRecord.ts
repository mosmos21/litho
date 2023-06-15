import {
  Action,
  Coord,
  MovePieceAction,
  PlaceableTile,
  PlaceTileAction,
} from "@/types/ritho";

/***
 * 棋譜の仕様
 *
 * - 駒の動きの表記
 *   - 横軸をアルファベット、縦軸を数字で表す
 *   - 先手(黒)側からみた時に、左下が A1、右上が G7
 *   - 駒の動きは、移動元の座標と移動先の座標をハイフンで繋げて表す。
 *     - 例: A1-A2, G7-F6
 * - タイルの配置の表記
 *   - 横軸、縦軸を数字で表す
 *   - 中央の全方向タイルを中心の [0,0] とする
 *   - 先手(黒)側からみた時に、右下方向に 1 ずつ増えていく
 *   - タイルの名前は、縦横タイルをVH、斜めタイルがDとする
 *   - タイルの配置は、タイルの名前[横方向座標,縦方向座標]と表す
 *     - 例: VH[0,1], D[-1,-1]
 */

/**
 * 駒の横方向の表記
 */
const X_COORDS = "ABCDEFG";

/**
 * 移動した座標から棋譜の駒の動きの表記を生成する
 */
const encodePiecePlacement = (from: Coord, to: Coord) =>
  [X_COORDS[from.x], from.y + 1, "-", X_COORDS[to.x], to.y + 1].join("");

/**
 * タイルの種類と棋譜の表記の対応
 */
const TILE_TYPE_MAP: Record<PlaceableTile, string> = {
  VerticalAndHorizontal: "VH",
  Diagonal: "D",
};
/**
 * タイルの種類と座標から棋譜のタイルの配置の表記を生成する
 */
const encodeTilePlacement = (tile: PlaceableTile, coord: Coord) =>
  `${TILE_TYPE_MAP[tile]}[${coord.x},${coord.y}]`;

/**
 * 手番のアクションから棋譜の表記を生成する
 */
export const encodeAction = (action: Action) => {
  switch (action.type) {
    case "MovePiece":
      return encodePiecePlacement(action.from, action.to);
    case "PlaceTile":
      return encodeTilePlacement(action.tile, action.coord);
  }
};

/**
 * 棋譜の駒の動きの表記ルール
 */
const PIECE_PLACEMENT_REGEXP = /^([A-G])([1-7])-([A-G])([1-7])$/;

/**
 * 棋譜の表記から駒の動きのアクションを生成する
 */
const decodePiecePlacement = (
  gameRecord: string
): MovePieceAction | undefined => {
  const match = gameRecord.match(PIECE_PLACEMENT_REGEXP);
  if (!match || match.length !== 5) {
    return undefined;
  }

  const from = {
    x: X_COORDS.indexOf(match[1]),
    y: Number(match[2]) - 1,
  };
  const to = {
    x: X_COORDS.indexOf(match[3].toUpperCase()),
    y: Number(match[4]) - 1,
  };

  return {
    type: "MovePiece",
    from,
    to,
  };
};

/**
 * 棋譜のタイルの配置の表記ルール
 */
const TILE_PLACEMENT_REGEXP = /^(VH|D)\[(-?\d+),(-?\d+)\]$/;

/**
 * 棋譜の表記からタイルの配置のアクションを生成する
 */
const decodeTilePlacement = (
  gameRecord: string
): PlaceTileAction | undefined => {
  const match = gameRecord.match(TILE_PLACEMENT_REGEXP);
  if (!match || match.length !== 4) {
    return undefined;
  }

  const tileType = match[1] === "VH" ? "VerticalAndHorizontal" : "Diagonal";
  const coord = {
    x: Number(match[2]),
    y: Number(match[3]),
  };

  return {
    type: "PlaceTile",
    tile: tileType,
    coord,
  };
};

/**
 * 棋譜の表記からアクションを生成する
 */
export const decodeAction = (gameRecord: string): Action => {
  const action =
    decodePiecePlacement(gameRecord) || decodeTilePlacement(gameRecord);
  if (!action) {
    throw new Error(`Invalid game record: ${gameRecord}`);
  }

  return action;
};
