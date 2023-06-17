import { useCallback, useState } from "react";
import { Litho, LithoState } from "@/lib/litho/system/types";
import { buildLitho } from "@/lib/litho/system";
import { Action } from "@/types/litho";

export const useLitho = () => {
  const [litho, setLitho] = useState<Litho>(buildLitho());

  const handleAction = useCallback((action: Action) => {
    setLitho((litho) => litho.action(action));
  }, []);

  return {
    litho: litho satisfies LithoState,
    onAction: handleAction,
  };
};
