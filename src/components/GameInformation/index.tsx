import { WaitingGameInformation } from "@/components/GameInformation/WaitingGameInformation";
import { OngoingGameInformation } from "@/components/GameInformation/OngoingGameInformation";
import { FinishedGameInformation } from "@/components/GameInformation/FinishedGameInformation";
import { Game } from "@/lib/firebase/schema";
import { PieceColor } from "@/types/ritho.ts";
import { StyleProps } from "@chakra-ui/react";

type Props = {
  game: Game;
  currentTurnColor: PieceColor;
  style?: StyleProps;
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
          winner={props.game.winner}
          style={props.style}
        />
      );
    default:
      return null;
  }
};
