import { TileStorage } from "@/components/TileStorage";
import { Meta, StoryObj } from "@storybook/react";

export default {
  component: TileStorage,
  args: {
    tileCount: {
      VerticalAndHorizontal: 8,
      Diagonal: 8,
    },
  },
} satisfies Meta<typeof TileStorage>;

type Story = StoryObj<typeof TileStorage>;

export const Default: Story = {};
