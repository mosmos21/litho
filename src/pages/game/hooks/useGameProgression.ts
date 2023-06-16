import { Game } from "@/lib/firebase/schema";
import { isOngoingGame } from "@/utils/game";
import { Coord, PieceColor, PlaceableTile } from "@/types/ritho";
import { useState, useEffect, useCallback } from "react";
import { useRitho } from "@/hooks/useRitho.ts";
import { usePlayerContext } from "@/providers/PlayerProvider";
import {
  useGamesGameIdGameRecordsMutation,
  useGamesGameIdGameRecordsQuery,
} from "@/api";
import { decodeAction, encodeAction } from "@/lib/ritho/gameRecord.ts";

export const useGameProgression = (game: Game) => {
  const { player } = usePlayerContext();
  const [currentPlayerColor, setCurrentPlayerColor] = useState<PieceColor>();
  const [currentGameRecordNumber, setCurrentGameRecordNumber] =
    useState<number>(0);
  const { ritho, boardRef, onMovePiece, onPlaceTile } = useRitho();
  const { gameRecords } = useGamesGameIdGameRecordsQuery(game.roomId);
  const { setGameRecord } = useGamesGameIdGameRecordsMutation();

  const handleMovePiece = useCallback(
    (from: Coord, to: Coord) => {
      setCurrentGameRecordNumber((prev) => prev + 1);
      const gameRecord = encodeAction({ type: "MovePiece", from, to });
      setGameRecord(game.roomId, gameRecords.length, gameRecord).then(() =>
        onMovePiece(from, to)
      );
    },
    [setGameRecord, game.roomId, gameRecords.length, onMovePiece]
  );

  const handlePlaceTile = useCallback(
    (tile: PlaceableTile, coord: Coord) => {
      setCurrentGameRecordNumber((prev) => prev + 1);
      const gameRecord = encodeAction({ type: "PlaceTile", tile, coord });
      setGameRecord(game.roomId, gameRecords.length, gameRecord).then(() =>
        onPlaceTile(tile, coord)
      );
    },
    [setGameRecord, game.roomId, gameRecords.length, onPlaceTile]
  );

  useEffect(() => {
    if (!isOngoingGame(game)) return;

    if (!currentPlayerColor) {
      setCurrentPlayerColor(
        game.turn["Black"].id === player.id ? "Black" : "White"
      );
    }
  }, [game, player, currentPlayerColor]);

  useEffect(() => {
    const records = gameRecords.slice(currentGameRecordNumber);

    records.forEach((record) => {
      const action = decodeAction(record);
      switch (action.type) {
        case "MovePiece":
          onMovePiece(action.from, action.to);
          break;
        case "PlaceTile":
          onPlaceTile(action.tile, action.coord);
          break;
      }
    });
    setCurrentGameRecordNumber(gameRecords.length);
  }, [gameRecords, currentGameRecordNumber, onMovePiece, onPlaceTile]);

  return {
    currentPlayerColor,
    ritho,
    boardRef,
    onMovePiece: handleMovePiece,
    onPlaceTile: handlePlaceTile,
  };
};
