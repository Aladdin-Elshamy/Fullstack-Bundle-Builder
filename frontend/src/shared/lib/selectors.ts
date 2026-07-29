import type { BundleLine, BundleTotals, Product, ProductLookup } from "../types";


export const getProductById = (products: ProductLookup, productId: string) =>
  products[productId];

export const getVariant = (product: Product, variantName?: string) =>
  product.options?.find((option) => option.variant_name === variantName);

export const getLineKey = (product: Product, variantName?: string) =>
  product.options?.length && variantName
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

export const getMaxProductQuantity = (product: Product) => {
  if (product.required) {
    return 1;
  }

  if (product.category === "plan") {
    return 1;
  }

  return Math.max(0, product.quantity);
};

export const canIncrementProductQuantity = (
  product: Product,
  currentQuantity: number,
) => currentQuantity < getMaxProductQuantity(product);

export const getSelectedLines = (
  quantities: Record<string, number>,
  products: ProductLookup,
): BundleLine[] => {
  const lines: BundleLine[] = [];

  Object.entries(quantities).forEach(([key, quantity]) => {
    if (quantity <= 0) {
      return;
    }

    const [productId, variantName] = key.split("::");
    const product = getProductById(products, productId);

    if (!product || product.required) {
      return;
    }

    const variant = getVariant(product, variantName);

    lines.push({
      key,
      product,
      quantity,
      variantName,
      variantValue: variant?.color_value,
      variantImage: variant?.image,
    });
  });

  Object.values(products)
    .filter((product) => product.required)
    .forEach((product) => {
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
  products: ProductLookup,
  category: Product["category"],
) => {
  return getSelectedLines(quantities, products).filter(
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
          monthlyCompareAtTotal:
            totals.monthlyCompareAtTotal + compareAtLineTotal,
          monthlySavings: totals.monthlySavings + (compareAtLineTotal - lineTotal),
        };
      }

      return {
        total: totals.total + lineTotal,
        compareAtTotal: totals.compareAtTotal + compareAtLineTotal,
        savings: totals.savings + (compareAtLineTotal - lineTotal),
        monthlyTotal: totals.monthlyTotal,
        monthlyCompareAtTotal: totals.monthlyCompareAtTotal,
        monthlySavings: totals.monthlySavings,
      };
    },
    {
      total: 0,
      compareAtTotal: 0,
      savings: 0,
      monthlyTotal: 0,
      monthlyCompareAtTotal: 0,
      monthlySavings: 0,
    },
  );
};