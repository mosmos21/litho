import { Grid, GridItem } from "@chakra-ui/react";
import { TileCell } from "@/types/ritho";
import { Tile } from "@/components/ritho/Tile";
import { hasTile } from "@/utils/ritho.ts";

type Props = {
  size: number;
  cells: TileCell[][];
};

export const TileGrid = (props: Props) => {
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
      {props.cells.map((row, y) =>
        row.map((cell, x) => (
          <GridItem
            key={`${y}-${x}`}
            width={`${cellSize}px`}
            height={`${cellSize}px`}
            bg="white"
            display="flex"
            justifyContent="center"
            alignItems="center"
            cursor="pointer"
            _hover={{
              bg: "gray.200",
            }}
          >
            {hasTile(cell) && <Tile size={cellSize} type={cell.tile} />}
          </GridItem>
        ))
      )}
    </Grid>
  );
};
