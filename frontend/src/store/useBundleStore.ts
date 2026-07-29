import { create } from "zustand";
import { getDefaultQuantities, getLineKey } from "../shared/lib/selectors";
import type { Product } from "../shared/types/components";

const STORAGE_KEY = "wyze-security-system";

type BundleStore = {
  quantities: Record<string, number>;
  products: Record<string, Product>;
  hasSavedSystem: boolean;
  registerProducts: (products: Product[]) => void;
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

const persistedQuantities = loadPersistedQuantities();

export const useBundleStore = create<BundleStore>((set, get) => ({
  quantities: persistedQuantities ?? {},
  products: {},
  hasSavedSystem: Boolean(persistedQuantities),

  registerProducts: (products) => {
    set((state) => {
      const nextProducts = { ...state.products };

      products.forEach((product) => {
        nextProducts[product.id] = product;
      });

      if (state.hasSavedSystem) {
        return { products: nextProducts };
      }

      return {
        products: nextProducts,
        quantities: {
          ...getDefaultQuantities(products),
          ...state.quantities,
        },
      };
    });
  },

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
        Object.values(state.products)
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
    set({ hasSavedSystem: true });
  },

  loadSavedSystem: () => {
    const nextPersistedQuantities = loadPersistedQuantities();

    set({
      quantities:
        nextPersistedQuantities ?? getDefaultQuantities(Object.values(get().products)),
      hasSavedSystem: Boolean(nextPersistedQuantities),
    });
  },
}));