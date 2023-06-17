import { useCallback, useState } from "react";
import { Litho, LithoState } from "@/lib/litho/system/types";
import { buildLitho } from "@/lib/litho/system";
import { Coord, PlaceableTile } from "@/types/litho";

export const useLitho = () => {
  const [litho, setLitho] = useState<Litho>(buildLitho());

  const handleMovePiece = useCallback((from: Coord, to: Coord) => {
    setLitho((litho) => litho.action({ type: "MovePiece", from, to }));
  }, []);

  const handlePlaceTile = useCallback((tile: PlaceableTile, coord: Coord) => {
    setLitho((litho) => litho.action({ type: "PlaceTile", tile, coord }));
  }, []);

  return {
    litho: litho satisfies LithoState,
    onMovePiece: handleMovePiece,
    onPlaceTile: handlePlaceTile,
  };
};
