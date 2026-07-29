import { Button } from "#components/ui/button";
import type { ProductsProps } from "../types";
import ProductCard from "../components/ProductCard";
import type { Product } from "#types/index";

export default function Products({
  step,
  products,
  onNext,
}: ProductsProps) {
  const nextSection =
    step === 1 ? "plan" : step === 2 ? "sensors" : step === 3 && "accessories";
  const visibleProducts = products.filter((product) => !product.required);

  return (
    <section>
      <div className="grid grid-cols-1 p-1 justify-stretch xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 xl:grid-cols-2">
        {visibleProducts.map((product: Product, index) => {
          const exclusiveProductIds =
            product.category === "plan"
              ? visibleProducts
                  .filter((item) => item.id !== product.id)
                  .map((item) => item.id)
              : [];

          return (
            <ProductCard
              isLastAndOdd={
                index === visibleProducts.length - 1 && (index + 1) % 2 !== 0
              }
              key={product.id}
              product={product}
              exclusiveProductIds={exclusiveProductIds}
            />
          );
        })}
      </div>
      {nextSection && (
        <div className="text-center mt-3.5 mb-1">
          <Button
            onClick={onNext}
            className="text-primary border-2 rounded-md border-primary bg-transparent hover:text-white mx-auto! hover:border-primary/80 font-semibold px-6"
          >
            Next: Choose your {nextSection}
          </Button>
        </div>
      )}
    </section>
  );
}