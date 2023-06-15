import { BOARD_CELL_COUNT } from "@/constants/ritho";

/**
 * 初期レンダリング時のゲームボードのセルのサイズ
 */
export const DEFAULT_CELL_SIZE = 60;

/**
 * ゲームボードエリアの余白ピクセル
 */
export const BOARD_BORDER_WIDTH = 2;

/**
 * 初期レンダリング時のゲームボードのサイズ
 */
export const DEFAULT_BOARD_SIZE =
  DEFAULT_CELL_SIZE * BOARD_CELL_COUNT +
  BOARD_BORDER_WIDTH * (BOARD_CELL_COUNT + 1);

/**
 * 初期レンダリング時の石板タイル配置エリアのサイズ
 */
export const DEFAULT_TILE_GRID_SIZE = 400;

/**
 * 石板タイル配置エリアの余白セル数
 */
export const TILE_GRID_BORDER_BORDER_CELL_COUNT = 1;

/**
 * roomIdの長さ
 */
export const ROOM_ID_LENGTH = 32;
