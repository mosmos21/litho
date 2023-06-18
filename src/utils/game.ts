import {
  Game,
  WaitingGame,
  OngoingGame,
  FinishedGame,
} from "@/lib/firebase/schema";

export const isWaitingGame = (game: Game): game is WaitingGame =>
  game.status === "waiting";

export const isOngoingGame = (game: Game): game is OngoingGame =>
  game.status === "ongoing";

export const isFinishedGame = (game: Game): game is FinishedGame =>
  game.status === "finished";
