import { randomString } from "@/utils/string.ts";
import { useCallback } from "react";
import { WaitingGame } from "@/lib/firebase/schema";
import {
  useWaitingRoomsQuery,
  useGamesGameIdMutation,
  useWaitingRoomsRoomIdMutation,
} from "@/api";
import { ROOM_ID_LENGTH } from "@/constants";

export const useRoomPreparation = () => {
  const { waitingRooms } = useWaitingRoomsQuery();
  const { setGame } = useGamesGameIdMutation();
  const { setWaitingRoom } = useWaitingRoomsRoomIdMutation();

  const createRoom = useCallback(
    (playerName: string) => {
      const roomId = randomString(ROOM_ID_LENGTH);

      const game: WaitingGame = {
        roomId,
        status: "waiting",
        author: playerName,
        players: {
          [playerName]: playerName,
        },
      };

      return Promise.all([
        setGame(game),
        setWaitingRoom(roomId, playerName),
      ]).then(() => roomId);
    },
    [setGame, setWaitingRoom]
  );

  return {
    createRoom,
    waitingRooms,
  };
};
