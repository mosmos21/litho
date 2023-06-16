import { Coord, PieceCell, PieceColor } from "@/types/ritho";
import { Piece } from "@/components/ritho/Piece";
import { BOARD_CELL_COUNT } from "@/constants/ritho";
import { calcCellSize, calcPieceSize, hasPiece } from "@/utils/ritho";
import { useRef, useMemo } from "react";
import { BoardCell } from "@/components/ritho/BoardCell";
import { Grid, StyleProps } from "@chakra-ui/react";
import { reversed } from "@/utils/array";

type Props = {
  size: number;
  cells: PieceCell[][];
  moveableColor?: PieceColor;
  onDragStart: (from: Coord) => void;
  onDrop: (to: Coord) => void;
  reverse?: boolean;
  style?: StyleProps;
};

export const Board = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const cells = useMemo(
    () => (props.reverse ? reversed(props.cells).map(reversed) : props.cells),
    [props.cells, props.reverse]
  );
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
      {...props.style}
    >
      {cells.map((row, y) =>
        row.map((cell, x) => (
          <BoardCell
            key={`${y}-${x}`}
            size={cellSize}
            onDrop={() => props.onDrop(cell.coord)}
          >
            {hasPiece(cell) && (
              <Piece
                size={pieceSize}
                type={cell.piece.type}
                color={cell.piece.color}
                canMove={props.moveableColor === cell.piece.color}
                onDragStart={() => props.onDragStart(cell.coord)}
              />
            )}
          </BoardCell>
        ))
      )}
    </Grid>
  );
};
