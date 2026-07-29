import { useMemo } from "react";
import { getSelectedLines } from "#lib/selectors";
import { useProductLookup } from "../../../shared/hooks/useProductLookup";
import { useBundleStore } from "../../../store/useBundleStore";
import FeatureLine from "../components/FeatureLine";
import Checkout from "./Checkout";
import ChosenProducts from "./ChosenProducts";

export default function ReviewPanel() {
  const quantities = useBundleStore((state) => state.quantities);
  const { productLookup } = useProductLookup();
  const lines = useMemo(
    () => getSelectedLines(quantities, productLookup),
    [quantities, productLookup],
  );

  return (
    <div className="px-4 pt-3.5 sm:pt-0 xl:my-0 md:rounded-xl sm:pb-8 bg-[#EDF4FF] xl:max-w-md h-fit">
      <span className="uppercase sm:hidden text-[#484848] tracking-widest font-medium text-xs">
        review
      </span>
      <div className="px-1.5 sm:pt-9 flex-col sm:flex-row xl:flex-col flex justify-between sm:gap-8 md:gap-12 xl:gap-2.5">
        <div className="sm:w-3/5 md:max-w-120 lg:max-w-full lg:w-full">
          <h2 className="text-[#1F1F1F] font-semibold text-2xl mt-6 sm:mt-0">
            Your security system
          </h2>
          <p className="text-[#1F1F1FBF] font-medium text-sm sm:text-base tracking-wider">
            Review your personalized protection system designed to keep what
            matters most safe.
          </p>
          <ChosenProducts productType="Cameras" />
          <ChosenProducts productType="Sensors" />
          <ChosenProducts productType="Accessories" />
          <ChosenProducts productType="Plan" />
          {lines.length > 0 && <FeatureLine />}
        </div>
        <Checkout />
      </div>
    </div>
  );
}
