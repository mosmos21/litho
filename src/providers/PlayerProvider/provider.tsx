import { PlayerContext, Player } from "@/providers/PlayerProvider/context";
import { ReactNode, useState } from "react";
import { randomString } from "@/utils/string.ts";

export const PlayerProvider = (props: { children: ReactNode }) => {
  const [player, setPlayer] = useState<Player>({
    name: randomString(6),
  });

  return (
    <PlayerContext.Provider value={{ player, setPlayer }}>
      {props.children}
    </PlayerContext.Provider>
  );
};
