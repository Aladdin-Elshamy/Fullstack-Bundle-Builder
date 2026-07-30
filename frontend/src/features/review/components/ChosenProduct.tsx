import DisabledStepperTooltip from "#components/DisabledStepperTooltip";
import { Button } from "#components/ui/button";
import AddIcon from "#icons/AddIcon";
import MinusIcon from "#icons/MinusIcon";
import PlanIcon from "#icons/PlanIcon";
import { useProductDisplayName } from "#hooks/useProductDisplayName";
import { useProductQuantityStepper } from "#hooks/useProductQuantityStepper";
import type { ChosenProductProps } from "../types";

export default function ChosenProduct({ line }: ChosenProductProps) {
  const { product, quantity, variantName, required } = line;
  const {
    isDecrementDisabled,
    isIncrementDisabled,
    decrementTooltip,
    incrementTooltip,
    decrementQuantity,
    incrementQuantity,
  } = useProductQuantityStepper({
    product,
    quantity,
    variantName,
    required,
  });
  const linePrice = product.price * quantity;
  const originalLinePrice = product.originalPrice
    ? product.originalPrice * quantity
    : undefined;
  const { isPlan, firstProductName, restProductName } =
    useProductDisplayName(product);
  return (
    <div className="flex items-center justify-between gap-3">
      {/* Product Info */}
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`${product.category === "plan" ? "bg-[#e7effd]" : "bg-white"} w-12 h-12 flex items-center justify-center rounded-md p-2 shrink-0`}
        >
          {product.category === "plan" ? (
            <PlanIcon className="w-20! h-20!" />
          ) : (
            <img
              src={line.variantImage ?? product.image}
              alt={product.name}
              className="w-full object-contain"
            />
          )}
        </div>
        <div className="min-w-0">
          <div className="font-medium text-[#0B0D10] max-w-40">
            {isPlan ? (
              <div className="text-lg">
                <span className="font-bold">{firstProductName}</span>{" "}
                <span className="font-bold text-primary">
                  {restProductName}
                </span>
              </div>
            ) : (
              product.name
            )}{" "}
            {required ? (
              <>
                <br />
                <span>(Required)</span>
              </>
            ) : null}
          </div>
          {variantName ? (
            <p className="text-xs text-[#6F7882]">{variantName}</p>
          ) : null}
        </div>
      </div>
      <div className="flex items-baseline-last sm:items-center gap-4 font-semibold">
        {/* Counter */}
        {product.category !== "plan" ? (
          <div className="flex items-center gap-2">
            <DisabledStepperTooltip message={decrementTooltip}>
              <Button
                onClick={decrementQuantity}
                disabled={isDecrementDisabled}
                aria-label={`Decrease quantity of ${variantName ? `${variantName} ` : ""}${product.name}`}
                className="bg-white flex justify-center items-center disabled:border-[#CED6DE]! disabled:bg-[#F1F1F2] border-2 w-6! h-6! rounded border-white hover:bg-gray-300 hover:border-gray-300 disabled:opacity-100"
              >
                <MinusIcon className="w-2.5! h-2.5! disabled:text-[#CED6DE]! text-[#575757]! " />
              </Button>
            </DisabledStepperTooltip>
            <p className="font-semibold text-[#0B0D10] text-base m-0! w-5 text-center">
              {quantity}
            </p>
            <DisabledStepperTooltip message={incrementTooltip}>
              <Button
                onClick={incrementQuantity}
                disabled={isIncrementDisabled}
                aria-label={`Increase quantity of ${variantName ? `${variantName} ` : ""}${product.name}`}
                className="bg-white disabled:border-[#CED6DE]! disabled:bg-[#F1F1F2] border-2 w-6! h-6! rounded border-white hover:bg-gray-300 hover:border-gray-300 flex items-center justify-center disabled:opacity-100"
              >
                <AddIcon className="w-2.5! h-2.5! disabled:text-[#CED6DE]! text-[#575757]" />
              </Button>
            </DisabledStepperTooltip>
          </div>
        ) : null}
        {/* Price */}
        <div className="flex items-end flex-col sm:gap-2.5 sm:flex-row xl:flex-col xl:gap-0 pt-1 sm:pt-0">
          {originalLinePrice && originalLinePrice > linePrice ? (
            <span className="text-[#6F7882] line-through decoration-1 text-base font-medium">
              ${originalLinePrice.toFixed(2)}
            </span>
          ) : null}

          <span className="text-[#4E2FD2] text-base font-semibold">
            {product.required ? "FREE" : `$${linePrice.toFixed(2)}`}

            {product.category === "plan" && "/mo"}
          </span>
        </div>
      </div>
    </div>
  );
}
