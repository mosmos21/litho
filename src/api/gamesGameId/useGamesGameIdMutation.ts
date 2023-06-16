import { FinishedGame, Game, Player } from "@/lib/firebase/schema";
import { useCallback } from "react";
import { useFirebaseContext } from "@/providers/FirebaseProvider";
import { PieceColor } from "@/types/ritho";

export const useGamesGameIdMutation = () => {
  const { db } = useFirebaseContext();

  const setGame = useCallback(
    (game: Game) => db.set(`/games/${game.roomId}`, game),
    [db]
  );

  const setGamePlayer = useCallback(
    (game: Game, player: Player) =>
      db.set(`/games/${game.roomId}/players/${player.id}`, player),
    [db]
  );

  const updateGameResult = useCallback(
    (game: Game, winner: PieceColor) => {
      const finishedGame: Pick<
        FinishedGame,
        "status" | "winner" | "finishedAt"
      > = {
        status: "finished",
        winner,
        finishedAt: new Date().toISOString(),
      };

      db.update(`/games/${game.roomId}`, finishedGame);
    },
    [db]
  );

  return {
    setGame,
    setGamePlayer,
    updateGameResult,
  };
};
