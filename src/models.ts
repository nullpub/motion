/**
 * @since 0.0.0
 */

/**
 * @since 0.0.0
 */
export interface SpringConfig {
  mass: number;
  tension: number;
  friction: number;
}

/**
 * @since 0.0.0
 */
export interface SpringPath {
  from: number;
  to: number;
}

/**
 * @since 0.0.0
 */
export interface PathGroup<T extends string> {
  from: Record<T, number>;
  to: Record<T, number>;
  velocity?: Record<T, number>;
}

/**
 * @since 0.0.0
 */
export interface PathGroupResult<T extends string> {
  position: Record<T, number>;
  velocity: Record<T, number>;
}

/**
 * @since 0.0.0
 */
export type PathFns<T extends string> = {
  [K in T]: HarmonicFns;
};

/**
 * @since 0.0.0
 */
export interface HarmonicFns {
  position: (time: number) => number;
  velocity: (time: number) => number;
}
