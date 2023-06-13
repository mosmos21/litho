import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const AppProviders = (props: Props) => (
  <ChakraProvider>{props.children}</ChakraProvider>
);
