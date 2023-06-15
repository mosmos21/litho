import { ChangeEvent, useCallback, useState } from "react";
import { useGamePreparation } from "@/pages/top/hooks/useGamePreparation";
import { usePlayerContext } from "@/providers/PlayerProvider";
import { useNavigate } from "react-router-dom";

export const useStartGame = () => {
  const [playerName, setPlayerName] = useState("");
  const [gameId, setGameId] = useState<string | undefined>();
  const { waitingGames, createGame } = useGamePreparation();
  const { setPlayer } = usePlayerContext();
  const navigate = useNavigate();

  const handleChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
  }, []);

  const handleClickStart = useCallback(() => {
    createGame(playerName).then((gameId) => {
      setPlayer({ name: playerName });
      navigate(`/g/${gameId}`);
    });
  }, [createGame, playerName, setPlayer, navigate]);

  const handleClickJoin = useCallback(() => {
    setPlayer({ name: playerName });
    navigate(`/g/${gameId}`);
  }, [gameId, navigate, playerName, setPlayer]);

  return {
    playerName,
    waitingGames,
    onSelectGameId: setGameId,
    onChangeName: handleChangeName,
    onClickStart: handleClickStart,
    onClickJoin: handleClickJoin,
  };
};
