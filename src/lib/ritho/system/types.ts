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
  restTileCount: TileCount;
  winner?: PieceColor;
  currentActions: Action[];
  prevActions: Action[];
  pieceGrid: PieceGrid;
  tileGrid: TileGrid;
};

export type RithoState = Readonly<
  Pick<
    RawRithoState,
    | "turn"
    | "restActionCount"
    | "restTileCount"
    | "winner"
    | "currentActions"
    | "prevActions"
  > & {
    pieceCell: PieceCell[][];
    tileCell: TileCell[][];
  }
>;

export type Ritho = RithoState & {
  action: (action: Action) => Ritho;
};
