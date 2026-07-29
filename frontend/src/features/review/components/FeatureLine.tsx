import DeliveryIcon from "#icons/DeliveryIcon";

export default function FeatureLine() {
  return (
    <div className="pt-3.5 flex items-center justify-between gap-3 border-t border-[#CED6DE] mt-2.5">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-12 h-12 flex items-center justify-center rounded-md bg-white p-2 shrink-0">
          <DeliveryIcon className="text-[#0AA288]" />
        </div>
        <div className="min-w-0">
          <p className="font-medium text-[#0B0D10]">Fast Shipping</p>
        </div>
      </div>
      <div className="flex items-baseline-last sm:items-center gap-4 font-semibold">
        {/* Price */}
        <div className="flex items-center flex-col sm:gap-2.5 sm:flex-row xl:flex-col xl:gap-0 pt-1 sm:pt-0">
          <span className="text-[#6F7882] line-through decoration-1 text-base font-medium">
            $5.99
          </span>

          <span className="text-[#4E2FD2] text-base font-semibold">FREE</span>
        </div>
      </div>
    </div>
  );
}
