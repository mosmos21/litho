import { PieceColor } from "@/types/litho";
import { StyleProps, Text, Flex } from "@chakra-ui/react";
import { Player } from "@/lib/firebase/schema.ts";
import { UseGamePlayerReturnType } from "@/pages/game/hooks/useGamePlayer";
import { GamePlayer } from "@/components/GamePlayer";

type Props = {
  winner: {
    color: PieceColor;
    player: Player;
  };
  style?: StyleProps;
  gamePlayerProps: UseGamePlayerReturnType;
};

export const FinishedGameInformation = (props: Props) => (
  <Flex flexDirection="column" gap="8px" alignItems="center" {...props.style}>
    <Text color="blackAlpha.800">{props.winner.player.name} won !</Text>
    <GamePlayer {...props.gamePlayerProps} />
  </Flex>
);
