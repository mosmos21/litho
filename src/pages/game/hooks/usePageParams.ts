import { useParams } from "react-router-dom";
import { z } from "zod";

const pathSchema = z.object({
  gameId: z.string(),
});

export const usePageParams = () => {
  const params = useParams<{ gameId: string }>();
  const path = pathSchema.safeParse(params);
  if (!path.success) {
    throw new Error("invalid path");
  }

  return {
    gameId: path.data.gameId,
  };
};
