import { Game, GameRecord } from "@/lib/firebase/schema";
import { useState, useEffect, useCallback } from "react";
import { isFinishedGame } from "@/utils/game";
import { decodeAction } from "@/lib/litho/gameRecord.ts";
import { UseLithoReturnType } from "@/pages/game/hooks/useLitho";

type PlayTo = "first" | "prev" | "next" | "last";

type Props = Omit<UseLithoReturnType, "litho"> & {
  game: Game;
  gameRecords: GameRecord[];
};
export const useGamePlayer = (props: Props) => {
  const [currentGameRecordNumber, setCurrentGameRecordNumber] =
    useState<number>(0);

  const onPlay = useCallback(
    (to: PlayTo) => {
      switch (to) {
        case "first":
          setCurrentGameRecordNumber(0);
          props.onReset();
          break;
        case "prev":
          setCurrentGameRecordNumber((prev) => prev - 1);
          props.onUndoAction();
          break;
        case "next":
          props.onAction(
            decodeAction(props.gameRecords[currentGameRecordNumber])
          );
          setCurrentGameRecordNumber((prev) => prev + 1);
          break;
        case "last":
          props.onAction(
            ...props.gameRecords
              .slice(currentGameRecordNumber)
              .map(decodeAction)
          );
          setCurrentGameRecordNumber(props.gameRecords.length);
      }
    },
    [props, currentGameRecordNumber]
  );

  useEffect(() => {
    if (isFinishedGame(props.game)) {
      setCurrentGameRecordNumber(props.gameRecords.length);
    }
  }, [props.game, props.gameRecords]);

  return {
    onPlay,
    current: {
      index: currentGameRecordNumber,
      record: props.gameRecords[currentGameRecordNumber - 1],
    },
    isLast: currentGameRecordNumber === props.gameRecords.length,
    isFirst: currentGameRecordNumber === 0,
  };
};

export type UseGamePlayerReturnType = ReturnType<typeof useGamePlayer>;
