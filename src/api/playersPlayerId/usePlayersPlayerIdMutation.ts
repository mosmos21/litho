import { useFirebaseContext } from "@/providers/FirebaseProvider";
import { Player } from "@/lib/firebase/schema";
import { useCallback } from "react";

export const usePlayersPlayerIdMutation = () => {
  const { db } = useFirebaseContext();

  const setPlayer = useCallback(
    (player: Player) => db.set(`/players/${player.id}`, player),
    [db]
  );

  return {
    setPlayer,
  };
};
