import { Game, WaitingGame } from "@/lib/firebase/schema";

export const isWaitingGame = (game: Game): game is WaitingGame =>
  game.status === "waiting";
