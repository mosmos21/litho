import { useState, useCallback } from "react";
import { useObserveResize } from "@/hooks/useObserveResize";

export const useElementSize = (maxSize?: number) => {
  const [size, setSize] = useState(maxSize ?? 0);

  const onResize = useCallback(
    (ele: HTMLDivElement) => {
      const size = Math.min(ele.getBoundingClientRect().width);
      setSize(maxSize ? Math.min(size, maxSize) : size);
    },
    [maxSize]
  );

  const ref = useObserveResize<HTMLDivElement>(onResize);

  return [size, ref] as const;
};
