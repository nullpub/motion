/**
 * @since 0.0.0
 */

/**
 * @since 0.0.0
 */
export const notNil = <T>(t: T): t is NonNullable<T> =>
  t !== undefined && t !== null;
