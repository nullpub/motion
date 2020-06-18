/**
 * @since 0.0.0
 */

import { of, defer, interval, animationFrameScheduler, Scheduler } from "rxjs";
import { map, takeWhile, concat } from "rxjs/operators";

import { create_harmonic_fns } from "./harmonic";
import { SpringConfig, SpringPath } from "./models";

/**
 * Returns an observable that emits the milliseconds elapsed since the
 * observable was subscribed to.
 *
 * @since 0.0.0
 */
export const msElapsed = (scheduler: Scheduler = animationFrameScheduler) =>
  defer(() => {
    const start = scheduler.now();
    return interval(0, scheduler).pipe(map(() => scheduler.now() - start));
  });

/**
 * Returns an observable that emits values between 0 and 1 inclusive over
 * the period provided in ms.
 *
 * @since 0.0.0
 */
export const duration = (
  ms: number,
  scheduler: Scheduler = animationFrameScheduler
) =>
  msElapsed(scheduler).pipe(
    map((elapsed) => elapsed / Math.floor(Math.max(ms, 1))),
    takeWhile((percentage) => percentage <= Math.min(percentage, 1)),
    concat(of(1))
  );

/**
 * Scales from one value to another. Starting value defaults to 0.
 *
 * @since 0.0.0
 */
export const scale = (to: number, from: number = 0) => (percentage: number) =>
  from + (to - from) * percentage;

/**
 * Linear path combinator
 *
 * @since 0.0.0
 */
export const linear = (
  ms: number,
  to: number,
  from: number = 0,
  scheduler: Scheduler = animationFrameScheduler
) => duration(ms, scheduler).pipe(map(scale(to, from)));

/**
 * Spring path combinator
 *
 * @since 0.0.0
 */
export const spring = (
  config: SpringConfig,
  path: SpringPath,
  initVelocity: number = 0
) => {
  const { position } = create_harmonic_fns(config, path, initVelocity);
  return msElapsed().pipe(
    map((time) => time / 1000),
    map(position)
  );
};
