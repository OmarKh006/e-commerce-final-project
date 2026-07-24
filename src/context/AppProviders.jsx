import { CartProvider } from "./CartContext";
import { WishlistProvider } from "./WishlistContext";
import { AuthProvider } from "./AuthContext";

export default function AppProviders({ children }) {
  return (
    <WishlistProvider>
      <CartProvider>
        <AuthProvider>{children}</AuthProvider>
      </CartProvider>
    </WishlistProvider>
  );
}
