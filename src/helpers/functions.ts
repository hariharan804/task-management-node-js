export function snakeToCamel(obj: any): any {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(snakeToCamel);
  }

  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
        letter.toUpperCase()
      );
      // eslint-disable-next-line security/detect-object-injection
      acc[camelKey] = snakeToCamel(value);
      return acc;
    },
    {} as Record<string, any>
  );
}
