import type { BundleLine } from "#types/index";

export type CategoryProductType = "Cameras" | "Sensors" | "Accessories" | "Plan";

export interface ChosenProductsProps {
  productType?: CategoryProductType;
};

export interface ChosenProductProps {
  line: BundleLine;
};
