export const round2 = (n) => Math.round((Number(n) + Number.EPSILON) * 100) / 100;

// "$120" for whole amounts, "$119.99" otherwise; avoids float artifacts like 59.97000000000001
export function formatPrice(n) {
  const v = round2(n);
  return Number.isInteger(v) ? `$${v}` : `$${v.toFixed(2)}`;
}
