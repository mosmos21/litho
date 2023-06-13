import { ChakraProvider } from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const AppProviders = (props: Props) => (
  <DndProvider backend={HTML5Backend}>
    <ChakraProvider>{props.children}</ChakraProvider>
  </DndProvider>
);
