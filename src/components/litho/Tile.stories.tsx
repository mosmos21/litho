import { Tile } from "@/components/litho/Tile";
import { Meta, StoryObj } from "@storybook/react";

export default {
  component: Tile,
  args: {
    size: 80,
  },
} satisfies Meta<typeof Tile>;

type Story = StoryObj<typeof Tile>;

export const Omnidirectional: Story = {
  args: {
    type: "Omnidirectional",
  },
};

export const VerticalAndHorizontal: Story = {
  args: {
    type: "VerticalAndHorizontal",
  },
};

export const Diagonal: Story = {
  args: {
    type: "Diagonal",
  },
};
