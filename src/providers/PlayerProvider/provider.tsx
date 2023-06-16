import { PlayerContext } from "@/providers/PlayerProvider/context";
import { ReactNode } from "react";
import { usePlayersPlayerIdQuery } from "@/api/playersPlayerId/usePlayersPlayerIdQuery";
import { useAuthContext } from "@/providers/AuthProvider";

const DEFAULT_PLAYER_NAME = "anonymous";

export const PlayerProvider = (props: { children: ReactNode }) => {
  const { currentUser } = useAuthContext();
  const { player = { id: currentUser.uid, name: DEFAULT_PLAYER_NAME } } =
    usePlayersPlayerIdQuery(currentUser.uid);

  return (
    <PlayerContext.Provider value={{ player }}>
      {props.children}
    </PlayerContext.Provider>
  );
};
