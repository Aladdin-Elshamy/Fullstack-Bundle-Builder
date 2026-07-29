import { create } from "zustand";
import { getLineKey, getMaxProductQuantity } from "../shared/lib/selectors";
import type { Product } from "../shared/types";

const STORAGE_KEY = "wyze-security-system";

type BundleStore = {
  quantities: Record<string, number>;
  hasSavedSystem: boolean;
  setQuantity: (
    product: Product,
    variantName: string | undefined,
    quantity: number,
    exclusiveProductIds?: string[],
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

const persistedQuantities = loadPersistedQuantities();

export const useBundleStore = create<BundleStore>((set, get) => ({
  quantities: persistedQuantities ?? {},
  hasSavedSystem: Boolean(persistedQuantities),
  setQuantity: (product, variantName, quantity, exclusiveProductIds = []) => {
    if (product.required) {
      return;
    }

    const key = getLineKey(product, variantName);
    const maxQuantity = getMaxProductQuantity(product);
    const nextQuantity = Math.max(0, Math.min(quantity, maxQuantity));

    set((state) => {
      const quantities = { ...state.quantities };

      if (product.category === "plan" && nextQuantity > 0) {
        exclusiveProductIds.forEach((productId) => {
          delete quantities[productId];
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
    set({ hasSavedSystem: true });
  },

  loadSavedSystem: () => {
    const nextPersistedQuantities = loadPersistedQuantities();

    set({
      quantities: nextPersistedQuantities ?? {},
      hasSavedSystem: Boolean(nextPersistedQuantities),
    });
  },
}));