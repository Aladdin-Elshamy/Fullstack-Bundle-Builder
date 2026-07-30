import type { Product } from "#types/index";

export function useProductDisplayName(product: Product) {
  const [firstProductName = product.name, ...restProductNameParts] =
    product.name.split(" ");

  return {
    isPlan: product.category === "plan",
    productName: product.name,
    firstProductName,
    restProductName: restProductNameParts.join(" "),
  };
}