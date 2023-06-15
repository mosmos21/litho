import { Game } from "@/lib/firebase/schema";
import { useCallback } from "react";
import { useFirebaseContext } from "@/providers/FirebaseProvider";

export const useGamesGameIdMutation = () => {
  const { db } = useFirebaseContext();

  const setGame = useCallback(
    (game: Game) => db.set(`/games/${game.roomId}`, game),
    [db]
  );

  const setGamePlayer = useCallback(
    (game: Game, playerName: string) =>
      db.set(`/games/${game.roomId}/players/${playerName}`, playerName),
    [db]
  );

  return {
    setGame,
    setGamePlayer,
  };
};
