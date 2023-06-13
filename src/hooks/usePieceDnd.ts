import { useCallback, useState } from "react";
import { Coord } from "@/types/ritho";

type Props = {
  onMovePiece: (from: Coord, to: Coord) => void;
};

export const usePieceDnd = (props: Props) => {
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

  return {
    onDragStart: handleDragStart,
    onDrop: handleDrop,
  };
};
