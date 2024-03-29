import { buildPieceGrid } from "@/lib/litho/pieceGrid";
import { BOARD_MAX_SIZE } from "@/constants";
import { Board } from "@/components/litho/Board";
import { Meta, StoryObj } from "@storybook/react";

export default {
  component: Board,
  args: {
    size: BOARD_MAX_SIZE,
    cells: buildPieceGrid().toArray(),
  },
} satisfies Meta<typeof Board>;

type Story = StoryObj<typeof Board>;

export const Default: Story = {};

export const Reverse: Story = {
  args: {
    reverse: true,
  },
};

export const WithMoveableCoords: Story = {
  args: {
    moveableCoords: [
      { x: 5, y: 2 },
      { x: 5, y: 3 },
    ],
  },
};
