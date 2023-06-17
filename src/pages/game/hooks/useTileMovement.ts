import { useCallback, useState } from "react";
import { Coord, PlaceableTile } from "@/types/ritho";
import { TileGrid } from "@/lib/ritho/tileGrid";

type Props = {
  tileGrid: TileGrid;
  onPlaceTile: (tile: PlaceableTile, coord: Coord) => void;
};

export const useTileMovement = (props: Props) => {
  const [tile, setTile] = useState<PlaceableTile>();
  const [placeableCoords, setPlaceableCoords] = useState<Coord[]>([]);

  const handleSelectTile = useCallback(
    (selectedTile: PlaceableTile) => {
      setTile(selectedTile);
      setPlaceableCoords(props.tileGrid.getPlaceableCoords());
    },
    [props.tileGrid]
  );

  const handleSelectGridCell = useCallback(
    (coord: Coord) => {
      if (!tile) return;

      props.onPlaceTile(tile, coord);
      setTile(undefined);
      setPlaceableCoords([]);
    },
    [tile, props]
  );

  return {
    placeableCoords,
    onSelectTile: handleSelectTile,
    onSelectTileGridCell: handleSelectGridCell,
  };
};
