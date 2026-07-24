import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "exclusive-cart";

function lineKey(productId, color, size) {
  return `${productId}:${color ?? ""}:${size ?? ""}`;
}

function loadPersistedState() {
  if (typeof window === "undefined") {
    return { items: [], couponCode: null };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [], couponCode: null };
    const parsed = JSON.parse(raw);
    return {
      items: parsed.state?.items ?? [],
      couponCode: parsed.state?.couponCode ?? null,
    };
  } catch {
    return { items: [], couponCode: null };
  }
}

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => loadPersistedState().items);
  const [couponCode, setCouponCode] = useState(
    () => loadPersistedState().couponCode,
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ state: { items, couponCode }, version: 0 }),
      );
    } catch {
      // ignore write errors (e.g. storage disabled/full)
    }
  }, [items, couponCode]);

  const addItem = useCallback((product, qty = 1, color = null, size = null) => {
    const key = lineKey(product.id, color, size);
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, qty: i.qty + qty } : i,
        );
      }
      return [
        ...prev,
        { key, productId: product.id, product, qty, color, size },
      ];
    });
  }, []);

  const removeItem = useCallback((key) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const updateQty = useCallback((key, qty) => {
    setItems((prev) =>
      prev
        .map((i) => (i.key === key ? { ...i, qty: Math.max(1, qty) } : i))
        .filter((i) => i.qty > 0),
    );
  }, []);

  const applyCoupon = useCallback((code) => setCouponCode(code || null), []);

  const clear = useCallback(() => {
    setItems([]);
    setCouponCode(null);
  }, []);

  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.qty, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.qty, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      couponCode,
      addItem,
      removeItem,
      updateQty,
      applyCoupon,
      clear,
      count,
      subtotal,
    }),
    [
      items,
      couponCode,
      addItem,
      removeItem,
      updateQty,
      applyCoupon,
      clear,
      count,
      subtotal,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (ctx === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
