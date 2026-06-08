export function findKeyByValue<T, V extends string | number>(
  obj: Record<string, T>,
  value: V,
  searchKey: keyof T & string,
): string | undefined {
  if (value in obj) {
    return value as string;
  }

  return Object.keys(obj).find((key) => obj[key][searchKey] === value);
}
