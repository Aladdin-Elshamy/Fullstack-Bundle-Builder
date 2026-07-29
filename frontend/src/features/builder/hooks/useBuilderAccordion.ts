import { useState } from "react";
import { ACCORDION_SECTIONS } from "../constants";

export function useBuilderAccordion() {
  const [openItems, setOpenItems] = useState<string[] | undefined>(["cameras"]);

  const handleNext = (currentIndex: number) => {
    const nextSection = ACCORDION_SECTIONS[currentIndex + 1]?.value;

    if (!nextSection) {
      return;
    }

    setOpenItems([nextSection]);
  };

  return {
    openItems,
    setOpenItems,
    handleNext,
  };
}
