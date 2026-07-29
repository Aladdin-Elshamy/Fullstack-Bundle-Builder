import { useEffect } from "react";

export const useEventListener = <K extends keyof WindowEventMap>(
  event: K,
  listener: (event: WindowEventMap[K]) => void,
  useCapture?: boolean | AddEventListenerOptions,
) => {
  useEffect(() => {
    if (listener) {
      window.addEventListener(event, listener as EventListener, useCapture);

      return () =>
        window.removeEventListener(event, listener as EventListener, useCapture);
    }

    return () => {};
  }, [event, listener, useCapture]);
};