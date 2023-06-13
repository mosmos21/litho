import { TileGrid } from "@/lib/ritho/tileGrid";
import {
  Action,
  PieceCell,
  PieceColor,
  TileCell,
  TileCount,
} from "@/types/ritho";
import { PieceGrid } from "@/lib/ritho/pieceGrid";

export type RawRithoState = {
  turn: PieceColor;
  restActionCount: number;
  currentAction?: Action["type"];
  pieceGrid: PieceGrid;
  tileGrid: TileGrid;
  restTileCount: TileCount;
};

export type RithoState = Readonly<{
  turn: PieceColor;
  restActionCount: number;
  pieceCell: PieceCell[][];
  tileCell: TileCell[][];
  restTileCount: TileCount;
}>;

export type Ritho = RithoState & {
  action: (action: Action) => Ritho;
};
