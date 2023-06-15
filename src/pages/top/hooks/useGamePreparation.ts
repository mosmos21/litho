import { randomString } from "@/utils/string.ts";
import { useFirebaseContext } from "@/providers/FirebaseProvider";
import { useCallback, useEffect, useState } from "react";
import {
  WaitingGameList,
  WaitingGame,
  WaitingGameListItem,
  waitingGameListSchema,
} from "@/lib/firebase/schema.ts";
import { DataSnapshot } from "@firebase/database";

export const useGamePreparation = () => {
  const { db } = useFirebaseContext();
  const [waitingGames, setWaitingGames] = useState<WaitingGameList>({});

  const createGame = useCallback(
    (playerName: string) => {
      const gameId = randomString(32);
      const waitGameListItem: WaitingGameListItem = {
        playerName,
      };
      const game: WaitingGame = {
        status: "waiting",
        author: playerName,
        players: {
          [playerName]: playerName,
        },
      };

      return Promise.all([
        db.set(`/games/${gameId}`, game),
        db.set(`/waitingGames/${gameId}`, waitGameListItem),
      ]).then(() => gameId);
    },
    [db]
  );

  const watchWaitingGamesCallback = useCallback((snapshot: DataSnapshot) => {
    const waitingGames = waitingGameListSchema.safeParse(snapshot.val());
    if (waitingGames.success) {
      setWaitingGames(waitingGames.data);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = db.onValue("/waitingGames", watchWaitingGamesCallback);

    return () => unsubscribe();
  }, [db, watchWaitingGamesCallback]);

  return {
    createGame,
    waitingGames,
  };
};
