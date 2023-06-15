import { useFirebaseContext } from "@/providers/FirebaseProvider";
import { useCallback } from "react";

export const useWaitingRoomsRoomIdMutation = () => {
  const { db } = useFirebaseContext();

  const setWaitingRoom = useCallback(
    (roomId: string, playerName: string) =>
      db.set(`/waitingRooms/${roomId}`, {
        roomId,
        playerName,
      }),
    [db]
  );

  const removeWaitingRoom = useCallback(
    (roomId: string) => db.remove(`/waitingRooms/${roomId}`),
    [db]
  );

  return {
    setWaitingRoom,
    removeWaitingRoom,
  };
};
