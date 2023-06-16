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
      const players = Object.values(waitingGame.players);

      const ongoingGame: OngoingGame = {
        roomId: roomId,
        author: waitingGame.author,
        status: "ongoing",
        turn: {
          Black: players[blackPlayerIdx],
          White: players[whitePlayerIdx],
        },
        startedAt: new Date().toISOString(),
      };

      return Promise.all([setGame(ongoingGame), removeWaitingRoom(roomId)]);
    },
    [setGame, removeWaitingRoom]
  );

  const joinGame = useCallback(
    (game: WaitingGame) => setGamePlayer(game, player),
    [setGamePlayer, player]
  );

  useEffect(() => {
    if (!isWaitingGame(game)) return;

    if (game.author.id === player.id) {
      const players = Object.keys(game.players);
      if (players.length === 2) {
        configureGame(game);
      }
    } else {
      joinGame(game);
    }
  }, [game, player, configureGame, setGamePlayer, joinGame]);
};
