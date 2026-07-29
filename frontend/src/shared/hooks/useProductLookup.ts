import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { ACCORDION_SECTIONS } from "../../features/builder/constants";
import { fetchProductsBySection } from "../../features/builder/services/products";
import type { Product, ProductLookup } from "#types/index";

export function useProductLookup() {

  const productQueries = useQueries({
    queries: ACCORDION_SECTIONS.map((section) => ({
      queryKey: ["products", section.value],
      queryFn: () => fetchProductsBySection(section.value),
      staleTime: 5 * 60 * 1000,
    })),
  });

  const products = useMemo(
    () =>
      productQueries.flatMap((query) =>
        Array.isArray(query.data) ? query.data : [],
      ),
    [productQueries],
  );

  const productLookup = useMemo(
    () =>
      products.reduce<ProductLookup>((lookup, product) => {
        lookup[product.id] = product;
        return lookup;
      }, {}),
    [products],
  );

  return {
    products,
    productLookup,
    isLoading: productQueries.some((query) => query.isLoading),
    isFetching: productQueries.some((query) => query.isFetching),
    isError: productQueries.some((query) => query.isError),
  };
}

export function getProductsByCategory(
  products: Product[],
  category: Product["category"],
) {
  return products.filter((product) => product.category === category);
}
