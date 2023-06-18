import { WaitingGameInformation } from "@/components/GameInformation/WaitingGameInformation";
import { OngoingGameInformation } from "@/components/GameInformation/OngoingGameInformation";
import { FinishedGameInformation } from "@/components/GameInformation/FinishedGameInformation";
import { Game } from "@/lib/firebase/schema";
import { PieceColor } from "@/types/litho";
import { StyleProps } from "@chakra-ui/react";
import { UseGamePlayerReturnType } from "@/pages/game/hooks/useGamePlayer";

type Props = {
  game: Game;
  currentTurnColor: PieceColor;
  style?: StyleProps;
  gamePlayerProps: UseGamePlayerReturnType;
};

export const GameInformation = (props: Props) => {
  switch (props.game.status) {
    case "waiting":
      return <WaitingGameInformation style={props.style} />;
    case "ongoing":
      return (
        <OngoingGameInformation
          currentTurnColor={props.currentTurnColor}
          players={props.game.turn}
          style={props.style}
        />
      );
    case "finished":
      return (
        <FinishedGameInformation
          winner={{
            color: props.game.winner,
            player: props.game.turn[props.game.winner],
          }}
          style={props.style}
          gamePlayerProps={props.gamePlayerProps}
        />
      );
    default:
      return null;
  }
};
