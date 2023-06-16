import { Board } from "@/components/ritho/Board";
import { TileGrid } from "@/components/ritho/TileGrid";
import { BOARD_MAX_SIZE, TILE_GRID_MAX_SIZE } from "@/constants";
import { BasicLayout } from "@/layouts/BasicLayout";
import { chakra, Flex } from "@chakra-ui/react";
import { TileStorage } from "@/components/TileStorage";
import { usePieceDnd } from "@/hooks/usePieceDnd";
import { useTileDnd } from "@/hooks/useTileDnd";
import { useGame } from "@/pages/game/hooks/useGame";
import { GameInformation } from "@/components/GameInformation";
import { useElementSize } from "@/pages/game/hooks/useElementSize.ts";

export const GamePage = () => {
  const {
    game,
    currentPlayerColor,
    moveablePieceColor,
    moveableTile,
    ritho,
    onMovePiece,
    onPlaceTile,
  } = useGame();
  const pieceDnd = usePieceDnd({ onMovePiece });
  const tileDnd = useTileDnd({ onPlaceTile });
  const [boardSize, firstColumnRef] = useElementSize(BOARD_MAX_SIZE);
  const [tileGridSize, secondColumnRef] = useElementSize(TILE_GRID_MAX_SIZE);

  return (
    <BasicLayout>
      <Flex gap="12px" flexDirection={{ sm: "column", lg: "row" }}>
        <Column ref={firstColumnRef}>
          <GameInformation
            game={game}
            currentTurnColor={ritho.turn}
            style={{ margin: "12px 0" }}
          />
          <Board
            reverse={currentPlayerColor === "White"}
            size={boardSize}
            cells={ritho.pieceCell}
            moveableColor={moveablePieceColor}
            {...pieceDnd}
          />
        </Column>
        <Column ref={secondColumnRef} justifyContent="center">
          <TileGrid
            reverse={currentPlayerColor === "White"}
            size={tileGridSize}
            cells={ritho.tileCell}
            onDrop={tileDnd.onDrop}
          />
          <TileStorage
            moveable={moveableTile}
            tileCount={ritho.restTileCount}
            onDragTile={tileDnd.onDragStart}
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
    width: { sm: "100%", lg: "calc(50% - 6px)" },
  },
});
