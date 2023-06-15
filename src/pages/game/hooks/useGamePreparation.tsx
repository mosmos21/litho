import { useCallback, useEffect } from "react";
import { Game, OngoingGame, WaitingGame } from "@/lib/firebase/schema";
import { isWaitingGame } from "@/utils/game";
import { usePlayerContext } from "@/providers/PlayerProvider";
import { useGamesGameIdMutation, useWaitingRoomsRoomIdMutation } from "@/api";

export const useGamePreparation = (game: Game) => {
  const { player } = usePlayerContext();
  const { setGame, setGamePlayer } = useGamesGameIdMutation();
  const { removeWaitingRoom } = useWaitingRoomsRoomIdMutation();

  const configureGame = useCallback(
    (waitingGame: WaitingGame) => {
      const { roomId } = waitingGame;
      const blackPlayerIdx = Math.floor(Math.random() * 2);
      const whitePlayerIdx = blackPlayerIdx === 0 ? 1 : 0;
      const playerNames = Object.keys(waitingGame.players);

      const ongoingGame: OngoingGame = {
        roomId: roomId,
        status: "ongoing",
        turn: {
          Black: playerNames[blackPlayerIdx],
          White: playerNames[whitePlayerIdx],
        },
        startedAt: new Date().toISOString(),
      };

      return Promise.all([setGame(ongoingGame), removeWaitingRoom(roomId)]);
    },
    [setGame, removeWaitingRoom]
  );

  useEffect(() => {
    if (!isWaitingGame(game)) return;

    if (game.author === player.name) {
      const players = Object.keys(game.players);
      if (players.length === 2) {
        configureGame(game);
      }
    } else {
      setGamePlayer(game, player.name);
    }
  }, [game, player, configureGame, setGamePlayer]);
};
