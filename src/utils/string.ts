const DEFAULT_TABLE =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export const randomString = (length: number, table = DEFAULT_TABLE) =>
  Array.from(Array(length))
    .map(() => table[Math.floor(Math.random() * table.length)])
    .join("");
