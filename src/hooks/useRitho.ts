import { useState } from "react";
import { Ritho, RithoState } from "@/lib/ritho/system/types";
import { buildRitho } from "@/lib/ritho/system";

type Context = {
  ritho: RithoState;
};
export const useRitho = (): Context => {
  const [ritho] = useState<Ritho>(buildRitho());

  return {
    ritho,
  };
};
