import { Game } from "@/lib/firebase/schema";
import { Litho } from "@/lib/litho/system/types";
import { useEffect, useCallback } from "react";
import { usePlayerContext } from "@/providers/PlayerProvider";
import { useGamesGameIdMutation } from "@/api";
import { PieceColor } from "@/types/litho";
import { isOngoingGame } from "@/utils/game";

export const useGameConclusion = (game: Game, litho: Litho) => {
  const { player } = usePlayerContext();
  const { updateGameResult } = useGamesGameIdMutation();

  const finishGame = useCallback(
    (winner: PieceColor) => updateGameResult(game, winner),
    [game, updateGameResult]
  );

  useEffect(() => {
    if (!isOngoingGame(game)) return;
    if (game.author.id !== player.id) return;
    if (!litho.winner) return;

    finishGame(litho.winner);
  }, [litho, game, player, finishGame]);
};
