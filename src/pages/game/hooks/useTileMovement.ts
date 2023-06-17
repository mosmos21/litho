import { useCallback, useState } from "react";
import { Coord, PlaceableTile } from "@/types/ritho";
import { TileGrid } from "@/lib/ritho/tileGrid";

type Props = {
  tileGrid: TileGrid;
  onPlaceTile: (tile: PlaceableTile, coord: Coord) => void;
};

export const useTileMovement = (props: Props) => {
  const [tile, setTile] = useState<PlaceableTile>();

  const handleSelectTile = useCallback((tile: PlaceableTile) => {
    setTile(tile);
  }, []);

  const handleSelectGridCell = useCallback(
    (coord: Coord) => {
      if (!tile) return;

      props.onPlaceTile(tile, coord);
      setTile(undefined);
    },
    [tile, props]
  );

  return {
    onSelectTile: handleSelectTile,
    onSelectTileGridCell: handleSelectGridCell,
  };
};
