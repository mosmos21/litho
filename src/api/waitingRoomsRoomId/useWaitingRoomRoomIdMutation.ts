import { useFirebaseContext } from "@/providers/FirebaseProvider";
import { useCallback } from "react";
import { Player } from "@/lib/firebase/schema";

export const useWaitingRoomsRoomIdMutation = () => {
  const { db } = useFirebaseContext();

  const setWaitingRoom = useCallback(
    (roomId: string, player: Player) =>
      db.set(`/waitingRooms/${roomId}`, {
        roomId,
        player,
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
