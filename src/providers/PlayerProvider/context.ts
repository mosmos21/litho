import { Player } from "@/lib/firebase/schema";
import { createContext } from "react";

type Context = {
  player: Player;
};

export const PlayerContext = createContext<Context>({
  player: {
    id: "",
    name: "",
  },
});
