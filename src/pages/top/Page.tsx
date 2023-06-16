import { chakra, Text, Flex, Button, Box, Divider } from "@chakra-ui/react";
import { BasicLayout } from "@/layouts/BasicLayout";
import { useStartGame } from "@/pages/top/hooks/useStartGame.ts";
import { Div } from "@/components/motion";
import { PlayerNameInput } from "@/components/PlayerNameInput";
import { WaitingRoomSelect } from "@/components/WaitingRoomSelect.tsx";
import { useMenuStep } from "@/pages/top/hooks/useMenuStep";
import { useCallback } from "react";

export const TopPage = () => {
  const { getMenuMotionProps, openMenu, closeMenu } = useMenuStep();
  const {
    waitingRooms,
    playerName,
    isInvalidPlayerName,
    onChangeName,
    onClickStart,
    onSelectRoomId,
    onClickJoin,
  } = useStartGame();

  const handleSelectRoom = useCallback(
    (roomId: string) => {
      onSelectRoomId(roomId);
      openMenu("JoinGameNameInput");
    },
    [onSelectRoomId, openMenu]
  );

  return (
    <BasicLayout>
      <Box
        margin="12px"
        height="calc(100% - 24px)"
        border="2px solid"
        borderColor="blackAlpha.700"
      >
        <_Flex height="100%" gap="60px">
          <Text fontSize="6xl">Ritho</Text>
          <_Flex gap="20px" width="300px">
            <InnerBox>
              <Motion {...getMenuMotionProps()}>
                <_Button
                  variant="outline"
                  onClick={() => openMenu("NewGameNameInput")}
                >
                  New Game
                </_Button>
              </Motion>
              <Motion {...getMenuMotionProps("NewGameNameInput")}>
                <PlayerNameInput
                  buttonLabel="Start !"
                  name={playerName}
                  isInvalid={isInvalidPlayerName}
                  onChangeName={onChangeName}
                  onClickBackButton={closeMenu}
                  onClickSubmitButton={onClickStart}
                />
              </Motion>
            </InnerBox>
            <Divider />
            <InnerBox>
              <Motion {...getMenuMotionProps()}>
                <_Button
                  variant="outline"
                  onClick={() => openMenu("JoinGameSelect")}
                >
                  Join Game
                </_Button>
              </Motion>
              <Motion {...getMenuMotionProps("JoinGameSelect")}>
                <WaitingRoomSelect
                  waitingRooms={waitingRooms}
                  onClickBackButton={closeMenu}
                  onSelectRoom={handleSelectRoom}
                />
              </Motion>
              <Motion {...getMenuMotionProps("JoinGameNameInput")}>
                <PlayerNameInput
                  buttonLabel="Join !"
                  name={playerName}
                  isInvalid={isInvalidPlayerName}
                  onChangeName={onChangeName}
                  onClickBackButton={() => openMenu("JoinGameSelect")}
                  onClickSubmitButton={onClickJoin}
                />
              </Motion>
            </InnerBox>
            <Divider />
          </_Flex>
        </_Flex>
      </Box>
    </BasicLayout>
  );
};

const _Flex = chakra(Flex, {
  baseStyle: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

const InnerBox = chakra(Flex, {
  baseStyle: {
    flexDirection: "column",
    width: "100%",
    padding: "0 5%",
  },
});

const _Button = chakra(Button, {
  baseStyle: {
    width: "100%",
  },
});

const Motion = chakra(Div, {
  baseStyle: {
    width: "100%",
    overflow: "hidden",
  },
});
