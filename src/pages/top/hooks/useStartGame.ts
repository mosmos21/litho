import { ChangeEvent, useCallback, useState } from "react";
import { useRoomPreparation } from "@/pages/top/hooks/useRoomPreparation";
import { usePlayersPlayerIdMutation } from "@/api";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/providers/AuthProvider";
import { Player } from "@/lib/firebase/schema.ts";

export const useStartGame = () => {
  const [playerName, setPlayerName] = useState("");
  const [roomId, setRoomId] = useState<string | undefined>();
  const { waitingRooms, createRoom } = useRoomPreparation();
  const { setPlayer } = usePlayersPlayerIdMutation();
  const { currentUser } = useAuthContext();

  const navigate = useNavigate();

  const handleChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
  }, []);

  const handleClickStart = useCallback(() => {
    const player: Player = {
      id: currentUser.uid,
      name: playerName,
    };
    setPlayer(player)
      .then(() => createRoom(player))
      .then((roomId) => {
        navigate(`/g/${roomId}`);
      });
  }, [createRoom, playerName, setPlayer, navigate, currentUser]);

  const handleClickJoin = useCallback(() => {
    const player = {
      id: currentUser.uid,
      name: playerName,
    };
    setPlayer(player).then(() => navigate(`/g/${roomId}`));
  }, [roomId, navigate, playerName, setPlayer, currentUser]);

  return {
    playerName,
    waitingRooms,
    onSelectRoomId: setRoomId,
    onChangeName: handleChangeName,
    onClickStart: handleClickStart,
    onClickJoin: handleClickJoin,
  };
};
