import { Badge } from "#components/ui/badge";
import { Button } from "#components/ui/button";
import SatisfactionBadge from "#assets/images/satisfaction-badge.webp";
import { useCheckoutTotals } from "../hooks/useCheckoutTotals";

export default function Checkout() {
  const {
    totals,
    totalSavings,
    originalMonthlyPrice,
    hasSavings,
    financingAmount,
    handleSaveSystem,
    handleCheckout
  } = useCheckoutTotals();

  return (
    <section className="mt-2.5 sm:mt-0 text-center sm:w-2/5 lg:w-full">
      <div className="pb-3.5 grid grid-cols-[1fr_auto] md:grid-cols-[auto_1fr] xl:grid-cols-[1fr_auto] items-center gap-2">
        <img
          src={SatisfactionBadge}
          className="w-20 h-20 md:h-28 md:w-28 xl:w-20 xl:h-20 row-span-2 md:row-span-1 xl:row-span-2"
          alt="30-day satisfaction guarantee"
        />
        <div className="hidden text-start md:flex xl:hidden flex-col items-start gap-4">
          <h4 className="font-semibold ">30-day hassle-free returns</h4>
          <p className="text-sm">
            If you're not totally in love with the product, we will refund you
            100%.
          </p>
        </div>
        <Badge className="font-medium px-2 whitespace-normal! h-fit! py-1! rounded! self-end justify-self-end">
          as low as ${financingAmount.toFixed(2)}/mo
        </Badge>
        {/* Price */}
        <div className="flex items-end gap-2 col-start-2 justify-self-end self-start">
          {hasSavings ? (
            <span className="text-[#6F7882] font-medium text-lg line-through decoration-1">
              ${(totals.compareAtTotal + originalMonthlyPrice).toFixed(2)}
            </span>
          ) : null}

          <span className="text-[#4E2FD2] text-2xl font-bold">
            ${(totals.total + totals.monthlyTotal).toFixed(2)}
          </span>
        </div>
      </div>
      {hasSavings ? (
        <p className="font-semibold text-[#0AA288] text-xs">
          Congrats! You're saving ${totalSavings.toFixed(2)} on your security
          bundle!
        </p>
      ) : null}
      <Button
        onClick={handleCheckout}
        className="w-full mt-1 h-12 font-tt-norms"
      >
        Checkout
      </Button>
      <Button
        variant="ghost"
        onClick={handleSaveSystem}
        className="italic underline underline-offset-1 mt-2 h-0 text-[#484848]"
      >
        Save my system for later
      </Button>
    </section>
  );
}
