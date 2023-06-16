import { buildPieceGrid } from "@/lib/ritho/pieceGrid";
import { DEFAULT_BOARD_SIZE } from "@/constants";
import { Board } from "@/components/ritho/Board";
import { Meta, StoryObj } from "@storybook/react";

export default {
  component: Board,
  args: {
    size: DEFAULT_BOARD_SIZE,
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
