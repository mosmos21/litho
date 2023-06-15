import { z } from "zod";

const roomId = z.string();

export type RoomId = z.infer<typeof roomId>;

const playerName = z.string().regex(/^[a-zA-Z0-9]{1,32}$/);

/**
 * 待機中の部屋の情報
 */
export const waitingRoomSchema = z.object({
  roomId,
  playerName,
});

export type WaitingRoom = z.infer<typeof waitingRoomSchema>;

/**
 * 待機中の部屋のリスト
 */
export const waitingRoomsSchema = z.record(z.string(), waitingRoomSchema);

export type WaitingRooms = z.infer<typeof waitingRoomsSchema>;

/**
 * ゲームの共通情報
 */
const baseGameSchema = z.object({
  roomId,
});

/**
 * ゲームの棋譜
 */
export const gameRecordSchema = z.string();

export type GameRecord = z.infer<typeof gameRecordSchema>;

export const gameRecordsSchema = gameRecordSchema.array();

/**
 * 進行中のゲームの情報
 */
const playGameSchema = z.object({
  startedAt: z.string(),
  turn: z.object({
    Black: playerName,
    White: playerName,
  }),
  gameRecords: gameRecordsSchema.optional(),
});

/**
 * 終了したゲームの情報
 */
const gameResultSchema = z.object({
  finishedAt: z.string(),
  winner: z.union([z.literal("Black"), z.literal("White")]),
});

/**
 * 初期化されたゲームの情報
 */
export const initialGameSchema = z
  .object({
    status: z.literal("initial"),
  })
  .merge(baseGameSchema);

export type InitialGame = z.infer<typeof initialGameSchema>;

/**
 * プレイヤーを待機中またはゲーム準備中のゲームの情報
 */
export const waitingGameSchema = z
  .object({
    status: z.literal("waiting"),
    author: z.string(),
    players: z.record(z.string(), playerName),
  })
  .merge(baseGameSchema);

export type WaitingGame = z.infer<typeof waitingGameSchema>;

/**
 * ゲームが進行中のゲームの情報
 */
export const ongoingGameSchema = z
  .object({
    status: z.literal("ongoing"),
  })
  .merge(baseGameSchema)
  .merge(playGameSchema);

export type OngoingGame = z.infer<typeof ongoingGameSchema>;

/**
 * ゲームが中断されたゲームの情報
 */
export const canceledGameSchema = z
  .object({
    status: z.literal("canceled"),
  })
  .merge(baseGameSchema)
  .merge(playGameSchema);

export type CanceledGame = z.infer<typeof canceledGameSchema>;

/**
 * 決着がついたゲームの情報
 */
export const finishedGameSchema = z
  .object({
    status: z.literal("finished"),
  })
  .merge(baseGameSchema)
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
