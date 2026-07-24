import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "exclusive-wishlist";

function loadPersistedState() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return parsed.state?.productIds ?? [];
  } catch {
    return [];
  }
}

const WishlistContext = createContext(undefined);

export function WishlistProvider({ children }) {
  const [productIds, setProductIds] = useState(() => loadPersistedState());

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ state: { productIds }, version: 0 }),
      );
    } catch {
      // ignore write errors (e.g. storage disabled/full)
    }
  }, [productIds]);

  const isWishlisted = useCallback(
    (id) => productIds.includes(id),
    [productIds],
  );

  const toggle = useCallback((id) => {
    setProductIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }, []);

  const remove = useCallback((id) => {
    setProductIds((prev) => prev.filter((x) => x !== id));
  }, []);

  const clear = useCallback(() => setProductIds([]), []);

  const value = useMemo(
    () => ({ productIds, isWishlisted, toggle, remove, clear }),
    [productIds, isWishlisted, toggle, remove, clear],
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (ctx === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return ctx;
}
