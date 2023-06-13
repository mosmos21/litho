import type { Preview } from "@storybook/react";
import { ChakraProvider } from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <DndProvider backend={HTML5Backend}>
        <ChakraProvider>
          <Story />
        </ChakraProvider>
      </DndProvider>
    ),
  ],
};

export default preview;
