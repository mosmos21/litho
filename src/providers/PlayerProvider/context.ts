import { createContext, Dispatch, SetStateAction } from "react";
import { randomString } from "@/utils/string.ts";

export type Player = {
  name: string;
};

type Context = {
  player: Player;
  setPlayer: Dispatch<SetStateAction<Player>>;
};

export const PlayerContext = createContext<Context>({
  player: {
    name: randomString(6),
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setPlayer: () => {},
});
