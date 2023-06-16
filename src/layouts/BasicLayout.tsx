import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Header } from "@/components/Header.tsx";

type Props = {
  children: ReactNode;
};

export const BasicLayout = (props: Props) => (
  <Box as="main">
    <Header />
    <Box width="100vw" height="calc(100vh - 46px)" padding="12px">
      {props.children}
    </Box>
  </Box>
);
