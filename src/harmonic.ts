/**
 * @since 0.0.0
 */

import {
  HarmonicFns,
  SpringConfig,
  SpringPath,
  PathGroup,
  PathFns,
  PathGroupResult,
} from "./models";
import { notNil, mapObject } from "./utilities";

/**
 * Calculates the real part of the omega value. This is the dampened
 * angular momentum constact of the harmonic function.
 */
const calc_omega = ({ mass, friction, tension }: SpringConfig) =>
  Math.sqrt(Math.abs(Math.pow(friction, 2) - 4 * mass * tension)) / (2 * mass);

/**
 * Calculates the decay constant of the harmonic function.
 */
const calc_damp = ({ mass, friction }: SpringConfig): number =>
  (-1 * friction) / (2 * mass);

/**
 * Returns the position function of a dampened harmonic motion model for time
 * in seconds.
 *
 * * omega - the dampened angular psuedo-frequency constant
 * * demp - the exponential decay constant
 * * amplitude - the starting position (relative to rest)
 * * b - the coefficient for maintaining initial velocity
 * * rest - the target rest value
 */
const calc_position = (
  omega: number,
  damp: number,
  amplitude: number,
  b: number,
  rest: number
) => (time: number): number =>
  Math.exp(damp * time) *
    (amplitude * Math.cos(omega * time) + b * Math.sin(omega * time)) +
  rest;

/**
 * Returns the velocity function of a dampened harmonic motion model for time
 * in seconds. This is the derivative of the position function. It is used
 *
 * * omega - the dampened angular psuedo-frequency constant
 * * demp - the exponential decay constant
 * * amplitude - the starting position (relative to rest)
 * * b - the coefficient for maintaining initial velocity
 */
const calc_velocity = (
  omega: number,
  damp: number,
  amplitude: number,
  b: number
) => (time: number): number =>
  Math.exp(damp * time) *
  ((b * damp - amplitude * omega) * Math.sin(omega * time) +
    (amplitude * damp + b * omega) * Math.cos(omega * time));

const calc_b = (
  omega: number,
  damp: number,
  initPosition: number,
  initVelocity: number
): number => (initVelocity - initPosition * damp) / omega;

/**
 * This function closes around initial computations and returns a function
 * over time that is the closed solution to damped harmonic motion. The goal
 * is to front load as many computations as possible so the returned function
 * does not recompute unnecessarily
 *
 * Time monotonically increases and is best passed as seconds from 0
 *
 * @since 0.0.0
 */
export const create_harmonic_fns = (
  config: SpringConfig,
  { from, to }: SpringPath,
  initVelocity: number = 0
): HarmonicFns => {
  const omega = calc_omega(config);
  const damp = calc_damp(config);
  const amplitude = from - to;
  const rest = to;
  const b = calc_b(omega, damp, from, initVelocity);

  return {
    position: calc_position(omega, damp, amplitude, b, rest),
    velocity: calc_velocity(omega, damp, amplitude, b),
  };
};

/**
 * Takes some harmonic functions and returns a function that
 * takes in time in seconds and returns a tuple with the
 * position and velocity at that moment.
 *
 * @since 0.0.0
 */
export const run_harmonic_fns = ({ position, velocity }: HarmonicFns) => (
  time: number
): [number, number] => [position(time), velocity(time)];

/**
 * Create a group of harmonic functions for a shared config.
 *
 * @since 0.0.0
 */
export const create_harmonic_group = <T extends string>(
  config: SpringConfig,
  { from, to, velocity }: PathGroup<T>
): Record<T, HarmonicFns> => {
  const omega = calc_omega(config);
  const damp = calc_damp(config);

  velocity = notNil(velocity) ? velocity : mapObject(from, () => 0);

  return mapObject(from, (f, key) => {
    const amplitude = f - to[key];
    const rest = to[key];
    const v = velocity![key];
    const b = calc_b(omega, damp, amplitude, v);

    return {
      position: calc_position(omega, damp, amplitude, b, rest),
      velocity: calc_velocity(omega, damp, amplitude, b),
    };
  });
};

/**
 * Takes a harmonic function group and the current time and returns
 * a full PathGroupResult.
 *
 * @since 0.0.0
 */
export const run_harmonic_group = <T extends string>(
  group: Record<T, HarmonicFns>,
  time: number
): Record<T, { position: number; velocity: number }> =>
  mapObject(group, ({ position, velocity }) => ({
    position: position(time),
    velocity: velocity(time),
  }));
