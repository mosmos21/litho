import { Game } from "@/lib/firebase/schema";
import { Ritho } from "@/lib/ritho/system/types";
import { useEffect, useCallback } from "react";
import { usePlayerContext } from "@/providers/PlayerProvider";
import { useGamesGameIdMutation } from "@/api";
import { PieceColor } from "@/types/ritho";
import { isOngoingGame } from "@/utils/game";

export const useGameConclusion = (game: Game, ritho: Ritho) => {
  const { player } = usePlayerContext();
  const { updateGameResult } = useGamesGameIdMutation();

  const finishGame = useCallback(
    (winner: PieceColor) => updateGameResult(game, winner),
    [game, updateGameResult]
  );

  useEffect(() => {
    if (!isOngoingGame(game)) return;
    if (game.author.id !== player.id) return;
    if (!ritho.winner) return;

    finishGame(ritho.winner);
  }, [ritho, game, player, finishGame]);
};
