import { WaitingRoom } from "@/lib/firebase/schema";
import {
  chakra,
  Flex,
  List,
  ListItem,
  Text,
  Box,
  Button,
} from "@chakra-ui/react";
import { UpButton } from "@/components/UpButton.tsx";

type Props = {
  waitingRooms: WaitingRoom[];
  onClickBackButton: () => void;
  onSelectRoom: (roomId: string) => void;
};

export const WaitingRoomSelect = (props: Props) => (
  <Flex flexDirection="column" alignItems="flex-start">
    {Object.keys(props.waitingRooms).length === 0 ? (
      <Box margin="12px 0" width="100%">
        <Text textAlign="center" color="gray.800">
          no waiting game...
        </Text>
      </Box>
    ) : (
      <List width="100%">
        {props.waitingRooms.map((room) => (
          <ListItem
            key={room.roomId}
            cursor="pointer"
            textAlign="center"
            padding="4px"
            _hover={{ backgroundColor: "gray.100" }}
          >
            <_Button onClick={() => props.onSelectRoom(room.roomId)}>
              vs {room.player.name}
            </_Button>
          </ListItem>
        ))}
      </List>
    )}
    <Box marginTop="12px">
      <UpButton onClick={props.onClickBackButton} />
    </Box>
  </Flex>
);

const _Button = chakra(Button, {
  baseStyle: {
    background: "none",
    outline: "none",
    border: "none",
    padding: 0,
    margin: 0,
    height: "auto",
    _hover: {
      background: "none",
    },
  },
});
