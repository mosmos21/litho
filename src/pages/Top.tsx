import { useRitho } from "@/hooks/useRitho";
import { Board } from "@/components/ritho/Board";
import { TileGrid } from "@/components/ritho/TileGrid";
import { DEFAULT_BOARD_SIZE, DEFAULT_TILE_GRID_SIZE } from "@/constants";
import { BasicLayout } from "@/layouts/BasicLayout";
import { Flex, List, ListItem } from "@chakra-ui/react";
import { TileStorage } from "@/components/TileStorage";

export const TopPage = () => {
  const { ritho } = useRitho();

  return (
    <BasicLayout>
      <List>
        <ListItem>turn: {ritho.turn}</ListItem>
        <ListItem>restActionCount: {ritho.restActionCount}</ListItem>
      </List>
      <Flex gap="32px">
        <Board
          size={DEFAULT_BOARD_SIZE}
          cells={ritho.pieceCell}
          draggableColor={ritho.turn}
        />
        <Flex flexDirection="column" gap="24px">
          <TileGrid size={DEFAULT_TILE_GRID_SIZE} cells={ritho.tileCell} />
          <TileStorage tileCount={ritho.restTileCount} />
        </Flex>
      </Flex>
    </BasicLayout>
  );
};
