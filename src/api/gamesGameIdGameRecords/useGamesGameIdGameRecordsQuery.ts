import { GameRecord, gameRecordsSchema } from "@/lib/firebase/schema";
import { useState, useCallback, useEffect } from "react";
import { DataSnapshot } from "@firebase/database";
import { useFirebaseContext } from "@/providers/FirebaseProvider";

export const useGamesGameIdGameRecordsQuery = (roomId?: string) => {
  const { db } = useFirebaseContext();
  const [gameRecords, setGameRecords] = useState<GameRecord[]>([]);

  const watchGameRecordsCallback = useCallback((snapshot: DataSnapshot) => {
    const gameRecords = gameRecordsSchema.safeParse(snapshot.val());

    if (gameRecords.success) {
      setGameRecords(gameRecords.data);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = roomId
      ? db.onValue(`/games/${roomId}/gameRecords`, watchGameRecordsCallback)
      : undefined;

    return () => unsubscribe?.();
  }, [db, roomId, watchGameRecordsCallback]);

  return {
    gameRecords,
  };
};
