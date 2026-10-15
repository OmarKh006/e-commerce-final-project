// Reviews are stored per-browser in localStorage. To move them to a backend
// later, only this module needs to change.
const KEY = "exclusive-reviews";

function readAll() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(KEY));
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function getReviews(productId) {
  return readAll()[String(productId)] ?? [];
}

export function addReview(productId, review) {
  const all = readAll();
  const id = String(productId);
  all[id] = [review, ...(all[id] ?? [])];
  try {
    window.localStorage.setItem(KEY, JSON.stringify(all));
  } catch {
    throw new Error("storage-unavailable");
  }
  return all[id];
}
