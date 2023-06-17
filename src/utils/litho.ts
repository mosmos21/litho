import {
  PieceCell,
  PiecePlacement,
  TileCell,
  TilePlacement,
} from "@/types/litho";
import { BOARD_CELL_COUNT } from "@/constants/litho";
import { BOARD_BORDER_WIDTH } from "@/constants";

/**
 * ボードのサイズからセルのサイズを計算する
 */
export const calcCellSize = (boardSize: number): number =>
  (boardSize - BOARD_BORDER_WIDTH * (BOARD_CELL_COUNT + 1)) / BOARD_CELL_COUNT;

/**
 * セルのサイズのうち、駒が占めるサイズを計算する
 */
export const calcPieceSize = (cellSize: number): number => cellSize * 0.8;

/**
 * 石板タイルのマスに石板がおかれているか判定する
 */
export const hasTile = (cell: TileCell): cell is TilePlacement =>
  "tile" in cell;

/**
 * ボードのマスに駒がおかれているか判定する
 */
export const hasPiece = (cell: PieceCell): cell is PiecePlacement =>
  "piece" in cell;

/**
 * 座標がボードの範囲内にあるか判定する
 */
export const isCoordInBoard = (coord: { x: number; y: number }): boolean =>
  coord.x >= 0 &&
  coord.x < BOARD_CELL_COUNT &&
  coord.y >= 0 &&
  coord.y < BOARD_CELL_COUNT;
