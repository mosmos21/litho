import { BackgroundProps, Icon, ColorProps, Box } from "@chakra-ui/react";
import { PieceType, PieceColor } from "@/types/litho";
import { FaChessKing } from "react-icons/fa";
import { useDrag } from "react-dnd";
import { ItemType } from "@/utils/reactDnd.ts";
import { TouchEvent, MouseEvent } from "react";

const BACKGROUND: Record<PieceColor, BackgroundProps["bg"]> = {
  Black: "gray.600",
  White: "gray.200",
};

const ICON_COLOR: Record<PieceColor, ColorProps["color"]> = {
  Black: BACKGROUND["White"],
  White: BACKGROUND["Black"],
};

type Props = {
  size: number;
  type: PieceType;
  color: PieceColor;
  moveable?: boolean;
  onDragStart?: () => void;
  onClick?: (event: MouseEvent) => void;
  onTouch?: (event: TouchEvent) => void;
};

export const Piece = (props: Props) => {
  const [_, dragRef] = useDrag(
    () => ({
      type: ItemType.PIECE,
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
      bg={BACKGROUND[props.color]}
      width={`${props.size}px`}
      height={`${props.size}px`}
      borderRadius="4px"
      alignItems="center"
      justifyContent="center"
      cursor={props.moveable ? "pointer" : "default"}
      display="flex"
      boxShadow="md"
      onClick={props.onClick}
      onTouchEnd={props.onTouch}
    >
      {props.type === "King" && (
        <Icon
          as={FaChessKing}
          boxSize={`${props.size / 2}px`}
          color={ICON_COLOR[props.color]}
        />
      )}
    </Box>
  );
};
