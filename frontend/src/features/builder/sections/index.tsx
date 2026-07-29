import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "#components/ui/accordion";
import ArrowUpIcon from "#icons/ArrowUpIcon";
import { useQuery } from "@tanstack/react-query";
import { Fragment, useState } from "react";
import { getSelectedCountByCategory } from "../../../shared/lib/selectors";
import type { Product } from "../../../shared/types/components";
import { useBundleStore } from "../../../store/useBundleStore";
import { ACCORDION_SECTIONS, type BuilderSectionValue } from "../constants";
import LoadingProductCard from "../components/LoadingProductCard";
import { useProductLookup } from "../../../shared/hooks/useProductLookup";
import { fetchProductsBySection } from "../services/products";
import Products from "./Products";

const categoryBySection = {
  cameras: "camera",
  plan: "plan",
  sensors: "sensor",
  protection: "accessory",
} as const satisfies Record<BuilderSectionValue, Product["category"]>;

type AccordionProductsSectionProps = {
  section: BuilderSectionValue;
  step: number;
  isOpen: boolean;
  onNext: () => void;
};

function AccordionProductsSection({
  section,
  step,
  isOpen,
  onNext,
}: AccordionProductsSectionProps) {
  const {
    data: products = [],
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["products", section],
    queryFn: () => fetchProductsBySection(section),
    enabled: isOpen,
  });

  if (isLoading || (isOpen && isFetching && products.length === 0)) {
    const loadingCards = Array.from({ length: section === "plan" ? 3 : 4 });

    return (
      <div className="grid grid-cols-1 justify-stretch xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 xl:grid-cols-2 p-0.5">
        {loadingCards.map((_, index) => (
          <LoadingProductCard
            key={index}
            isLastAndOdd={
              index === loadingCards.length - 1 && (index + 1) % 2 !== 0
            }
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-10 text-center text-sm font-medium text-[#D8392B]">
        Failed to load products.
      </div>
    );
  }

  if (!isOpen) {
    return null;
  }

  return <Products products={products} step={step} onNext={onNext} />;
}

export default function Builder() {
  const [openItems, setOpenItems] = useState<string[] | undefined>(["cameras"]);
  const quantities = useBundleStore((state) => state.quantities);
  const { productLookup } = useProductLookup();
  const handleNext = (currentIndex: number) => {
    const nextSection = ACCORDION_SECTIONS[currentIndex + 1]?.value;

    if (!nextSection) {
      return;
    }

    setOpenItems([nextSection]);
  };

  return (
    <Accordion
      className="xl:max-w-3xl"
      multiple
      value={openItems}
      onValueChange={(value) => {
        setOpenItems(value);
      }}
    >
      {ACCORDION_SECTIONS.map((item, index) => {
        const sectionValue = item.value;
        const Icon = item.icon;
        const isItemOpen = Boolean(openItems?.includes(item.value));
        const selectedCount = getSelectedCountByCategory(
          quantities,
          productLookup,
          categoryBySection[sectionValue],
        );

        return (
          <Fragment key={item.value}>
            <p
              className={`${isItemOpen ? "bg-[#EDF4FF] md:rounded-t-xl! md:not-first:mt-3.5" : ""} ps-4 md:first:pt-3.5 pt-3 pb-1.5 font-medium text-xs uppercase tracking-widest text-[#484848] `}
            >
              step {index + 1} of 4
            </p>
            <AccordionItem
              className="group data-open:bg-[#EDF4FF] border-y-[0.5px] border-[#1F1F1F] px-4 xl:data-open:rounded-b-xl! xl:data-open:border-b-0!"
              value={item.value}
            >
              <AccordionTrigger
                className="cursor-default py-5"
                render={
                  <button
                    type="button"
                    className="flex flex-wrap items-center!"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="text-[#6F7882] sm:w-7 sm:h-7" />
                      <p className="font-semibold text-lg sm:text-2xl">
                        {item.trigger}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 font-medium text-sm text-primary">
                      {isItemOpen && <p>{selectedCount} selected</p>}
                      <ArrowUpIcon className="transition-transform duration-200 group-data-open:rotate-180" />
                    </div>
                  </button>
                }
              />

              <AccordionContent>
                <AccordionProductsSection
                  section={sectionValue}
                  step={index + 1}
                  isOpen={isItemOpen}
                  onNext={() => handleNext(index)}
                />
              </AccordionContent>
            </AccordionItem>
          </Fragment>
        );
      })}
    </Accordion>
  );
}
