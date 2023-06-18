import { useCallback, useState } from "react";
import { Litho, LithoState } from "@/lib/litho/system/types";
import { buildLitho } from "@/lib/litho/system";
import { Action } from "@/types/litho";

export const useLitho = () => {
  const [litho, setLitho] = useState<Litho>(buildLitho());

  const handleAction = useCallback((...actions: Action[]) => {
    setLitho((litho) =>
      actions.reduce((acc, action) => acc.action(action), litho)
    );
  }, []);

  const handleUndoAction = useCallback(() => {
    setLitho((litho) => litho.undoAction());
  }, []);

  const handleReset = useCallback(() => {
    setLitho(buildLitho());
  }, []);

  return {
    litho: litho satisfies LithoState,
    onAction: handleAction,
    onUndoAction: handleUndoAction,
    onReset: handleReset,
  };
};

export type UseLithoReturnType = ReturnType<typeof useLitho>;
