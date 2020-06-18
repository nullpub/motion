/**
 * @since 0.0.0
 */

/**
 * @since 0.0.0
 */
export const notNil = <T>(t: T): t is NonNullable<T> =>
  t !== undefined && t !== null;

/**
 * @since 0.0.2
 */
export const mapObject = <K extends string, V, R>(
  obj: Record<K, V>,
  fn: (value: V, key: K) => R
): Record<K, R> => {
  const keys = Object.keys(obj) as K[];
  const out = {} as Record<K, R>;
  for (let key of keys) {
    out[key] = fn(obj[key], key);
  }
  return out;
};
