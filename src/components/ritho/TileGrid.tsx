import { Grid } from "@chakra-ui/react";
import { Coord, TileCell } from "@/types/ritho";
import { Tile } from "@/components/ritho/Tile";
import { hasTile } from "@/utils/ritho.ts";
import { TileGridCell } from "@/components/ritho/TileGridCell";
import { useMemo } from "react";
import { reversed } from "@/utils/array";

type Props = {
  reverse?: boolean;
  size: number;
  cells: TileCell[][];
  onDrop: (coord: Coord) => void;
};

export const TileGrid = (props: Props) => {
  const cells = useMemo(
    () => (props.reverse ? reversed(props.cells).map(reversed) : props.cells),
    [props.cells, props.reverse]
  );
  const tileGridSize = props.size + 8;
  const cellSize =
    props.size / Math.max(props.cells.length, props.cells[0].length);

  return (
    <Grid
      templateRows={`repeat(${props.cells.length}, 1fr)`}
      templateColumns={`repeat(${props.cells[0].length}, 1fr)`}
      padding="4px"
      border="1px solid"
      borderColor="gray.700"
      width={`${tileGridSize}px`}
      height={`${tileGridSize}px`}
    >
      {cells.map((row, y) =>
        row.map((cell, x) => (
          <TileGridCell
            key={`${y}-${x}`}
            size={cellSize}
            onDrop={() => props.onDrop(cell.coord)}
          >
            {hasTile(cell) && <Tile size={cellSize} type={cell.tile} />}
          </TileGridCell>
        ))
      )}
    </Grid>
  );
};
