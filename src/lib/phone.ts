/** Formats raw input as a US phone number: (606) 555-1234. Extra digits are dropped. */
export function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/** True when the value holds a full 10-digit US number. */
export function isCompletePhone(value: string): boolean {
  return value.replace(/\D/g, '').length === 10;
}
