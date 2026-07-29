import { create } from "zustand";
import { allProducts } from "../features/builder/constants";
import {
  getDefaultQuantities,
  getLineKey,
} from "../shared/lib/selectors";
import type { Product } from "../shared/types/components";

const STORAGE_KEY = "wyze-security-system";

type BundleStore = {
  quantities: Record<string, number>;
  setQuantity: (
    product: Product,
    variantName: string | undefined,
    quantity: number,
  ) => void;
  saveSystem: () => void;
  loadSavedSystem: () => void;
};

const loadPersistedQuantities = () => {
  if (typeof window === "undefined") {
    return undefined;
  }

  try {
    const rawSavedSystem = window.localStorage.getItem(STORAGE_KEY);

    if (!rawSavedSystem) {
      return undefined;
    }

    return JSON.parse(rawSavedSystem) as Record<string, number>;
  } catch {
    return undefined;
  }
};

const getInitialQuantities = () =>
  loadPersistedQuantities() ?? getDefaultQuantities();

export const useBundleStore = create<BundleStore>((set, get) => ({
  quantities: getInitialQuantities(),

  setQuantity: (product, variantName, quantity) => {
    if (product.required) {
      return;
    }

    const key = getLineKey(product, variantName);
    const nextQuantity = Math.max(
      0,
      product.category === "plan" ? Math.min(quantity, 1) : quantity,
    );

    set((state) => {
      const quantities = { ...state.quantities };

      if (product.category === "plan" && nextQuantity > 0) {
        allProducts
          .filter((item) => item.category === "plan")
          .forEach((plan) => {
            delete quantities[plan.id];
          });
      }

      if (nextQuantity === 0) {
        delete quantities[key];
      } else {
        quantities[key] = nextQuantity;
      }

      return { quantities };
    });
  },

  saveSystem: () => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(get().quantities));
  },

  loadSavedSystem: () => {
    set({ quantities: getInitialQuantities() });
  },
}));
