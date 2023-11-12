export function makeItMap<T = any>(array: Array<T>, key: keyof T) {
  const table = new Map();

  array.forEach((item, i) => {
    table.set(item[key], { ...item, i });
  });

  return table;
}
