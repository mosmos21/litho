import { MouseEvent, TouchEvent, useCallback, useState } from "react";
import { Coord, PieceColor } from "@/types/litho";
import { Litho } from "@/lib/litho/system/types";
import { sameCoord } from "@/utils/coord";

type Props = {
  currentPlayerColor?: PieceColor;
  litho: Litho;
  onMovePiece: (from: Coord, to: Coord) => void;
};

export const usePieceMovement = (props: Props) => {
  const { pieceGrid, tileGrid, turn } = props.litho;
  const isCurrentPlayerTurn = props.currentPlayerColor === turn;
  const [from, setFrom] = useState<Coord>();
  const [moveableCoords, setMoveableCoords] = useState<Coord[]>([]);

  const handleSelectFrom = useCallback(
    (coord: Coord) => {
      if (!isCurrentPlayerTurn) return;
      if (!props.litho.isMoveablePiece(coord)) return;

      setFrom(coord);
      setMoveableCoords(pieceGrid.getMoveablePieceCoords(tileGrid, coord));
    },
    [props.litho, isCurrentPlayerTurn, pieceGrid, tileGrid]
  );

  const handleSelectTo = useCallback(
    (to: Coord) => {
      if (!isCurrentPlayerTurn) return;
      if (!from) return;

      if (props.litho.pieceGrid.canMovePiece(props.litho.tileGrid, from, to)) {
        props.onMovePiece(from, to);
        setMoveableCoords([]);
        setFrom(undefined);
      } else if (props.litho.isMoveablePiece(to)) {
        handleSelectFrom(to);
      } else {
        setMoveableCoords([]);
        setFrom(undefined);
      }
    },
    [from, isCurrentPlayerTurn, props, handleSelectFrom]
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
