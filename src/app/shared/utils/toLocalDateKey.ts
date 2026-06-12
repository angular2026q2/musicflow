export function toLocalDateKey(iso: string): string {
  return new Date(iso).toLocaleDateString('en-CA');
}
