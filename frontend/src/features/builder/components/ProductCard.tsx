"use client";

import { Badge } from "#components/ui/badge";
import { Button } from "#components/ui/button";
import { Card, CardContent, CardFooter } from "#components/ui/card";
import useElementDimensions from "#hooks/useElementDimensions";
import AddIcon from "#icons/AddIcon";
import MinusIcon from "#icons/MinusIcon";
import { cn } from "#lib/utils";
import { useState } from "react";
import { useBundleStore } from "../../../store/useBundleStore";
import { getQuantity } from "../../../shared/lib/selectors";
import type { Product } from "../../../shared/types/components";

type ProductCardProps = {
  product: Product;
  isLastAndOdd: boolean;
};

export default function ProductCard({
  product,
  isLastAndOdd,
}: ProductCardProps) {
  const [activeColor, setActiveColor] = useState<string | undefined>(
    product.colors?.[0]?.name,
  );
  const { ref, dimensions } = useElementDimensions();
  const hasColors = Boolean(product.colors?.length);
  const quantities = useBundleStore((state) => state.quantities);
  const setQuantity = useBundleStore((state) => state.setQuantity);
  const quantity = getQuantity(quantities, product, activeColor);
  const isPlanSelected = product.category === "plan" && quantity > 0;
  const isSelected =
    product.category === "plan" ? isPlanSelected : quantity > 0;

  return (
    <Card
      className={cn(
        "w-full sm:max-w-70 xl:max-w-full rounded-2xl overflow-hidden p-0 gap-0 group/card flex flex-col xl:flex-row items-start border transition-colors",
        isSelected && "border-primary shadow-[0_0_0_1px_var(--primary)]",
        isLastAndOdd && "mx-auto w-fit last:xl:col-span-2",
        product.category === "plan" && "last:mb-1",
      )}
    >
      {/* ── Image zone ── */}
      <div
        className="relative overflow-hidden flex items-center justify-center h-80"
        style={{
          height: window.innerWidth >= 640 ? dimensions?.height : undefined,
        }}
      >
        <img
          src={product.image}
          className="drop-shadow-2xl px-2.5 pt-2.5 py-5 transition-transform duration-500 ease-out group-hover/card:scale-105 xl:max-h-full"
          alt={product.name}
        />

        {product.discount ? (
          <Badge className="absolute top-3 left-3 text-xs font-semibold">
            Save {product.discount}%
          </Badge>
        ) : null}
      </div>

      {/* Info zone */}
      <div className="flex flex-col w-full" ref={ref}>
        <CardContent className="px-2.5 sm:pt-4 pb-2.5 ">
          {/* Brand + name */}
          <div className="min-w-0 space-y-2">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-[#1F1F1FBF] font-medium max-w-sm">
              {product.description}{" "}
              <a href="#" className="font-semibold text-primary">
                Learn More
              </a>
            </p>
          </div>

          {hasColors ? (
            <div className="flex flex-wrap gap-1.5 pt-2.5">
              {product.colors?.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setActiveColor(color.name)}
                  className={cn(
                    "basis-20 flex justify-around items-center rounded-xs text-xs font-medium h-10 border transition-all duration-150 shrink-0",
                    activeColor === color.name
                      ? "border-[#0AA288] bg-[#1DF0BB0A]"
                      : "text-muted-foreground hover:border-foreground/50 hover:text-foreground",
                  )}
                >
                  {color.image ? (
                    <img
                      className="max-w-full w-7 h-7 object-contain"
                      src={color.image}
                      alt={color.name}
                    />
                  ) : (
                    <span
                      className="w-7 h-7 rounded-full border"
                      style={{ backgroundColor: color.value }}
                    />
                  )}
                  {color.name}
                </button>
              ))}
            </div>
          ) : null}
        </CardContent>

        {/* Action zone — always visible */}
        <CardFooter className="px-2.5 pb-2.5 gap-2 bg-transparent justify-between border-t-0 flex-wrap">
          {/* Counter */}
          {product.category === "plan" ? (
            <Button
              onClick={() =>
                setQuantity(product, undefined, isPlanSelected ? 0 : 1)
              }
              className={cn(
                "relative overflow-hidden group/btn flex-1 h-12 rounded-xl font-semibold text-base cursor-pointer border border-primary transition-all flex items-center justify-center gap-2",
                isPlanSelected && "bg-primary text-white",
              )}
            >
              <span className="absolute left-1/2 -translate-x-1/2 top-full -translate-y-1/2 w-8 h-8 bg-white dark:bg-gray-950 rounded-full scale-0 transition-transform duration-700 ease-in-out group-hover/btn:scale-[20]" />
              <span className="relative z-10 transition-colors duration-500 group-hover/btn:text-gray-950 dark:group-hover/btn:text-white">
                {isPlanSelected ? "Selected" : "Choose"}
              </span>
            </Button>
          ) : (
            <div className="flex items-start gap-1">
              <Button
                onClick={() => setQuantity(product, activeColor, quantity - 1)}
                disabled={quantity === 0}
                className="bg-[#F0F4F7] w-7! h-7! disabled:border-[#CED6DE]! border-4 border-[#F0F4F7] hover:bg-gray-300 hover:border-gray-300"
              >
                <MinusIcon className="w-2! h-2! disabled:text-[#CED6DE]! text-[#525963]! " />
              </Button>
              <p className="font-medium text-[#0B0D10] text-base m-0! w-5 text-center">
                {quantity}
              </p>
              <Button
                onClick={() => setQuantity(product, activeColor, quantity + 1)}
                className="bg-[#F0F4F7] w-7! h-7! disabled:border-[#CED6DE]! border-4 border-[#F0F4F7]  hover:bg-gray-300 hover:border-gray-300"
              >
                <AddIcon className="w-2! h-2! disabled:text-[#CED6DE]! text-[#525963]" />
              </Button>
            </div>
          )}
          {/* Price */}
          <div className="flex items-center flex-col pt-1">
            {product.originalPrice ? (
              <span className="text-[#D8392B] line-through decoration-1 text-base">
                ${product.originalPrice.toFixed(2)}
              </span>
            ) : null}
            <span className="text-[#575757]  text-base">
              ${product.price.toFixed(2)}
              {product.category === "plan" && "/mo"}
            </span>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
