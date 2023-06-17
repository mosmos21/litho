import { Coord, PieceCell, PieceColor } from "@/types/litho";
import { Piece } from "@/components/litho/Piece";
import { BOARD_CELL_COUNT } from "@/constants/litho";
import { calcCellSize, calcPieceSize, hasPiece } from "@/utils/litho";
import { useRef, useMemo, MouseEvent, TouchEvent } from "react";
import { BoardCell } from "@/components/litho/BoardCell";
import { Grid, StyleProps } from "@chakra-ui/react";
import { reversed } from "@/utils/array";

type Props = {
  size: number;
  cells: PieceCell[][];
  moveableColor?: PieceColor;
  reverse?: boolean;
  style?: StyleProps;
  moveableCoords?: Coord[];
  onDragStart: (from: Coord) => void;
  onDrop: (to: Coord) => void;
  onClick: (event: MouseEvent, coord: Coord) => void;
  onTouch: (event: TouchEvent, coord: Coord) => void;
};

export const Board = (props: Props) => {
  const moveableCoordsMap = useMemo(
    () =>
      (props.moveableCoords ?? []).reduce<
        Record<number, Record<number, boolean>>
      >(
        (acc, c) => ({
          ...acc,
          [c.y]: { ...acc[c.y], [c.x]: true },
        }),
        {}
      ),
    [props.moveableCoords]
  );
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
            onClick={(event) => props.onClick(event, cell.coord)}
            onTouch={(event) => props.onTouch(event, cell.coord)}
            moveable={moveableCoordsMap[cell.coord.y]?.[cell.coord.x]}
          >
            {hasPiece(cell) && (
              <Piece
                size={pieceSize}
                type={cell.piece.type}
                color={cell.piece.color}
                moveable={props.moveableColor === cell.piece.color}
                onDragStart={() => props.onDragStart(cell.coord)}
                onClick={(event) => props.onClick(event, cell.coord)}
                onTouch={(event) => props.onTouch(event, cell.coord)}
              />
            )}
          </BoardCell>
        ))
      )}
    </Grid>
  );
};
