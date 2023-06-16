import { Meta, StoryObj } from "@storybook/react";
import { TileGrid } from "@/components/ritho/TileGrid";
import { buildTileGrid } from "@/lib/ritho/tileGrid";
import { DEFAULT_TILE_GRID_SIZE } from "@/constants";

const tileGrid = buildTileGrid();

export default {
  component: TileGrid,
  args: {
    size: DEFAULT_TILE_GRID_SIZE,
    cells: tileGrid.toArray(1),
  },
} satisfies Meta<typeof TileGrid>;

type Story = StoryObj<typeof TileGrid>;

export const Default: Story = {};

export const Reverse: Story = {
  args: {
    reverse: true,
  },
};
