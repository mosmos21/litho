import { MouseEvent, TouchEvent, useCallback, useState } from "react";
import { Coord } from "@/types/ritho";
import { PieceGrid } from "@/lib/ritho/pieceGrid";

type Props = {
  pieceGrid: PieceGrid;
  onMovePiece: (from: Coord, to: Coord) => void;
};

export const usePieceMovement = (props: Props) => {
  const [from, setFrom] = useState<Coord>();

  const handleDragStart = useCallback((coord: Coord) => {
    setFrom(coord);
  }, []);

  const handleDrop = useCallback(
    (to: Coord) => {
      if (!from) return;

      props.onMovePiece(from, to);
      setFrom(undefined);
    },
    [from, props]
  );

  const handleClickOrTouch = useCallback(
    (event: MouseEvent | TouchEvent, coord: Coord) => {
      event.preventDefault();

      if (from) {
        props.onMovePiece(from, coord);
        setFrom(undefined);
      } else {
        setFrom(coord);
      }
    },
    [from, props]
  );

  return {
    onDragStart: handleDragStart,
    onDrop: handleDrop,
    onClick: handleClickOrTouch,
    onTouch: handleClickOrTouch,
  };
};
