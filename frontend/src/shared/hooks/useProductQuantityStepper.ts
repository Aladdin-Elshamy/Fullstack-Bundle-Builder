import { canIncrementProductQuantity } from "#lib/selectors";
import { useBundleStore } from "#store/useBundleStore";
import type { UseProductQuantityStepperOptions } from "#types/index";


export function useProductQuantityStepper({
  product,
  quantity,
  variantName,
  required = false,
  exclusiveProductIds = [],
}: UseProductQuantityStepperOptions) {
  const setQuantity = useBundleStore((state) => state.setQuantity);

  const isDecrementDisabled = required || quantity === 0;
  const isIncrementDisabled =
    required || !canIncrementProductQuantity(product, quantity);

  const decrementTooltip = isDecrementDisabled
    ? required
      ? "This item is required for selected sensors."
      : "Minimum quantity reached."
    : undefined;

  const incrementTooltip = isIncrementDisabled
    ? required
      ? "This item is required for selected sensors."
      : "Maximum quantity reached."
    : undefined;

  const decrementQuantity = () => {
    setQuantity(product, variantName, quantity - 1, exclusiveProductIds);
  };

  const incrementQuantity = () => {
    setQuantity(product, variantName, quantity + 1, exclusiveProductIds);
  };

  return {
    isDecrementDisabled,
    isIncrementDisabled,
    decrementTooltip,
    incrementTooltip,
    decrementQuantity,
    incrementQuantity,
  };
}