import {
  accessoryProducts,
  camera,
  planProducts,
  sensorProducts,
} from "../../features/builder/constants";
import type { Product } from "../types/components";

export type BundleLine = {
  key: string;
  product: Product;
  quantity: number;
  variantName?: string;
  variantValue?: string;
  variantImage?: string;
  required?: boolean;
};

export type BundleTotals = {
  total: number;
  compareAtTotal: number;
  savings: number;
  monthlyTotal: number;
};

export const allProducts = [
  ...camera,
  ...sensorProducts,
  ...accessoryProducts,
  ...planProducts,
];

export const requiredProducts = allProducts.filter(
  (product) => product.required,
);

export const getProductById = (productId: string) =>
  allProducts.find((product) => product.id === productId);

export const getVariant = (product: Product, variantName?: string) =>
  product.colors?.find((color) => color.name === variantName);

export const getLineKey = (product: Product, variantName?: string) =>
  product.colors?.length && variantName
    ? `${product.id}::${variantName}`
    : product.id;

export const getQuantity = (
  quantities: Record<string, number>,
  product: Product,
  variantName?: string,
) => {
  if (product.required) {
    return 1;
  }

  return quantities[getLineKey(product, variantName)] ?? 0;
};

export const getDefaultQuantities = () => {
  const quantities: Record<string, number> = {};

  allProducts.forEach((product) => {
    if (product.required || product.quantity <= 0) {
      return;
    }

    quantities[getLineKey(product, product.colors?.[0]?.name)] =
      product.category === "plan" ? 1 : product.quantity;
  });

  return quantities;
};

export const getSelectedLines = (
  quantities: Record<string, number>,
): BundleLine[] => {
  const lines: BundleLine[] = [];

  Object.entries(quantities).forEach(([key, quantity]) => {
    if (quantity <= 0) {
      return;
    }

    const [productId, variantName] = key.split("::");
    const product = getProductById(productId);

    if (!product || product.required) {
      return;
    }

    const variant = getVariant(product, variantName);

    lines.push({
      key,
      product,
      quantity,
      variantName,
      variantValue: variant?.value,
      variantImage: variant?.image,
    });
  });

  requiredProducts.forEach((product) => {
    if (lines.some((line) => line.product.category === product.category)) {
      lines.push({
        key: product.id,
        product,
        quantity: 1,
        required: true,
      });
    }
  });

  return lines;
};

export const getSelectedCountByCategory = (
  quantities: Record<string, number>,
  category: Product["category"],
) => {
  return getSelectedLines(quantities).filter(
    (line) => !line.required && line.product.category === category,
  ).length;
};

export const getTotals = (lines: BundleLine[]): BundleTotals => {
  return lines.reduce(
    (totals, line) => {
      const lineTotal = line.product.price * line.quantity;
      const compareAtPrice = line.product.originalPrice ?? line.product.price;
      const compareAtLineTotal = compareAtPrice * line.quantity;

      if (line.product.category === "plan") {
        return {
          ...totals,
          monthlyTotal: totals.monthlyTotal + lineTotal,
        };
      }

      return {
        total: totals.total + lineTotal,
        compareAtTotal: totals.compareAtTotal + compareAtLineTotal,
        savings: totals.savings + (compareAtLineTotal - lineTotal),
        monthlyTotal: totals.monthlyTotal,
      };
    },
    {
      total: 0,
      compareAtTotal: 0,
      savings: 0,
      monthlyTotal: 0,
    },
  );
};
