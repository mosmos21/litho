import { Tile } from "@/components/ritho/Tile";
import { Flex, Box, StyleProps } from "@chakra-ui/react";
import { PlaceableTile, TileCount } from "@/types/ritho";
import { numbers } from "@/utils/array";
import { useElementSize } from "@/pages/game/hooks/useElementSize";

const TILE_CELL_SIZE = 70;

const CELL_MARGIN = 8;

type Props = {
  tileCount: TileCount;
  moveable?: boolean;
  onDragTile: (type: PlaceableTile) => void;
  style?: StyleProps;
};

export const TileStorage = (props: Props) => {
  const [size, ref] = useElementSize();
  const cellSize = {
    VerticalAndHorizontal: Math.min(
      TILE_CELL_SIZE,
      Math.floor(
        (size - TILE_CELL_SIZE - CELL_MARGIN) /
          props.tileCount["VerticalAndHorizontal"]
      )
    ),
    Diagonal: Math.min(
      TILE_CELL_SIZE,
      Math.floor(
        (size - TILE_CELL_SIZE - CELL_MARGIN) / props.tileCount["Diagonal"]
      )
    ),
  };

  return (
    <Flex flexDirection="column" gap="8px" ref={ref} {...props.style}>
      <Box position="relative" height={`${TILE_CELL_SIZE}px`}>
        {numbers(props.tileCount["VerticalAndHorizontal"]).map((i) => (
          <Tile
            key={i}
            size={60}
            moveable={props.moveable}
            type="VerticalAndHorizontal"
            onDragStart={() => props.onDragTile("VerticalAndHorizontal")}
            style={{
              position: "absolute",
              left: `${
                i * cellSize["VerticalAndHorizontal"] + CELL_MARGIN * i
              }px`,
            }}
          />
        ))}
      </Box>
      <Box position="relative" height={`${TILE_CELL_SIZE}px`}>
        {numbers(props.tileCount["Diagonal"]).map((i) => (
          <Tile
            key={i}
            size={60}
            moveable={props.moveable}
            type="Diagonal"
            onDragStart={() => props.onDragTile("Diagonal")}
            style={{
              position: "absolute",
              left: `${i * cellSize["Diagonal"] + CELL_MARGIN * i}px`,
            }}
          />
        ))}
      </Box>
    </Flex>
  );
};
