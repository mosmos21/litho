import { Header } from "@/components/Header";
import { Meta, StoryObj } from "@storybook/react";

export default {
  component: Header,
} satisfies Meta<typeof Header>;

type Story = StoryObj<typeof Header>;

export const Default: Story = {};
