import { Tile } from "@/components/ritho/Tile";
import { Flex } from "@chakra-ui/react";
import { PlaceableTile, TileCount } from "@/types/ritho.ts";
import { numbers } from "@/utils/array";

type Props = {
  tileCount: TileCount;
  moveable?: boolean;
  onDragTile: (type: PlaceableTile) => void;
};

export const TileStorage = (props: Props) => (
  <Flex flexDirection="column" gap="12px">
    <Flex gap="8px">
      {numbers(props.tileCount["VerticalAndHorizontal"]).map((i) => (
        <Tile
          key={i}
          size={60}
          moveable={props.moveable}
          type="VerticalAndHorizontal"
          onDragStart={() => props.onDragTile("VerticalAndHorizontal")}
        />
      ))}
    </Flex>
    <Flex gap="8px">
      {numbers(props.tileCount["Diagonal"]).map((i) => (
        <Tile
          key={i}
          size={60}
          moveable={props.moveable}
          type="Diagonal"
          onDragStart={() => props.onDragTile("Diagonal")}
        />
      ))}
    </Flex>
  </Flex>
);
