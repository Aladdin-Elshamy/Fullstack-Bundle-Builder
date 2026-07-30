
export type ProductLookup = Record<string, Product>;
export interface Product {
  id: string;
  category: "camera" | "sensor" | "accessory" | "plan";
  name: string;
  description: string;
  image?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  options?: {
    variant_name: string;
    color_value: string;
    image?: string;
  }[];
  required?: boolean;
  quantity: number;
}
export interface BundleLine {
  key: string;
  product: Product;
  quantity: number;
  variantName?: string;
  variantValue?: string;
  variantImage?: string;
  required?: boolean;
};

export interface BundleTotals {
  total: number;
  compareAtTotal: number;
  savings: number;
  monthlyTotal: number;
  monthlyCompareAtTotal: number;
  monthlySavings: number;
};

export interface UseProductQuantityStepperOptions {
  product: Product;
  quantity: number;
  variantName?: string;
  required?: boolean;
  exclusiveProductIds?: string[];
};
