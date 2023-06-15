import { useFirebaseContext } from "@/providers/FirebaseProvider";
import { useCallback } from "react";
import { GameRecord, RoomId } from "@/lib/firebase/schema";

export const useGamesGameIdGameRecordsMutation = () => {
  const { db } = useFirebaseContext();

  const setGameRecord = useCallback(
    (roomId: RoomId, recordNumber: number, gameRecord: GameRecord) =>
      db.set(`/games/${roomId}/gameRecords/${recordNumber}`, gameRecord),
    [db]
  );

  return {
    setGameRecord,
  };
};
