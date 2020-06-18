---
title: utilities.ts
nav_order: 5
parent: Modules
---

## utilities overview

Added in v0.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [mapObject](#mapobject)
  - [notNil](#notnil)

---

# utils

## mapObject

**Signature**

```ts
export declare const mapObject: <K extends string, V, R>(obj: Record<K, V>, fn: (value: V, key: K) => R) => Record<K, R>
```

Added in v0.0.2

## notNil

**Signature**

```ts
export declare const notNil: <T>(t: T) => t is NonNullable<T>
```

Added in v0.0.0
