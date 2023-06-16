import { useGamePreparation } from "@/pages/game/hooks/useGamePreparation";
import { usePageParams } from "@/pages/game/hooks/usePageParams";
import { useGamesGameIdQuery } from "@/api/gamesGameId/useGamesGameIdQuery.ts";
import { useGameProgression } from "@/pages/game/hooks/useGameProgression.ts";
import { useGameConclusion } from "@/pages/game/hooks/useGameConclusion.ts";

export const useGame = () => {
  const { roomId } = usePageParams();
  const { game } = useGamesGameIdQuery(roomId);

  // NOTE: ゲーム準備の管理
  useGamePreparation(game);

  // NOTE: ゲームの進行の管理
  const gameProgression = useGameProgression(game);
  const { ritho, currentPlayerColor } = gameProgression;

  // NOTE: ゲームの終了の管理
  useGameConclusion(game, ritho);

  return {
    game,
    moveablePieceColor:
      ritho.turn === currentPlayerColor ? currentPlayerColor : undefined,
    moveableTile: ritho.turn === currentPlayerColor,
    ...gameProgression,
  };
};
