import { useGamePreparation } from "@/pages/game/hooks/useGamePreparation";
import { usePageParams } from "@/pages/game/hooks/usePageParams";
import { useGamesGameIdQuery } from "@/api/gamesGameId/useGamesGameIdQuery";
import { useGameProgression } from "@/pages/game/hooks/useGameProgression";
import { useGameConclusion } from "@/pages/game/hooks/useGameConclusion";
import { useGamePlayer } from "@/pages/game/hooks/useGamePlayer";
import { useLitho } from "@/pages/game/hooks/useLitho";

export const useGame = () => {
  const { roomId } = usePageParams();
  const { game } = useGamesGameIdQuery(roomId);
  const useLithoReturn = useLitho();
  const { litho } = useLithoReturn;

  // NOTE: ゲーム準備の管理
  useGamePreparation(game);

  // NOTE: ゲームの進行の管理
  const gameProgression = useGameProgression({ game, ...useLithoReturn });
  const { currentPlayerColor } = gameProgression;

  // NOTE: ゲームの終了の管理
  useGameConclusion(game, litho);

  const gamePlayerProps = useGamePlayer({
    game,
    gameRecords: gameProgression.gameRecords,
    ...useLithoReturn,
  });

  return {
    game,
    litho,
    moveablePieceColor:
      litho.turn === currentPlayerColor ? currentPlayerColor : undefined,
    moveableTile: litho.turn === currentPlayerColor,
    gamePlayerProps,
    ...gameProgression,
  };
};
