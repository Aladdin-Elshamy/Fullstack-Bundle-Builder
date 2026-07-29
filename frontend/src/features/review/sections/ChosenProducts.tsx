import { useMemo } from "react";
import {
  getSelectedLines,
  type BundleLine,
} from "../../../shared/lib/selectors";
import { useBundleStore } from "../../../store/useBundleStore";
import ChosenProduct from "../components/ChosenProduct";

const categoryByProductType = {
  Cameras: "camera",
  Sensors: "sensor",
  Accessories: "accessory",
  Plan: "plan",
} as const;

type ChosenProductsProps = {
  productType?: keyof typeof categoryByProductType;
};

export default function ChosenProducts({ productType }: ChosenProductsProps) {
  const quantities = useBundleStore((state) => state.quantities);
  const lines = useMemo(() => getSelectedLines(quantities), [quantities]);
  const filteredLines = useMemo(
    () =>
      productType
        ? lines.filter(
            (line: BundleLine) =>
              line.product.category === categoryByProductType[productType],
          )
        : [],
    [lines, productType],
  );

  if (!productType || filteredLines.length === 0) {
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
