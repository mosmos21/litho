import { ChangeEvent, useCallback, useState } from "react";
import { useRoomPreparation } from "@/pages/top/hooks/useRoomPreparation.ts";
import { usePlayerContext } from "@/providers/PlayerProvider";
import { useNavigate } from "react-router-dom";

export const useStartGame = () => {
  const [playerName, setPlayerName] = useState("");
  const [roomId, setRoomId] = useState<string | undefined>();
  const { waitingRooms, createRoom } = useRoomPreparation();
  const { setPlayer } = usePlayerContext();
  const navigate = useNavigate();

  const handleChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
  }, []);

  const handleClickStart = useCallback(() => {
    createRoom(playerName).then((roomId) => {
      setPlayer({ name: playerName });
      navigate(`/g/${roomId}`);
    });
  }, [createRoom, playerName, setPlayer, navigate]);

  const handleClickJoin = useCallback(() => {
    setPlayer({ name: playerName });
    navigate(`/g/${roomId}`);
  }, [roomId, navigate, playerName, setPlayer]);

  return {
    playerName,
    waitingRooms,
    onSelectRoomId: setRoomId,
    onChangeName: handleChangeName,
    onClickStart: handleClickStart,
    onClickJoin: handleClickJoin,
  };
};
