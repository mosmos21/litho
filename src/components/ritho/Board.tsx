import { Grid, GridItem } from "@chakra-ui/react";
import { PieceCell, PieceColor } from "@/types/ritho";
import { Piece } from "@/components/ritho/Piece";
import { BOARD_CELL_COUNT } from "@/constants/ritho";
import { calcCellSize, calcPieceSize, hasPiece } from "@/utils/ritho";
import { forwardRef } from "react";

type Props = {
  size: number;
  cells: PieceCell[][];
  draggableColor?: PieceColor;
};

export const Board = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const cellSize = calcCellSize(props.size);
  const pieceSize = calcPieceSize(cellSize);

  return (
    <Grid
      ref={ref}
      templateRows={`repeat(${BOARD_CELL_COUNT}, 1fr)`}
      templateColumns={`repeat(${BOARD_CELL_COUNT}, 1fr)`}
      gap="2px"
      padding="2px"
      bg="gray.800"
      width={`${props.size}px`}
      height={`${props.size}px`}
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
          >
            {hasPiece(cell) && (
              <Piece
                size={pieceSize}
                type={cell.piece.type}
                color={cell.piece.color}
                drag={props.draggableColor === cell.piece.color}
              />
            )}
          </GridItem>
        ))
      )}
    </Grid>
  );
});
