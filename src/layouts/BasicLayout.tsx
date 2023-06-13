import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const BasicLayout = (props: Props) => (
  <Box width="100vw" height="100vh" padding="12px">
    {props.children}
  </Box>
);
