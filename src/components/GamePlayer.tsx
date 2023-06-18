import {
  chakra,
  Flex,
  StyleProps,
  IconButton,
  Icon,
  Text,
} from "@chakra-ui/react";
import { UseGamePlayerReturnType } from "@/pages/game/hooks/useGamePlayer";
import {
  FaFastBackward,
  FaBackward,
  FaForward,
  FaFastForward,
} from "react-icons/fa";

type Props = UseGamePlayerReturnType & {
  style?: StyleProps;
};

export const GamePlayer = (props: Props) => (
  <Flex gap="12px" justifyContent="center">
    <_IconButton
      aria-label="fast backward"
      icon={<_Icon as={FaFastBackward} />}
      isDisabled={props.isFirst}
      onClick={() => props.onPlay("first")}
    />
    <_IconButton
      aria-label="backward"
      icon={<_Icon as={FaBackward} />}
      isDisabled={props.isFirst}
      onClick={() => props.onPlay("prev")}
    />
    <Flex
      margin="auto 24px"
      width="100px"
      justifyContent="center"
      alignItems="center"
    >
      {props.current.index > 0 && (
        <Text fontSize="sm">
          {props.current.index}. {props.current.record}
        </Text>
      )}
    </Flex>
    <_IconButton
      aria-label="forward"
      icon={<_Icon as={FaForward} />}
      isDisabled={props.isLast}
      onClick={() => props.onPlay("next")}
    />
    <_IconButton
      aria-label="fast forward"
      icon={<_Icon as={FaFastForward} />}
      isDisabled={props.isLast}
      onClick={() => props.onPlay("last")}
    />
  </Flex>
);

const _IconButton = chakra(IconButton, {
  baseStyle: {
    background: "none",
  },
});

const _Icon = chakra(Icon, {
  baseStyle: {
    size: "24px",
  },
});
