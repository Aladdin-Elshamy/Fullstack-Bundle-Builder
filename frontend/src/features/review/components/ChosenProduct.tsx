import { Button } from "#components/ui/button";
import AddIcon from "#icons/AddIcon";
import MinusIcon from "#icons/MinusIcon";
import { type BundleLine } from "../../../shared/lib/selectors";
import { useBundleStore } from "../../../store/useBundleStore";

export default function ChosenProduct({ line }: { line: BundleLine }) {
  const setQuantity = useBundleStore((state) => state.setQuantity);
  const { product, quantity, variantName, required } = line;
  const linePrice = product.price * quantity;
  const originalLinePrice = product.originalPrice
    ? product.originalPrice * quantity
    : undefined;

  return (
    <div className="flex items-center justify-between gap-3">
      {/* Product Info */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-12 h-12 flex items-center justify-center rounded-md bg-white p-2 shrink-0">
          <img
            src={line.variantImage ?? product.image}
            alt={product.name}
            className="w-full object-contain"
          />
        </div>
        <div className="min-w-0">
          <p className="font-medium text-[#0B0D10]">
            {product.name}{" "}
            {required ? (
              <>
                <br />
                <span>(Required)</span>
              </>
            ) : null}
          </p>
          {variantName ? (
            <p className="text-xs text-[#6F7882]">{variantName}</p>
          ) : null}
        </div>
      </div>
      <div className="flex items-baseline-last sm:items-center gap-4 font-semibold">
        {/* Counter */}
        {product.category !== "plan" && !product.required ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity(product, variantName, quantity - 1)}
              disabled={required || quantity === 0}
              className="bg-white flex justify-center items-center disabled:border-[#CED6DE]! disabled:bg-[#F1F1F2] border-2 w-6! h-6! rounded border-white hover:bg-gray-300 hover:border-gray-300"
            >
              <MinusIcon className="w-2.5! h-2.5! disabled:text-[#CED6DE]! text-[#575757]! " />
            </button>
            <p className="font-semibold text-[#0B0D10] text-base m-0! w-5 text-center">
              {quantity}
            </p>
            <Button
              onClick={() => setQuantity(product, variantName, quantity + 1)}
              disabled={required}
              className="bg-white disabled:border-[#CED6DE]! disabled:bg-[#F1F1F2] border-2 w-6! h-6! rounded border-white hover:bg-gray-300 hover:border-gray-300 flex items-center justify-center"
            >
              <AddIcon className="w-2.5! h-2.5! disabled:text-[#CED6DE]! text-[#575757]" />
            </Button>
          </div>
        ) : null}
        {/* Price */}
        <div className="flex items-center flex-col sm:gap-2.5 sm:flex-row xl:flex-col xl:gap-0 pt-1 sm:pt-0">
          {originalLinePrice && originalLinePrice > linePrice ? (
            <span className="text-[#6F7882] line-through decoration-1 text-base font-medium">
              ${originalLinePrice.toFixed(2)}
            </span>
          ) : null}

          <span className="text-[#4E2FD2] text-base font-semibold">
            {product.required ? "FREE" : `${linePrice.toFixed(2)}`}

            {product.category === "plan" && "/mo"}
          </span>
        </div>
      </div>
    </div>
  );
}
