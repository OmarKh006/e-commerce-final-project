// Simulated orders: saved locally only. No payment is processed anywhere.
const KEY = "exclusive-orders";

export function getOrders() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(KEY));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveOrder(order) {
  const orders = [order, ...getOrders()];
  try {
    window.localStorage.setItem(KEY, JSON.stringify(orders));
  } catch {
    // storage unavailable: the order is still confirmed on screen
  }
  return order;
}

export function newOrderId() {
  return `EX-${Date.now().toString(36).toUpperCase()}`;
}
