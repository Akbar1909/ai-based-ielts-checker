export function generateWhere<T extends Record<string, any>>(query: T) {
  let where = {};

  for (const [key, value] of Object.entries(query)) {
    where = {
      ...where,
      ...(typeof value !== 'number' && !value ? {} : { [key]: value }),
    };
  }

  return where;
}
