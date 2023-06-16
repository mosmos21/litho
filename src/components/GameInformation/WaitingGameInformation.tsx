import { Spinner, Flex, Text, StyleProps } from "@chakra-ui/react";

type Props = {
  style?: StyleProps;
};

export const WaitingGameInformation = (props: Props) => (
  <Flex gap="8px" {...props.style}>
    <Text color="blackAlpha.700">Waiting...</Text>
    <Spinner />
  </Flex>
);
