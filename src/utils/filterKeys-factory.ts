export function filterKeys<T extends string>(allKeys: Record<T, boolean>) {
  return (type: 'include' | 'exclude' = 'exclude', keys: Array<T> = []) => {
    if (type === 'include') {
      return keys.reduce((acc, cur) => ({ ...acc, [cur]: true }), {});
    }

    return {
      ...allKeys,
      ...keys.reduce((acc, cur) => ({ ...acc, [cur]: false }), {}),
    };
  };
}
