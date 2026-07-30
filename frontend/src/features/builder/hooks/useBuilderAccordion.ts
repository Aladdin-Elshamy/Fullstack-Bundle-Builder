import { useEffect, useRef, useState } from "react";
import { ACCORDION_SECTIONS } from "../constants";
import type { BuilderSectionValue } from "../types";

export function useBuilderAccordion() {
  const [openItems, setOpenItems] = useState<string[] | undefined>(["cameras"]);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [pendingScrollSection, setPendingScrollSection] =
    useState<BuilderSectionValue | null>(null);

  const handleNext = (currentIndex: number) => {
    const nextSection = ACCORDION_SECTIONS[currentIndex + 1]?.value;

    if (!nextSection) {
      return;
    }

    setOpenItems([nextSection]);
    setPendingScrollSection(nextSection);
  };

  const clearPendingScrollSection = () => {
    setPendingScrollSection(null);
  };

    useEffect(() => {
    if (!pendingScrollSection) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const target = sectionRefs.current[pendingScrollSection];

      if (!target) {
        clearPendingScrollSection();
        return;
      }
      target.scrollIntoView({behavior: "smooth"})

      clearPendingScrollSection();
    }, 150);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [clearPendingScrollSection, pendingScrollSection]);

  return {
    openItems,
    setOpenItems,
    handleNext,
    sectionRefs
  };
}
