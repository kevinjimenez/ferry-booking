export const maskString = (value: string, visibleChars = 5): string => {
  if (value.length <= visibleChars) return value;
  return `****${value.slice(-visibleChars)}`;
};
