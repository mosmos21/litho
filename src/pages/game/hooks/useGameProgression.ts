import { Game } from "@/lib/firebase/schema";
import { isOngoingGame } from "@/utils/game";
import {
  Coord,
  MovePieceAction,
  PieceColor,
  PlaceableTile,
  PlaceTileAction,
} from "@/types/litho";
import { useState, useEffect, useCallback } from "react";
import { useLitho } from "@/pages/game/hooks/useLitho";
import { usePlayerContext } from "@/providers/PlayerProvider";
import {
  useGamesGameIdGameRecordsMutation,
  useGamesGameIdGameRecordsQuery,
} from "@/api";
import { decodeAction, encodeAction } from "@/lib/litho/gameRecord";

export const useGameProgression = (game: Game) => {
  const { player } = usePlayerContext();
  const [currentPlayerColor, setCurrentPlayerColor] = useState<PieceColor>();
  const [currentGameRecordNumber, setCurrentGameRecordNumber] =
    useState<number>(0);
  const { litho, onMovePiece, onPlaceTile } = useLitho();
  const { gameRecords } = useGamesGameIdGameRecordsQuery(game.roomId);
  const { setGameRecord } = useGamesGameIdGameRecordsMutation();

  const handleMovePiece = useCallback(
    (from: Coord, to: Coord) => {
      const piece = litho.pieceGrid.get(to);
      const action: MovePieceAction = {
        type: "MovePiece",
        from,
        to,
        capture: piece?.type,
      };
      if (!litho.isValidAction(action)) return;

      setCurrentGameRecordNumber((prev) => prev + 1);
      const gameRecord = encodeAction(action);
      setGameRecord(game.roomId, gameRecords.length, gameRecord).then(() =>
        onMovePiece(from, to)
      );
    },
    [setGameRecord, game.roomId, gameRecords.length, onMovePiece, litho]
  );

  const handlePlaceTile = useCallback(
    (tile: PlaceableTile, coord: Coord) => {
      const action: PlaceTileAction = { type: "PlaceTile", tile, coord };
      if (!litho.isValidAction(action)) return;

      setCurrentGameRecordNumber((prev) => prev + 1);
      const gameRecord = encodeAction(action);
      setGameRecord(game.roomId, gameRecords.length, gameRecord).then(() =>
        onPlaceTile(tile, coord)
      );
    },
    [setGameRecord, game.roomId, gameRecords.length, onPlaceTile, litho]
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
    litho,
    onMovePiece: handleMovePiece,
    onPlaceTile: handlePlaceTile,
  };
};
