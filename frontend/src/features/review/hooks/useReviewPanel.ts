import { useProductLookup } from "#hooks/useProductLookup";
import { getSelectedLines } from "#lib/selectors";
import { useBundleStore } from "#store/useBundleStore";
import { useMemo } from "react";


export function useReviewPanel() {
  const quantities = useBundleStore((state) => state.quantities);
  const { productLookup } = useProductLookup();
  const lines = useMemo(
    () => getSelectedLines(quantities, productLookup),
    [quantities, productLookup],
  );

  return {
    hasSelectedLines: lines.length > 0,
  };
}
