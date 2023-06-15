import { PlayerContext, Player } from "@/providers/PlayerProvider/context";
import { ReactNode, useState } from "react";

export const PlayerProvider = (props: { children: ReactNode }) => {
  const [player, setPlayer] = useState<Player | undefined>();

  return (
    <PlayerContext.Provider value={{ player, setPlayer }}>
      {props.children}
    </PlayerContext.Provider>
  );
};
