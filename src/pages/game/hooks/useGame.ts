import { useFirebaseContext } from "@/providers/FirebaseProvider";
import { useEffect, useCallback, useState } from "react";
import { DataSnapshot } from "@firebase/database";
import { gameSchema, waitingGameSchema } from "@/lib/firebase/schema";
import { Game } from "@/lib/firebase/schema";
import { useWatchGameStatusChange } from "@/pages/game/hooks/useWatchGameStatusChange";
import { useGamePreparation } from "@/pages/game/hooks/useGamePreparation.tsx";
import { usePageParams } from "@/pages/game/hooks/usePageParams";

export const useGame = () => {
  const { gameId } = usePageParams();
  const { db } = useFirebaseContext();
  const [gameState, setGameState] = useState<Game>({
    status: "initial",
  });
  useWatchGameStatusChange(gameState.status);
  useGamePreparation(gameId, gameState);

  const watchGameCallback = useCallback((snapshot: DataSnapshot) => {
    const game = gameSchema.safeParse(snapshot.val());
    console.log(game, waitingGameSchema.parse(snapshot.val()));
    if (game.success) {
      setGameState(game.data);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = db.onValue(`/games/${gameId}`, watchGameCallback);

    return () => unsubscribe();
  }, [db, gameId, watchGameCallback]);
};
