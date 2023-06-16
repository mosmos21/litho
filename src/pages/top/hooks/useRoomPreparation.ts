import { randomString } from "@/utils/string";
import { useCallback } from "react";
import { WaitingGame } from "@/lib/firebase/schema";
import {
  useWaitingRoomsQuery,
  useGamesGameIdMutation,
  useWaitingRoomsRoomIdMutation,
  usePlayersPlayerIdMutation,
} from "@/api";
import { ROOM_ID_LENGTH } from "@/constants";
import { Player } from "@/lib/firebase/schema";

export const useRoomPreparation = () => {
  const { waitingRooms } = useWaitingRoomsQuery();
  const { setGame } = useGamesGameIdMutation();
  const { setWaitingRoom } = useWaitingRoomsRoomIdMutation();
  const { setPlayer } = usePlayersPlayerIdMutation();

  const createRoom = useCallback(
    (player: Player) => {
      const roomId = randomString(ROOM_ID_LENGTH);

      const game: WaitingGame = {
        roomId,
        status: "waiting",
        author: player,
        players: {
          [player.id]: player,
        },
      };

      return Promise.all([
        setPlayer(player),
        setGame(game),
        setWaitingRoom(roomId, player),
      ]).then(() => roomId);
    },
    [setPlayer, setGame, setWaitingRoom]
  );

  return {
    createRoom,
    waitingRooms,
  };
};
