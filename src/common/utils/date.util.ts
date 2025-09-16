export function Formatdate(): string {
  const date = new Date();
  const locale = 'en-US';

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
}
