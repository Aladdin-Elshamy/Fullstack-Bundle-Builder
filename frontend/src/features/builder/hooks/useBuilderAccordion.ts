import { useState } from "react";
import { ACCORDION_SECTIONS } from "../constants";

export function useBuilderAccordion() {
  const [openItems, setOpenItems] = useState<string[] | undefined>(["cameras"]);

  const handleNext = (
    currentIndex: number,
    scrollTarget?: HTMLElement | null,
  ) => {
    const nextSection = ACCORDION_SECTIONS[currentIndex + 1]?.value;

    if (!nextSection) {
      return;
    }

    setOpenItems([nextSection]);

    if (scrollTarget) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          scrollTarget.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        });
      });
    }
  };

  return {
    openItems,
    setOpenItems,
    handleNext,
  };
}
