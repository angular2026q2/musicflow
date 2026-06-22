export function formatDate(date: string): string {
  const locale = 'en-CA';
  const today = new Date().toLocaleDateString(locale);
  const yesterday = new Date(Date.now() - 86_400_000).toLocaleDateString(locale);

  if (date === today) return 'Today';
  if (date === yesterday) return 'Yesterday';

  return new Date(date).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'short',
  });
}
