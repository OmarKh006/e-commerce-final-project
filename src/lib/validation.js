const EMAIL_RE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/u;

export function isValidEmail(value) {
  const email = String(value ?? "").trim();
  return email.length <= 254 && EMAIL_RE.test(email);
}
