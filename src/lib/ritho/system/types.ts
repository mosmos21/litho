import { TileGrid } from "@/lib/ritho/tileGrid";
import { Action, PieceColor, TileCount } from "@/types/ritho";
import { PieceGrid } from "@/lib/ritho/pieceGrid";

export type RawRithoState = {
  turn: PieceColor;
  restActionCount: number;
  restTileCount: TileCount;
  winner?: PieceColor;
  currentActions: Action[];
  prevActions: Action[];
  pieceGrid: PieceGrid;
  tileGrid: TileGrid;
};

export type RithoState = Readonly<RawRithoState>;

export type Ritho = RithoState & {
  action: (action: Action) => Ritho;
  isValidAction: (action: Action) => boolean;
};
