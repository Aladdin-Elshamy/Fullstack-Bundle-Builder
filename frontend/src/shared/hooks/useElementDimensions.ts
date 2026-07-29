import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useEventListener } from "./useEventListener";

const useElementDimensions = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState<DOMRect | null>(null);

  const refresh = useCallback(() => {
    const domRect = ref.current?.getBoundingClientRect();

    if (domRect) {
      setDimensions(domRect);
    }
  }, []);

  useLayoutEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const animationFrame = window.requestAnimationFrame(refresh);
    const resizeObserver = new ResizeObserver(refresh);

    resizeObserver.observe(element);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
    };
  }, [refresh]);

  useEventListener("resize", refresh);

  return { dimensions, ref, refresh };
};

export default useElementDimensions;
