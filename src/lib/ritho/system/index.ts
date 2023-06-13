import { buildTileGrid } from "@/lib/ritho/tileGrid";
import { buildPieceGrid } from "@/lib/ritho/pieceGrid";
import {
  FIRST_TURN_ACTION_COUNT,
  FIRST_TURN_COLOR,
  TILE_MAX_COUNT,
} from "@/constants/ritho";
import { RawRithoState } from "@/lib/ritho/system/types";
import { build } from "@/lib/ritho/system/action";

const initRithoState = (): RawRithoState => {
  const tileGrid = buildTileGrid();
  const pieceGrid = buildPieceGrid();

  return {
    turn: FIRST_TURN_COLOR,
    restActionCount: FIRST_TURN_ACTION_COUNT,
    pieceGrid,
    tileGrid,
    restTileCount: {
      VerticalAndHorizontal: TILE_MAX_COUNT.VerticalAndHorizontal,
      Diagonal: TILE_MAX_COUNT.Diagonal,
    },
  };
};

export const buildRitho = () => build(initRithoState());
