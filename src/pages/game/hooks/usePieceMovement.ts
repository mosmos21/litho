import { MouseEvent, TouchEvent, useCallback, useState } from "react";
import { Coord } from "@/types/ritho";
import { PieceGrid } from "@/lib/ritho/pieceGrid";

type Props = {
  pieceGrid: PieceGrid;
  onMovePiece: (from: Coord, to: Coord) => Promise<void>;
};

export const usePieceMovement = (props: Props) => {
  const [from, setFrom] = useState<Coord>();

  const handleDragStart = useCallback((coord: Coord) => {
    setFrom(coord);
  }, []);

  const handleDrop = useCallback(
    (to: Coord) => {
      if (!from) return;

      props.onMovePiece(from, to).then(() => {
        setFrom(undefined);
      });
    },
    [from, props]
  );

  const handleClickOrTouch = useCallback(
    (event: MouseEvent | TouchEvent, coord: Coord) => {
      event.preventDefault();

      if (from) {
        props
          .onMovePiece(from, coord)
          .then(() => {
            setFrom(undefined);
          })
          .catch(() => {
            // NOTE: 正しく動かせなかった時はfromはそのまま残す
          });
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
