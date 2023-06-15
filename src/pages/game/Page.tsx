import { Board } from "@/components/ritho/Board.tsx";
import { TileGrid } from "@/components/ritho/TileGrid.tsx";
import { DEFAULT_BOARD_SIZE, DEFAULT_TILE_GRID_SIZE } from "@/constants";
import { BasicLayout } from "@/layouts/BasicLayout.tsx";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import { TileStorage } from "@/components/TileStorage";
import { usePieceDnd } from "@/hooks/usePieceDnd";
import { useTileDnd } from "@/hooks/useTileDnd";
import { useGame } from "@/pages/game/hooks/useGame";

export const GamePage = () => {
  const {
    game,
    currentPlayerColor,
    ritho,
    boardRef,
    onMovePiece,
    onPlaceTile,
  } = useGame();
  const pieceDnd = usePieceDnd({ onMovePiece });
  const tileDnd = useTileDnd({ onPlaceTile });

  return (
    <BasicLayout>
      {game.status === "waiting" && (
        <Flex gap="8px">
          <Text color="blackAlpha.700">Waiting...</Text>
          <Spinner />
        </Flex>
      )}
      <Flex gap="12px">
        {currentPlayerColor && (
          <Text color="blackAlpha.700">{currentPlayerColor}</Text>
        )}
        {ritho.turn === currentPlayerColor && (
          <Text>Your turn: action {ritho.restActionCount}</Text>
        )}
      </Flex>
      <Flex gap="32px" marginTop="12px">
        <Board
          ref={boardRef}
          size={DEFAULT_BOARD_SIZE}
          cells={ritho.pieceCell}
          draggableColor={
            ritho.turn === currentPlayerColor ? currentPlayerColor : undefined
          }
          {...pieceDnd}
        />
        <Flex flexDirection="column" gap="24px">
          <TileGrid
            size={DEFAULT_TILE_GRID_SIZE}
            cells={ritho.tileCell}
            onDrop={tileDnd.onDrop}
          />
          <TileStorage
            tileCount={ritho.restTileCount}
            onDragTile={tileDnd.onDragStart}
          />
        </Flex>
      </Flex>
    </BasicLayout>
  );
};
