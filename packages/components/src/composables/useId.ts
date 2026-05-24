let counter = 0;

export function useId(prefix: string): string {
  return `${prefix}-${++counter}`;
}
