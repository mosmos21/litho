import { Flex, Spinner, Text } from "@chakra-ui/react";

export const WaitingModalContent = () => (
  <Flex
    width="300px"
    height="300px"
    alignItems="center"
    justifyContent="center"
    gap="12px"
  >
    <Text fontSize="2xl" color="blackAlpha.700">
      Waiting...
    </Text>
    <Spinner />
  </Flex>
);
