import {
  chakra,
  BackgroundProps,
  Icon,
  ColorProps,
  shouldForwardProp,
} from "@chakra-ui/react";
import { PieceType, PieceColor } from "@/types/ritho";
import { FaChessKing } from "react-icons/fa";
import { motion, isValidMotionProp } from "framer-motion";

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
  drag?: boolean;
};

export const Piece = (props: Props) => (
  <Root
    bg={BACKGROUND[props.color]}
    width={`${props.size}px`}
    height={`${props.size}px`}
    borderRadius="4px"
    alignItems="center"
    justifyContent="center"
    cursor="pointer"
    display="flex"
    drag={props.drag}
    whileHover={{ scale: 1.1 }}
  >
    {props.type === "King" && (
      <Icon
        as={FaChessKing}
        boxSize={`${props.size / 2}px`}
        color={ICON_COLOR[props.color]}
      />
    )}
  </Root>
);

const Root = chakra(motion.div, {
  shouldForwardProp: (props) =>
    isValidMotionProp(props) || shouldForwardProp(props),
});
