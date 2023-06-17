import { Flex, StyleProps, Text } from "@chakra-ui/react";
import { PieceColor } from "@/types/litho.ts";
import { Player } from "@/lib/firebase/schema.ts";
import { Piece } from "@/components/litho/Piece.tsx";

type Props = {
  currentTurnColor: PieceColor;
  players: Record<PieceColor, Player>;
  style?: StyleProps;
};
export const OngoingGameInformation = (props: Props) => (
  <Flex gap="16px" {...props.style}>
    <Flex gap="8px" opacity={props.currentTurnColor === "Black" ? 1 : 0.3}>
      <Text color="blackAlpha.800">{props.players["Black"].name}</Text>
      <Piece color="Black" type="King" size={30} />
    </Flex>
    <Flex>vs</Flex>
    <Flex gap="8px" opacity={props.currentTurnColor === "White" ? 1 : 0.3}>
      <Piece color="White" type="King" size={30} />
      <Text color="blackAlpha.800">{props.players["White"].name}</Text>
    </Flex>
  </Flex>
);
