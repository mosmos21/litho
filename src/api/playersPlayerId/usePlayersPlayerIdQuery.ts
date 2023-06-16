import { useFirebaseContext } from "@/providers/FirebaseProvider";
import { Player, PlayerId, playerSchema } from "@/lib/firebase/schema";
import { useState, useCallback, useEffect } from "react";
import { DataSnapshot } from "@firebase/database";

export const usePlayersPlayerIdQuery = (id: PlayerId) => {
  const { db } = useFirebaseContext();
  const [player, setPlayer] = useState<Player>();

  const watchPlayerCallback = useCallback((snapshot: DataSnapshot) => {
    const player = playerSchema.safeParse(snapshot.val());

    if (player.success) {
      setPlayer(player.data);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = db.onValue(`/players/${id}`, watchPlayerCallback);

    return () => unsubscribe();
  }, [id, db, watchPlayerCallback]);

  return {
    player,
  };
};
