import { ChangeEvent, useCallback, useState, useMemo } from "react";
import { useRoomPreparation } from "@/pages/top/hooks/useRoomPreparation";
import { usePlayersPlayerIdMutation } from "@/api";
import { useNavigate } from "react-router-dom";
import { Player } from "@/lib/firebase/schema";
import { usePlayerContext } from "@/providers/PlayerProvider";
import { playerNameSchema } from "@/lib/firebase/schema";

export const useStartGame = () => {
  const { player: currentPlayer } = usePlayerContext();
  const [playerName, setPlayerName] = useState(currentPlayer.name);
  const isInvalidPlayerName = useMemo(
    () => !playerNameSchema.safeParse(playerName).success,
    [playerName]
  );
  const [roomId, setRoomId] = useState<string | undefined>();
  const { waitingRooms, createRoom } = useRoomPreparation();
  const { setPlayer } = usePlayersPlayerIdMutation();

  const navigate = useNavigate();

  const handleChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
  }, []);

  const handleClickStart = useCallback(() => {
    const player: Player = {
      id: currentPlayer.id,
      name: playerName,
    };
    setPlayer(player)
      .then(() => createRoom(player))
      .then((roomId) => {
        navigate(`/g/${roomId}`);
      });
  }, [createRoom, playerName, setPlayer, navigate, currentPlayer]);

  const handleClickJoin = useCallback(() => {
    const player = {
      id: currentPlayer.id,
      name: playerName,
    };
    setPlayer(player).then(() => navigate(`/g/${roomId}`));
  }, [roomId, navigate, playerName, setPlayer, currentPlayer]);

  return {
    playerName,
    isInvalidPlayerName,
    waitingRooms,
    onSelectRoomId: setRoomId,
    onChangeName: handleChangeName,
    onClickStart: handleClickStart,
    onClickJoin: handleClickJoin,
  };
};
