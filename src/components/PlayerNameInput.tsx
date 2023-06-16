import { Flex, Button, Input, Text } from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { UpButton } from "@/components/UpButton";

type Props = {
  name?: string;
  isInvalid?: boolean;
  buttonLabel: string;
  onChangeName?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickBackButton?: () => void;
  onClickSubmitButton: () => void;
};

export const PlayerNameInput = (props: Props) => (
  <Flex flexDirection="column" gap="8px">
    <Input
      isInvalid={props.isInvalid}
      type="text"
      placeholder="name: /^[0-9a-zA-Z]{1,32}$/"
      value={props.name}
      onChange={props.onChangeName}
    />
    <Flex justifyContent="space-between">
      {props.onClickBackButton && (
        <UpButton onClick={props.onClickBackButton} />
      )}
      <Button
        disabled={props.isInvalid}
        onClick={props.isInvalid ? undefined : props.onClickSubmitButton}
        backgroundColor="blackAlpha.800"
        width="120px"
        _hover={{ backgroundColor: "blackAlpha.800", color: "white" }}
      >
        <Text color="whiteAlpha.900">{props.buttonLabel}</Text>
      </Button>
    </Flex>
  </Flex>
);
