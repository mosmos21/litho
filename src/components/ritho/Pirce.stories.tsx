import { Piece } from "@/components/ritho/Piece.tsx";
import { Meta, StoryObj } from "@storybook/react";

export default {
  component: Piece,
  args: {
    size: 60,
  },
} satisfies Meta<typeof Piece>;

type Story = StoryObj<typeof Piece>;

export const BlackBlank: Story = {
  args: {
    type: "Blank",
    color: "Black",
  },
};

export const BlackKing: Story = {
  args: {
    type: "King",
    color: "Black",
  },
};

export const WhiteBlank: Story = {
  args: {
    type: "Blank",
    color: "White",
  },
};

export const WhiteKing: Story = {
  args: {
    type: "King",
    color: "White",
  },
};
