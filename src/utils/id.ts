export function parseBigIntId(value: unknown): bigint {
  if (typeof value === 'bigint') return value;
  if (typeof value === 'number') return BigInt(value);
  return BigInt(String(value));
}

export function parseOptionalBigIntId(value: unknown): bigint | undefined {
  if (value === undefined || value === null || value === '') return undefined;
  return parseBigIntId(value);
}
