import { useContext } from "react";
import { PlayerContext } from "@/providers/PlayerProvider/context";

export const usePlayerContext = () => useContext(PlayerContext);
