import { useRitho } from "@/hooks/useRitho.ts";
import { Board } from "@/components/ritho/Board.tsx";
import { TileGrid } from "@/components/ritho/TileGrid.tsx";
import { DEFAULT_BOARD_SIZE, DEFAULT_TILE_GRID_SIZE } from "@/constants";
import { BasicLayout } from "@/layouts/BasicLayout.tsx";
import { Flex, List, ListItem } from "@chakra-ui/react";
import { TileStorage } from "@/components/TileStorage";
import { usePieceDnd } from "@/hooks/usePieceDnd";
import { useTileDnd } from "@/hooks/useTileDnd";
import { useGame } from "@/pages/game/hooks/useGame.ts";

export const GamePage = () => {
  useGame();
  const { ritho, boardRef, onMovePiece, onPlaceTile } = useRitho();
  const pieceDnd = usePieceDnd({ onMovePiece });
  const tileDnd = useTileDnd({ onPlaceTile });

  return (
    <BasicLayout>
      <List>
        <ListItem>turn: {ritho.turn}</ListItem>
        <ListItem>restActionCount: {ritho.restActionCount}</ListItem>
      </List>
      <Flex gap="32px">
        <Board
          ref={boardRef}
          size={DEFAULT_BOARD_SIZE}
          cells={ritho.pieceCell}
          draggableColor={ritho.turn}
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
