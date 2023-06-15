import { WaitingGameList } from "@/lib/firebase/schema";
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
  waitingGames: WaitingGameList;
  onClickBackButton: () => void;
  onSelectGame: (gameId: string) => void;
};

export const WaitingGameSelect = (props: Props) => (
  <Flex flexDirection="column" alignItems="flex-start">
    {Object.keys(props.waitingGames).length === 0 ? (
      <Box margin="12px 0" width="100%">
        <Text textAlign="center" color="gray.800">
          no waiting game...
        </Text>
      </Box>
    ) : (
      <List width="100%">
        {Object.entries(props.waitingGames).map(([gameId, game]) => (
          <ListItem
            key={gameId}
            cursor="pointer"
            textAlign="center"
            padding="4px"
            _hover={{ backgroundColor: "gray.100" }}
          >
            <_Button onClick={() => props.onSelectGame(gameId)}>
              vs {game.playerName}
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
