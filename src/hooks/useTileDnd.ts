import { useCallback, useState } from "react";
import { Coord, PlaceableTile } from "@/types/ritho";

type Props = {
  onPlaceTile: (tile: PlaceableTile, coord: Coord) => void;
};

export const useTileDnd = (props: Props) => {
  const [tile, setTile] = useState<PlaceableTile>();

  const handleDragStart = useCallback((tile: PlaceableTile) => {
    setTile(tile);
  }, []);

  const handleDrop = useCallback(
    (coord: Coord) => {
      if (!tile) return;

      props.onPlaceTile(tile, coord);
      setTile(undefined);
    },
    [tile, props]
  );

  return {
    onDragStart: handleDragStart,
    onDrop: handleDrop,
  };
};
