import { Action, Coord, PieceColor, PlaceableTile } from "@/types/ritho";
import { Ritho, RawRithoState } from "@/lib/ritho/system/types";
import { INITIAL_ACTION_COUNT } from "@/constants/ritho";
import { TILE_GRID_BORDER_BORDER_CELL_COUNT } from "@/constants";
import { sameCoord } from "@/utils/coord.ts";

/**
 * 次のターンのプレイヤーを返す
 */
const nextTurn = (current: PieceColor) =>
  current === "Black" ? "White" : "Black";

/**
 * アクションを消費する、アクションがなくなったらターンを切り替える
 */
const consumeActionCount = (
  turn: PieceColor,
  count: number
): Pick<RawRithoState, "turn" | "restActionCount"> =>
  count === 1
    ? { turn: nextTurn(turn), restActionCount: INITIAL_ACTION_COUNT }
    : { turn, restActionCount: count - 1 };

const placeTileAction = (
  state: RawRithoState,
  tile: PlaceableTile,
  coord: Coord
): RawRithoState => {
  if (state.tileGrid.hasTile(coord)) {
    return state;
  }
  if (!state.tileGrid.canPlaceTile(coord)) {
    return state;
  }

  let nextState = {
    ...state,
    tileGrid: state.tileGrid.set(coord, tile),
    restTileCount: {
      ...state.restTileCount,
      [tile]: state.restTileCount[tile] - 1,
    },
  };

  // NOTE: 一枚目のタイルを置く時は今のアクションを継続するので記録だけ残す
  // すでにタイルを置いているアクションの時はアクションを消費する
  if (state.currentActions.length === 0) {
    nextState.currentActions = [{ type: "PlaceTile", tile, coord }];
  } else {
    nextState = {
      ...nextState,
      ...consumeActionCount(state.turn, state.restActionCount),
      currentActions: [],
      prevActions: [
        ...state.currentActions,
        { type: "PlaceTile", tile, coord },
      ],
    };
  }

  return nextState;
};

const movePieceAction = (
  state: RawRithoState,
  from: Coord,
  to: Coord
): RawRithoState => {
  // NOTE: タイルを置いている途中の場合は駒を動かせない
  if (state.currentActions.length > 0) return state;

  if (sameCoord(from, to)) return state;
  if (!state.pieceGrid.canMovePiece(state.tileGrid, from, to)) return state;

  const fromPiece = state.pieceGrid.get(from);
  if (!fromPiece || fromPiece.color !== state.turn) return state;

  // NOTE: 同じ駒は連続で動かすことができない
  const prevAction = state.prevActions[0];
  if (prevAction.type === "MovePiece" && sameCoord(prevAction.to, from))
    return state;

  const nextState = {
    ...state,
    ...consumeActionCount(state.turn, state.restActionCount),
    pieceGrid: state.pieceGrid.move(from, to),
    currentActions: [],
    prevActions: [{ type: "MovePiece", from, to } satisfies Action],
  };

  const toPiece = state.pieceGrid.get(to);
  if (toPiece?.type === "King") {
    nextState.winner = state.turn;
  }

  return nextState;
};

const doAction =
  (state: RawRithoState) =>
  (action: Action): Ritho => {
    switch (action.type) {
      case "PlaceTile":
        return build(placeTileAction(state, action.tile, action.coord));
      case "MovePiece":
        return build(movePieceAction(state, action.from, action.to));
    }
    return build(state);
  };

export const build = (state: RawRithoState): Ritho => ({
  turn: state.turn,
  restActionCount: state.restActionCount,
  restTileCount: state.restTileCount,
  winner: state.winner,
  pieceCell: state.pieceGrid.toArray(),
  currentActions: [],
  prevActions: [],
  tileCell: state.tileGrid.toArray(TILE_GRID_BORDER_BORDER_CELL_COUNT),
  action: doAction(state),
});
