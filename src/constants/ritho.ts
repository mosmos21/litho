import {
  PieceColor,
  PiecePlacement,
  TilePlacement,
  PlaceableTile,
} from "@/types/ritho.ts";

export const FIRST_TURN_COLOR: PieceColor = "Black";

/**
 * 配置済みの石板タイルを除いた石板タイルの在庫数
 */
export const TILE_MAX_COUNT: Record<PlaceableTile, number> = {
  VerticalAndHorizontal: 8,
  Diagonal: 8,
};

/**
 * 一度のターンでプレイヤーが行えるアクションの回数
 */
export const INITIAL_ACTION_COUNT = 2;

/**
 * 先手の初回のターン数
 */
export const FIRST_TURN_ACTION_COUNT = 1;

export const INITIAL_PIECE_PLACEMENTS: PiecePlacement[] = [
  // 先手の初期配置
  { piece: { type: "King", color: "Black" }, coord: { x: 3, y: 6 } },
  { piece: { type: "Blank", color: "Black" }, coord: { x: 1, y: 5 } },
  { piece: { type: "Blank", color: "Black" }, coord: { x: 2, y: 5 } },
  { piece: { type: "Blank", color: "Black" }, coord: { x: 3, y: 5 } },
  { piece: { type: "Blank", color: "Black" }, coord: { x: 4, y: 5 } },
  { piece: { type: "Blank", color: "Black" }, coord: { x: 5, y: 5 } },
  { piece: { type: "Blank", color: "Black" }, coord: { x: 1, y: 4 } },
  { piece: { type: "Blank", color: "Black" }, coord: { x: 2, y: 4 } },
  { piece: { type: "Blank", color: "Black" }, coord: { x: 3, y: 4 } },
  { piece: { type: "Blank", color: "Black" }, coord: { x: 4, y: 4 } },
  { piece: { type: "Blank", color: "Black" }, coord: { x: 5, y: 4 } },

  // 後手の初期配置
  { piece: { type: "King", color: "White" }, coord: { x: 3, y: 0 } },
  { piece: { type: "Blank", color: "White" }, coord: { x: 1, y: 1 } },
  { piece: { type: "Blank", color: "White" }, coord: { x: 2, y: 1 } },
  { piece: { type: "Blank", color: "White" }, coord: { x: 3, y: 1 } },
  { piece: { type: "Blank", color: "White" }, coord: { x: 4, y: 1 } },
  { piece: { type: "Blank", color: "White" }, coord: { x: 5, y: 1 } },
  { piece: { type: "Blank", color: "White" }, coord: { x: 1, y: 2 } },
  { piece: { type: "Blank", color: "White" }, coord: { x: 2, y: 2 } },
  { piece: { type: "Blank", color: "White" }, coord: { x: 3, y: 2 } },
  { piece: { type: "Blank", color: "White" }, coord: { x: 4, y: 2 } },
  { piece: { type: "Blank", color: "White" }, coord: { x: 5, y: 2 } },
];

export const INITIAL_TILE_PLACEMENTS: TilePlacement[] = [
  { tile: "Omnidirectional", coord: { x: 0, y: 0 } },
  { tile: "VerticalAndHorizontal", coord: { x: 0, y: 1 } },
];

/**
 * ゲームボードのセルの数
 */
export const BOARD_CELL_COUNT = 7;
