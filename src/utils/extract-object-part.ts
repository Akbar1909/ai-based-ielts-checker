export function extractObjectPart<T extends Record<string, any>>({
  keys,
  obj,
  type = 'include',
}: {
  keys: Array<keyof T>;
  obj: T;
  type: 'include' | 'exclude';
}) {
  if (type === 'include') {
    return keys.reduce((acc, cur) => ({ ...acc, [cur]: obj[cur] }), {});
  }

  return Object.keys(obj).reduce(
    (acc, cur) => ({
      ...acc,
      ...(!keys.includes(cur) && { [cur]: obj[cur] }),
    }),
    {},
  );
}
