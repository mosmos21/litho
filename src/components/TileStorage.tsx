import { Tile } from "@/components/ritho/Tile";
import { Flex } from "@chakra-ui/react";
import { TileCount } from "@/types/ritho.ts";
import { numbers } from "@/utils/array";

type Props = {
  tileCount: TileCount;
};

export const TileStorage = (props: Props) => (
  <Flex flexDirection="column" gap="12px">
    <Flex gap="8px">
      {numbers(props.tileCount["VerticalAndHorizontal"]).map((i) => (
        <Tile type="VerticalAndHorizontal" key={i} size={60} drag />
      ))}
    </Flex>
    <Flex gap="8px">
      {numbers(props.tileCount["Diagonal"]).map((i) => (
        <Tile type="Diagonal" key={i} size={60} drag />
      ))}
    </Flex>
  </Flex>
);
