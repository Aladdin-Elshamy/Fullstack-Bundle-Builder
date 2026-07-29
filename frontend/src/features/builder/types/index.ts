import type { Product } from "#types/index";
import type { ACCORDION_SECTIONS } from "../constants";

export type ProductCardProps = {
  product: Product;
  isLastAndOdd: boolean;
  exclusiveProductIds?: string[];
};

export type LoadingProductCardProps = {
  isLastAndOdd?: boolean;
};

export type AccordionProductsSectionProps = {
  section: BuilderSectionValue;
  step: number;
  isOpen: boolean;
  onNext: () => void;
};

export type ProductsProps = {
  step: number;
  products: Product[];
  onNext?: () => void;
};

export type BuilderSectionValue = (typeof ACCORDION_SECTIONS)[number]["value"];