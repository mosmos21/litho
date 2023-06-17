import { Meta, StoryObj } from "@storybook/react";
import { TileGrid } from "@/components/ritho/TileGrid";
import { buildTileGrid } from "@/lib/ritho/tileGrid";
import { TILE_GRID_MAX_SIZE } from "@/constants";

const tileGrid = buildTileGrid();

export default {
  component: TileGrid,
  args: {
    size: TILE_GRID_MAX_SIZE,
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

export const WithPlaceable: Story = {
  args: {
    placeableCoords: [
      { x: -1, y: -1 },
      { x: 0, y: -1 },
      { x: 1, y: -1 },
    ],
  },
};
