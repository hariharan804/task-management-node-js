export function snakeToCamel(obj: any): any {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => snakeToCamel(item));
  }

  return Object.keys(obj).reduce((acc, key) => {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
      letter.toUpperCase()
    );
    // eslint-disable-next-line security/detect-object-injection
    acc[camelKey] = snakeToCamel(obj[key]);
    return acc;
  }, {} as any);
}
