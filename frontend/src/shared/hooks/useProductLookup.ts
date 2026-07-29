import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import type { ProductLookup } from "../lib/selectors";
import type { Product } from "../types/components";
import { useBundleStore } from "../../store/useBundleStore";
import { ACCORDION_SECTIONS } from "../../features/builder/constants";
import { fetchProductsBySection } from "../../features/builder/services/products";

export function useProductLookup() {
  const hasSavedSystem = useBundleStore((state) => state.hasSavedSystem);

  const productQueries = useQueries({
    queries: ACCORDION_SECTIONS.map((section) => ({
      queryKey: ["products", section.value],
      queryFn: () => fetchProductsBySection(section.value),
      staleTime: 5 * 60 * 1000,
      enabled: hasSavedSystem,
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
