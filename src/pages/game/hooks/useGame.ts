import { useGamePreparation } from "@/pages/game/hooks/useGamePreparation";
import { usePageParams } from "@/pages/game/hooks/usePageParams";
import { useGamesGameIdQuery } from "@/api/gamesGameId/useGamesGameIdQuery.ts";
import { useGameProgression } from "@/pages/game/hooks/useGameProgression.ts";

export const useGame = () => {
  const { roomId } = usePageParams();
  const { game } = useGamesGameIdQuery(roomId);

  useGamePreparation(game);
  const gameProgression = useGameProgression(game);
  const { ritho, currentPlayerColor } = gameProgression;

  return {
    game,
    moveablePieceColor:
      ritho.turn === currentPlayerColor ? currentPlayerColor : undefined,
    moveableTile: ritho.turn === currentPlayerColor,
    ...gameProgression,
  };
};
