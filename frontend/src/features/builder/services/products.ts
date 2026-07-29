import type { Product } from "../../../shared/types/components";
import type { BuilderSectionValue } from "../constants";

const productApiPathBySection = {
  cameras: "cameras",
  plan: "plans",
  sensors: "sensors",
  protection: "accessories",
} satisfies Record<BuilderSectionValue, string>;

const fetchProductsBySection = async (section: BuilderSectionValue) => {
  const response = await fetch(
    `/api/products/${productApiPathBySection[section]}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch ${section} products`);
  }

  const data = (await response.json()) as { products: Product[] };

  return data.products;
};

export { fetchProductsBySection };