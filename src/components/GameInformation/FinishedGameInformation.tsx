import { PieceColor } from "@/types/litho";
import { StyleProps, Text } from "@chakra-ui/react";

type Props = {
  winner: PieceColor;
  style?: StyleProps;
};

export const FinishedGameInformation = (props: Props) => (
  <Text color="blackAlpha.800" {...props.style}>
    {props.winner} won !
  </Text>
);
