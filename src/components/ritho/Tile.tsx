import { TileType } from "@/types/ritho";
import { chakra, Box } from "@chakra-ui/react";
import { useDrag } from "react-dnd";
import { ItemType } from "@/utils/reactDnd";

const CIRCLE_SIZE_RATE = 0.25;

type Props = {
  size: number;
  type: TileType;
  moveable?: boolean;
  onDragStart?: () => void;
};

export const Tile = (props: Props) => {
  const circleSize = props.size * CIRCLE_SIZE_RATE;
  const [_, dragRef] = useDrag(
    () => ({
      type: ItemType.TILE,
      item: () => {
        props.onDragStart?.();
        return {};
      },
      canDrag: props.moveable,
    }),
    [props.moveable, props.onDragStart]
  );

  return (
    <Box
      ref={dragRef}
      position="relative"
      width={`${props.size}px`}
      height={`${props.size}px`}
      bg="gray.500"
      borderRadius="4px"
      overflow="hidden"
      cursor={props.moveable ? "pointer" : "default"}
    >
      <Circle width={`${circleSize}px`} height={`${circleSize}px`} />
      {props.type !== "Diagonal" && <VerticalAndHorizontal />}
      {props.type !== "VerticalAndHorizontal" && <Diagonal />}
    </Box>
  );
};

const Circle = chakra(Box, {
  baseStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "gray.700",
    borderRadius: "50%",
  },
});

const Line = chakra(Box, {
  baseStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    _before: {
      content: '""',
      position: "absolute",
    },
    _after: {
      content: '""',
      position: "absolute",
    },
  },
});

const VerticalAndHorizontal = chakra(Line, {
  baseStyle: {
    _before: {
      width: "100%",
      height: "4px",
      bg: "gray.700",
      top: "50%",
      left: 0,
      transform: "translateY(-50%)",
    },
    _after: {
      width: "4px",
      height: "100%",
      bg: "gray.700",
      top: 0,
      left: "50%",
      transform: "translateX(-50%)",
    },
  },
});

const Diagonal = chakra(Line, {
  baseStyle: {
    _before: {
      width: "140%",
      height: "4px",
      bg: "gray.700",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%) rotate(45deg)",
    },
    _after: {
      width: "140%",
      height: "4px",
      bg: "gray.700",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%) rotate(-45deg)",
    },
  },
});
