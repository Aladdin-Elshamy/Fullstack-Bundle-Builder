import { useMemo } from "react";
import type { CategoryProductType } from "../types";
import { useBundleStore } from "#store/useBundleStore";
import { useProductLookup } from "#hooks/useProductLookup";
import { getSelectedLines } from "#lib/selectors";
import type { BundleLine } from "#types/index";

const categoryByProductType = {
  Cameras: "camera",
  Sensors: "sensor",
  Accessories: "accessory",
  Plan: "plan",
} as const;

export function useChosenProducts(productType?: CategoryProductType) {
  const quantities = useBundleStore((state) => state.quantities);
  const { productLookup } = useProductLookup();
  const lines = useMemo(
    () => getSelectedLines(quantities, productLookup),
    [quantities, productLookup],
  );
  const filteredLines = useMemo(
    () =>
      productType
        ? lines.filter(
            (line: BundleLine) =>
              line.product.category === categoryByProductType[productType],
          )
        : [],
    [lines, productType],
  );

  return {
    filteredLines,
    hasProducts: Boolean(productType && filteredLines.length > 0),
  };
}
