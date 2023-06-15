import { Game, gameSchema } from "@/lib/firebase/schema";
import { useState, useCallback, useEffect } from "react";
import { DataSnapshot } from "@firebase/database";
import { useFirebaseContext } from "@/providers/FirebaseProvider";

export const useGamesGameIdQuery = (roomId: string) => {
  const { db } = useFirebaseContext();
  const [game, setGameState] = useState<Game>({
    status: "initial",
    roomId,
  });

  const watchGameCallback = useCallback((snapshot: DataSnapshot) => {
    const game = gameSchema.safeParse(snapshot.val());
    if (game.success) {
      setGameState(game.data);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = db.onValue(`/games/${roomId}`, watchGameCallback);

    return () => unsubscribe();
  }, [db, roomId, watchGameCallback]);

  return {
    game,
  };
};
