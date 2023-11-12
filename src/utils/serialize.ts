type ArrayElement<ArrayType> = ArrayType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

export const customSerialize = <
  T,
  F extends (item: ArrayElement<T>) => ReturnType<F> = (
    item: ArrayElement<T>,
  ) => ArrayElement<T>,
>(
  data: T,
  fc?: F,
): ReturnType<F>[] => {
  const validData = JSON.parse(
    JSON.stringify(data, (_: string, value) =>
      typeof value === 'bigint' ? value.toString() : value,
    ),
  );

  if (Array.isArray(validData) && fc) {
    return validData.map(fc);
  }

  return validData;
};
