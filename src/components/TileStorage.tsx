import { Tile } from "@/components/ritho/Tile";
import { Flex, Grid, StyleProps } from "@chakra-ui/react";
import { PlaceableTile, TileCount } from "@/types/ritho";
import { numbers } from "@/utils/array";
import { useElementSize } from "@/pages/game/hooks/useElementSize";

const TILE_CELL_SIZE = 70;

type Props = {
  tileCount: TileCount;
  moveable?: boolean;
  onDragTile: (type: PlaceableTile) => void;
  style?: StyleProps;
};

export const TileStorage = (props: Props) => {
  const [size, ref] = useElementSize();
  const minColCount = Math.ceil(size / (TILE_CELL_SIZE + 8));

  return (
    <Flex flexDirection="column" gap="8px" ref={ref} {...props.style}>
      {size}
      <Grid
        templateColumns={`repeat(${Math.max(
          props.tileCount["VerticalAndHorizontal"],
          minColCount
        )}, 1fr)`}
        overflowX="hidden"
      >
        {numbers(props.tileCount["VerticalAndHorizontal"]).map((i) => (
          <Tile
            key={i}
            size={60}
            moveable={props.moveable}
            type="VerticalAndHorizontal"
            onDragStart={() => props.onDragTile("VerticalAndHorizontal")}
          />
        ))}
      </Grid>
      <Grid
        templateColumns={`repeat(${Math.max(
          props.tileCount["Diagonal"],
          minColCount
        )}, 1fr)`}
        overflowX="hidden"
      >
        {numbers(props.tileCount["Diagonal"]).map((i) => (
          <Tile
            key={i}
            size={60}
            moveable={props.moveable}
            type="Diagonal"
            onDragStart={() => props.onDragTile("Diagonal")}
          />
        ))}
      </Grid>
    </Flex>
  );
};
