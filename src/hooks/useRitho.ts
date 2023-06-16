import { useCallback, useState } from "react";
import { Ritho, RithoState } from "@/lib/ritho/system/types";
import { buildRitho } from "@/lib/ritho/system";
import { Coord, PlaceableTile } from "@/types/ritho.ts";

export const useRitho = () => {
  const [ritho, setRitho] = useState<Ritho>(buildRitho());

  const handleMovePiece = useCallback((from: Coord, to: Coord) => {
    setRitho((ritho) => ritho.action({ type: "MovePiece", from, to }));
  }, []);

  const handlePlaceTile = useCallback((tile: PlaceableTile, coord: Coord) => {
    setRitho((ritho) => ritho.action({ type: "PlaceTile", tile, coord }));
  }, []);

  return {
    ritho: ritho satisfies RithoState,
    onMovePiece: handleMovePiece,
    onPlaceTile: handlePlaceTile,
  };
};
