import { GamePlayer } from "@/components/GamePlayer";
import { Meta, StoryObj } from "@storybook/react";

export default {
  component: GamePlayer,
  args: {
    current: {
      index: 1,
      record: "A1-A2",
    },
    isFirst: false,
    isLast: false,
  },
} satisfies Meta<typeof GamePlayer>;

type Story = StoryObj<typeof GamePlayer>;

export const Default: Story = {};

export const First: Story = {
  args: {
    isFirst: true,
  },
};

export const Last: Story = {
  args: {
    isLast: true,
  },
};
