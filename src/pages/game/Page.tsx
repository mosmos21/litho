import { Board } from "@/components/litho/Board";
import { TileGrid } from "@/components/litho/TileGrid";
import {
  BOARD_MAX_SIZE,
  TILE_GRID_BORDER_CELL_COUNT,
  TILE_GRID_MAX_SIZE,
} from "@/constants";
import { BasicLayout } from "@/layouts/BasicLayout";
import { chakra, Flex } from "@chakra-ui/react";
import { TileStorage } from "@/components/TileStorage";
import { usePieceMovement } from "@/pages/game/hooks/usePieceMovement.ts";
import { useTileMovement } from "@/pages/game/hooks/useTileMovement.ts";
import { useGame } from "@/pages/game/hooks/useGame";
import { GameInformation } from "@/components/GameInformation";
import { useElementSize } from "@/pages/game/hooks/useElementSize";

export const GamePage = () => {
  const {
    game,
    currentPlayerColor,
    moveablePieceColor,
    moveableTile,
    litho,
    onMovePiece,
    onPlaceTile,
  } = useGame();
  const pieceMovement = usePieceMovement({
    currentPlayerColor,
    litho,
    onMovePiece,
  });
  const tileMovement = useTileMovement({
    tileGrid: litho.tileGrid,
    onPlaceTile,
  });
  const [boardSize, firstColumnRef] = useElementSize(BOARD_MAX_SIZE);
  const [tileGridSize, secondColumnRef] = useElementSize(TILE_GRID_MAX_SIZE);

  return (
    <BasicLayout>
      <Flex gap="12px" flexDirection={{ base: "column", lg: "row" }}>
        <Column ref={firstColumnRef}>
          <GameInformation
            game={game}
            currentTurnColor={litho.turn}
            style={{ margin: "12px 0" }}
          />
          <Board
            reverse={currentPlayerColor === "White"}
            size={boardSize}
            cells={litho.pieceGrid.toArray()}
            moveableColor={moveablePieceColor}
            {...pieceMovement}
          />
        </Column>
        <Column ref={secondColumnRef} justifyContent="center">
          <TileGrid
            reverse={currentPlayerColor === "White"}
            size={tileGridSize}
            cells={litho.tileGrid.toArray(TILE_GRID_BORDER_CELL_COUNT)}
            onSelectCell={tileMovement.onSelectTileGridCell}
            placeableCoords={tileMovement.placeableCoords}
          />
          <TileStorage
            moveable={moveableTile}
            tileCount={litho.restTileCount}
            onSelectTile={tileMovement.onSelectTile}
            style={{ width: "100%" }}
          />
        </Column>
      </Flex>
    </BasicLayout>
  );
};

const Column = chakra(Flex, {
  baseStyle: {
    flexDirection: "column",
    gap: "12px",
    alignItems: "center",
    width: { base: "100%", lg: "calc(50% - 6px)" },
  },
});
