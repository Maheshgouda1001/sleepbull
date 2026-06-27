export function generateOrderNumber() {
  const now = new Date();
  const stamp = `${now.getUTCFullYear()}${String(now.getUTCMonth() + 1).padStart(2, '0')}${String(
    now.getUTCDate()
  ).padStart(2, '0')}`;
  const random = Math.floor(1000 + Math.random() * 9000);

  return `SB-${stamp}-${random}`;
}
