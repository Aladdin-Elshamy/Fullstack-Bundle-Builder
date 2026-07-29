import ChosenProduct from "../components/ChosenProduct";
import { useChosenProducts } from "../hooks/useChosenProducts";
import type { ChosenProductsProps } from "../types";

export default function ChosenProducts({ productType }: ChosenProductsProps) {
  const { filteredLines, hasProducts } = useChosenProducts(productType);

  if (!hasProducts || !productType) {
    return null;
  }

  return (
    <div className="pt-3.5 border-t border-[#CED6DE] mt-2.5">
      <h3 className="uppercase text-[#A8B2BD] pb-2">{productType}</h3>
      <div className="space-y-3">
        {filteredLines.map((line) => (
          <ChosenProduct key={line.key} line={line} />
        ))}
      </div>
    </div>
  );
}
