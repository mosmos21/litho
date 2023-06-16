import { Action, Coord, PieceColor, PlaceableTile } from "@/types/ritho";
import { Ritho, RawRithoState } from "@/lib/ritho/system/types";
import { INITIAL_ACTION_COUNT } from "@/constants/ritho";
import { TILE_GRID_BORDER_BORDER_CELL_COUNT } from "@/constants";

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

  // NOTE: タイルは2枚置けるので一枚目の時はアクションの途中であることを記録する
  // すでにタイルを置いているアクションの時はアクションを消費する
  if (state.currentAction) {
    nextState = {
      ...nextState,
      currentAction: undefined,
      ...consumeActionCount(state.turn, state.restActionCount),
    };
  } else {
    nextState.currentAction = "PlaceTile";
  }

  return nextState;
};

const movePieceAction = (
  state: RawRithoState,
  from: Coord,
  to: Coord
): RawRithoState => {
  // NOTE: タイルを置いている途中の場合は駒を動かせない
  if (state.currentAction) {
    return state;
  }
  if (from.x === to.x && from.y === to.y) {
    return state;
  }
  if (!state.pieceGrid.canMovePiece(state.tileGrid, from, to)) {
    return state;
  }
  const fromPiece = state.pieceGrid.get(from);
  const toPiece = state.pieceGrid.get(to);
  if (!toPiece || !fromPiece || fromPiece.color !== state.turn) {
    return state;
  }

  const nextState = {
    ...state,
    ...consumeActionCount(state.turn, state.restActionCount),
    pieceGrid: state.pieceGrid.move(from, to),
  };

  if (toPiece.type === "King") {
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
  pieceCell: state.pieceGrid.toArray(),
  tileCell: state.tileGrid.toArray(TILE_GRID_BORDER_BORDER_CELL_COUNT),
  restTileCount: state.restTileCount,
  winner: state.winner,
  action: doAction(state),
});
