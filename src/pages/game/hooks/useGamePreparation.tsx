import { useFirebaseContext } from "@/providers/FirebaseProvider";
import { useCallback, useEffect } from "react";
import { Game, OngoingGame, WaitingGame } from "@/lib/firebase/schema";
import { isWaitingGame } from "@/utils/game";
import { usePlayerContext } from "@/providers/PlayerProvider";
import { useApplicationModalContext } from "@/providers/ApplicationModalProvider";

export const useGamePreparation = (gameId: string, game: Game) => {
  const { db } = useFirebaseContext();
  const { player } = usePlayerContext();
  const { openModal } = useApplicationModalContext();
  const configureGame = useCallback(
    (waitingGame: WaitingGame) => {
      const blackPlayerIdx = Math.floor(Math.random() * 2);
      const whitePlayerIdx = blackPlayerIdx === 0 ? 1 : 0;
      const playerNames = Object.keys(waitingGame.players);

      const ongoingGame: OngoingGame = {
        status: "ongoing",
        turn: {
          Black: playerNames[blackPlayerIdx],
          White: playerNames[whitePlayerIdx],
        },
        startedAt: new Date().toISOString(),
        gameRecords: {},
      };
      db.set(`/games/${gameId}`, ongoingGame);
      db.remove(`/waitingGames/${gameId}`);
    },
    [db, gameId]
  );

  const joinGame = useCallback(
    (playerName: string) => {
      db.set(`/games/${gameId}/players/${playerName}`, playerName);
    },
    [db, gameId]
  );

  useEffect(() => {
    if (!isWaitingGame(game)) return;
    if (!player) return;

    if (game.author === player.name) {
      const players = Object.keys(game.players);
      if (players.length === 2) {
        configureGame(game);
      }
    } else {
      joinGame(player.name);
    }
  }, [game, player, openModal, configureGame, joinGame]);
};
