---
title: models.ts
nav_order: 3
parent: Modules
---

## models overview

Added in v0.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [HarmonicFns (interface)](#harmonicfns-interface)
  - [PathFns (type alias)](#pathfns-type-alias)
  - [PathGroup (interface)](#pathgroup-interface)
  - [PathGroupResult (interface)](#pathgroupresult-interface)
  - [SpringConfig (interface)](#springconfig-interface)
  - [SpringPath (interface)](#springpath-interface)

---

# utils

## HarmonicFns (interface)

**Signature**

```ts
export interface HarmonicFns {
  position: (time: number) => number
  velocity: (time: number) => number
}
```

Added in v0.0.0

## PathFns (type alias)

**Signature**

```ts
export type PathFns<T extends string> = {
  [K in T]: HarmonicFns
}
```

Added in v0.0.0

## PathGroup (interface)

**Signature**

```ts
export interface PathGroup<T extends string> {
  from: Record<T, number>
  to: Record<T, number>
  velocity?: Record<T, number>
}
```

Added in v0.0.0

## PathGroupResult (interface)

**Signature**

```ts
export interface PathGroupResult<T extends string> {
  position: Record<T, number>
  velocity: Record<T, number>
}
```

Added in v0.0.0

## SpringConfig (interface)

**Signature**

```ts
export interface SpringConfig {
  mass: number
  tension: number
  friction: number
}
```

Added in v0.0.0

## SpringPath (interface)

**Signature**

```ts
export interface SpringPath {
  from: number
  to: number
}
```

Added in v0.0.0
