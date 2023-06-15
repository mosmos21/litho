import { ChakraProvider } from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ReactNode } from "react";
import { FirebaseProvider } from "@/providers/FirebaseProvider";
import { PlayerProvider } from "@/providers/PlayerProvider";
import { ApplicationModalProvider } from "@/providers/ApplicationModalProvider";

type Props = {
  children: ReactNode;
};

export const AppProviders = (props: Props) => (
  <DndProvider backend={HTML5Backend}>
    <ChakraProvider>
      <FirebaseProvider>
        <PlayerProvider>
          <ApplicationModalProvider>{props.children}</ApplicationModalProvider>
        </PlayerProvider>
      </FirebaseProvider>
    </ChakraProvider>
  </DndProvider>
);
