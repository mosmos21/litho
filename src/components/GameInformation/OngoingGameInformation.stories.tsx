import { OngoingGameInformation } from "@/components/GameInformation/OngoingGameInformation.tsx";
import { Meta, StoryObj } from "@storybook/react";

export default {
  component: OngoingGameInformation,
  args: {
    players: {
      Black: {
        id: "plackId",
        name: "Black Player",
      },
      White: {
        id: "whiteId",
        name: "White Player",
      },
    },
  },
} satisfies Meta<typeof OngoingGameInformation>;

type Story = StoryObj<typeof OngoingGameInformation>;

export const WhiteTurn: Story = {
  args: {
    currentTurnColor: "White",
  },
};

export const BlackTurn: Story = {
  args: {
    currentTurnColor: "Black",
  },
};
