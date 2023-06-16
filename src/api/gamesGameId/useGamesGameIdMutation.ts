import { Game, Player } from "@/lib/firebase/schema";
import { useCallback } from "react";
import { useFirebaseContext } from "@/providers/FirebaseProvider";

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

  return {
    setGame,
    setGamePlayer,
  };
};
