import { IconButton, Icon } from "@chakra-ui/react";
import { FaArrowUp } from "react-icons/fa";

type Props = {
  label?: string;
  onClick: () => void;
};

export const UpButton = (props: Props) => (
  <IconButton
    aria-label={props.label ?? "back"}
    variant="outline"
    onClick={props.onClick}
    icon={<Icon as={FaArrowUp} color="gray.600" />}
  />
);
