import { useParams } from "react-router-dom";
import { z } from "zod";

const pathSchema = z.object({
  roomId: z.string(),
});

export const usePageParams = () => {
  const params = useParams<{ roomId: string }>();
  const path = pathSchema.safeParse(params);
  if (!path.success) {
    throw new Error("invalid path");
  }

  return {
    roomId: path.data.roomId,
  };
};
