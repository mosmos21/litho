import { MouseEvent, TouchEvent, useCallback, useState } from "react";
import { Coord, PieceColor } from "@/types/ritho";
import { Ritho } from "@/lib/ritho/system/types";
import { sameCoord } from "@/utils/coord";

type Props = {
  currentPlayerColor?: PieceColor;
  ritho: Ritho;
  onMovePiece: (from: Coord, to: Coord) => void;
};

export const usePieceMovement = (props: Props) => {
  const { pieceGrid, tileGrid, turn } = props.ritho;
  const isCurrentPlayerTurn = props.currentPlayerColor === turn;
  const [from, setFrom] = useState<Coord>();
  const [moveableCoords, setMoveableCoords] = useState<Coord[]>([]);

  const handleSelectFrom = useCallback(
    (coord: Coord) => {
      if (!isCurrentPlayerTurn) return;
      if (!props.ritho.isMoveablePiece(coord)) return;

      setFrom(coord);
      setMoveableCoords(pieceGrid.getMoveablePieceCoords(tileGrid, coord));
    },
    [props.ritho, isCurrentPlayerTurn, pieceGrid, tileGrid]
  );

  const handleSelectTo = useCallback(
    (to: Coord) => {
      if (!isCurrentPlayerTurn) return;
      if (!from) return;

      props.onMovePiece(from, to);
      setMoveableCoords([]);
      setFrom(undefined);
    },
    [from, isCurrentPlayerTurn, props]
  );

  const handleClickOrTouch = useCallback(
    (event: MouseEvent | TouchEvent, coord: Coord) => {
      event.preventDefault();

      if (from && sameCoord(from, coord)) {
        setMoveableCoords([]);
        setFrom(undefined);
      } else if (from) {
        handleSelectTo(coord);
      } else {
        handleSelectFrom(coord);
      }
    },
    [from, handleSelectFrom, handleSelectTo]
  );

  return {
    moveableCoords,
    onDragStart: handleSelectFrom,
    onDrop: handleSelectTo,
    onClick: handleClickOrTouch,
    onTouch: handleClickOrTouch,
  };
};
