import { useQuery } from "@tanstack/react-query";
import LoadingProductCard from "../components/LoadingProductCard";
import { fetchProductsBySection } from "../services/products";
import Products from "./Products";
import type { AccordionProductsSectionProps } from "../types";

export default function AccordionProductsSection({
  section,
  step,
  isOpen,
  onNext,
}: AccordionProductsSectionProps) {
  const {
    data: products = [],
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["products", section],
    queryFn: () => fetchProductsBySection(section),
    enabled: isOpen,
  });

  if (isLoading || (isOpen && isFetching && products.length === 0)) {
    const loadingCards = Array.from({ length: 3 });

    return (
      <div className="grid grid-cols-1 justify-stretch xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 xl:grid-cols-2 p-0.5">
        {loadingCards.map((_, index) => (
          <LoadingProductCard
            key={index}
            isLastAndOdd={
              index === loadingCards.length - 1 && (index + 1) % 2 !== 0
            }
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-10 text-center text-sm font-medium text-[#D8392B]">
        Failed to load products.
      </div>
    );
  }

  if (!isOpen) {
    return null;
  }

  return <Products products={products} step={step} onNext={onNext} />;
}
