---
title: rxjs.ts
nav_order: 4
parent: Modules
---

## rxjs overview

Added in v0.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [duration](#duration)
  - [linear](#linear)
  - [msElapsed](#mselapsed)
  - [scale](#scale)
  - [spring](#spring)
  - [springThen](#springthen)

---

# utils

## duration

Returns an observable that emits values between 0 and 1 inclusive over
the period provided in ms.

**Signature**

```ts
export declare const duration: (ms: number, scheduler?: Scheduler) => Observable<number>
```

Added in v0.0.0

## linear

Linear path combinator

**Signature**

```ts
export declare const linear: (ms: number, to: number, from?: number, scheduler?: Scheduler) => Observable<number>
```

Added in v0.0.0

## msElapsed

Returns an observable that emits the milliseconds elapsed since the
observable was subscribed to.

**Signature**

```ts
export declare const msElapsed: (scheduler?: Scheduler) => Observable<number>
```

Added in v0.0.0

## scale

Scales from one value to another. Starting value defaults to 0.

**Signature**

```ts
export declare const scale: (to: number, from?: number) => (percentage: number) => number
```

Added in v0.0.0

## spring

Spring path combinator

**Signature**

```ts
export declare const spring: (config: SpringConfig, path: SpringPath, initVelocity?: number) => Observable<number>
```

Added in v0.0.0

## springThen

Spring path combinator that can be changed

**Signature**

```ts
export declare const springThen: (
  config: SpringConfig,
  path: SpringPath,
  initVelocity?: number
) => {
  position$: Observable<number>
  status: () => { time: number; from: number; to: number; fns: HarmonicFns }
  next: (target: number) => void
}
```

Added in v0.0.2
