import { TileGrid } from "@/lib/litho/tileGrid";
import { Action, PieceColor, TileCount, Coord } from "@/types/litho";
import { PieceGrid } from "@/lib/litho/pieceGrid";

export type RawLithoState = {
  turn: PieceColor;
  restActionCount: number;
  restTileCount: TileCount;
  winner?: PieceColor;
  currentActions: Action[];
  prevActions: Action[];
  pieceGrid: PieceGrid;
  tileGrid: TileGrid;
};

export type LithoState = Readonly<RawLithoState>;

export type Litho = LithoState & {
  action: (action: Action) => Litho;
  isValidAction: (action: Action) => boolean;
  isMoveablePiece: (coord: Coord) => boolean;
};
