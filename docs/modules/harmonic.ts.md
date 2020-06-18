---
title: harmonic.ts
nav_order: 1
parent: Modules
---

## harmonic overview

Added in v0.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [create_harmonic_fns](#create_harmonic_fns)
  - [create_harmonic_group](#create_harmonic_group)
  - [run_harmonic_fns](#run_harmonic_fns)
  - [run_harmonic_group](#run_harmonic_group)

---

# utils

## create_harmonic_fns

This function closes around initial computations and returns a function
over time that is the closed solution to damped harmonic motion. The goal
is to front load as many computations as possible so the returned function
does not recompute unnecessarily

Time monotonically increases and is best passed as seconds from 0

**Signature**

```ts
export declare const create_harmonic_fns: (
  config: SpringConfig,
  { from, to }: SpringPath,
  initVelocity?: number
) => HarmonicFns
```

Added in v0.0.0

## create_harmonic_group

Create a group of harmonic functions for a shared config.

**Signature**

```ts
export declare const create_harmonic_group: <T extends string>(
  config: SpringConfig,
  { from, to, velocity }: PathGroup<T>
) => Record<T, HarmonicFns>
```

Added in v0.0.0

## run_harmonic_fns

Takes some harmonic functions and returns a function that
takes in time in seconds and returns a tuple with the
position and velocity at that moment.

**Signature**

```ts
export declare const run_harmonic_fns: ({ position, velocity }: HarmonicFns) => (time: number) => [number, number]
```

Added in v0.0.0

## run_harmonic_group

Takes a harmonic function group and the current time and returns
a full PathGroupResult.

**Signature**

```ts
export declare const run_harmonic_group: <T extends string>(
  group: Record<T, HarmonicFns>,
  time: number
) => Record<T, { position: number; velocity: number }>
```

Added in v0.0.0
