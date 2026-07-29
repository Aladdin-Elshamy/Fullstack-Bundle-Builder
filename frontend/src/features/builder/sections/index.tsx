import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "#components/ui/accordion";
import ArrowUpIcon from "#icons/ArrowUpIcon";
import { Fragment } from "react";
import AccordionProductsSection from "./AccordionProductsSection";
import { ACCORDION_SECTIONS } from "../constants";
import { useBuilderAccordion } from "../hooks/useBuilderAccordion";
import { useProductLookup } from "#hooks/useProductLookup";
import { getSelectedCountByCategory } from "#lib/selectors";
import type { BuilderSectionValue } from "../types";
import { useBundleStore } from "#store/useBundleStore";
import type { Product } from "#types/index";

const categoryBySection = {
  cameras: "camera",
  plan: "plan",
  sensors: "sensor",
  protection: "accessory",
} as const satisfies Record<BuilderSectionValue, Product["category"]>;

export default function Builder() {
  const { openItems, setOpenItems, handleNext } = useBuilderAccordion();
  const quantities = useBundleStore((state) => state.quantities);
  const { productLookup } = useProductLookup();

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
