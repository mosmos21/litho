/**
 * 指定した区間の連番の配列を生成する
 * from と to は両端を含む
 */
export const range = (from: number, to: number) =>
  [...Array(to - from + 1)].map((_, i) => i + from);

/**
 * 0 から n - 1 までの連番の配列を生成する
 * @param n
 */
export const numbers = (n: number) => range(0, n - 1);

export const reversed = <T>(array: T[]) => [...array].reverse();
