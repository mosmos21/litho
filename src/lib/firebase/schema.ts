import { z } from "zod";

const playerName = z.string().regex(/^[a-zA-Z0-9]{1,32}$/);

export const waitingGameListItemSchema = z.object({
  playerName,
});

export type WaitingGameListItem = z.infer<typeof waitingGameListItemSchema>;

export const waitingGameListSchema = z.record(
  z.string(),
  waitingGameListItemSchema
);

export type WaitingGameList = z.infer<typeof waitingGameListSchema>;

const playGameSchema = z.object({
  startedAt: z.string(),
  turn: z.object({
    Black: playerName,
    White: playerName,
  }),
  gameRecords: z.record(z.string().regex(/^[0-9]+$/), z.string()),
});

const gameResultSchema = z.object({
  finishedAt: z.string(),
  winner: z.union([z.literal("Black"), z.literal("White")]),
});

export const initialGameSchema = z.object({
  status: z.literal("initial"),
});

export type InitialGame = z.infer<typeof initialGameSchema>;

export const waitingGameSchema = z.object({
  status: z.literal("waiting"),
  author: z.string(),
  players: z.record(z.string(), playerName),
});

export type WaitingGame = z.infer<typeof waitingGameSchema>;

export const ongoingGameSchema = z
  .object({
    status: z.literal("ongoing"),
  })
  .merge(playGameSchema);

export type OngoingGame = z.infer<typeof ongoingGameSchema>;

export const canceledGameSchema = z
  .object({
    status: z.literal("canceled"),
  })
  .merge(playGameSchema);

export type CanceledGame = z.infer<typeof canceledGameSchema>;

export const finishedGameSchema = z
  .object({
    status: z.literal("finished"),
  })
  .merge(playGameSchema)
  .merge(gameResultSchema);

export type FinishedGame = z.infer<typeof finishedGameSchema>;

export const gameSchema = z.union([
  initialGameSchema,
  waitingGameSchema,
  ongoingGameSchema,
  canceledGameSchema,
  finishedGameSchema,
]);

export type Game = z.infer<typeof gameSchema>;
