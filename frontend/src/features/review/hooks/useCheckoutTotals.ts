import { useProductLookup } from "#hooks/useProductLookup";
import { getSelectedLines, getTotals } from "#lib/selectors";
import { useBundleStore } from "#store/useBundleStore";
import { useMemo } from "react";
import toast from "react-hot-toast";


export function useCheckoutTotals() {
  const quantities = useBundleStore((state) => state.quantities);
  const saveSystem = useBundleStore((state) => state.saveSystem);
  const { productLookup } = useProductLookup();

  const totals = useMemo(
    () => getTotals(getSelectedLines(quantities, productLookup)),
    [quantities, productLookup],
  );

  const totalSavings = totals.savings + totals.monthlySavings;
  const originalMonthlyPrice = totals.monthlyTotal + totals.monthlySavings;
  const hasSavings = totalSavings > 0;
  const financingAmount = Math.max(totals.total / 12 + totals.monthlyTotal, 0);

  const handleSaveSystem = () => {
    saveSystem();
    toast.success("Your security system was saved.");
  };

  return {
    totals,
    totalSavings,
    originalMonthlyPrice,
    hasSavings,
    financingAmount,
    handleSaveSystem,
  };
}
