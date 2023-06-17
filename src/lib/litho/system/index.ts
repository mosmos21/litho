import { buildTileGrid } from "@/lib/litho/tileGrid";
import { buildPieceGrid } from "@/lib/litho/pieceGrid";
import {
  FIRST_TURN_ACTION_COUNT,
  FIRST_TURN_COLOR,
  TILE_MAX_COUNT,
} from "@/constants/litho";
import { RawLithoState } from "@/lib/litho/system/types";
import { build } from "@/lib/litho/system/action";

const initLithoState = (): RawLithoState => {
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
    currentActions: [],
    prevActions: [],
  };
};

export const buildLitho = () => build(initLithoState());
