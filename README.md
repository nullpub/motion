# @nll/motion

[Documentation](https://nullpub.github.io/motion/)

A quick run at damped harmonic animations (springs). The libraries that I've looked at have inscrutable algorithms:

- react-motion
- wobble
- react-spring
- etc

The current status of this package is a proof of concept.

# Goals

1. Implement simple and performant combinators for harmonic motion in TypeScript.
2. Use rxjs with the requestAnimationFrame scheduler to reduce requestAnimationFrame calls.
3. Explore different apis and interfaces for grouped paths and state based animation.
4. Explore different apis for chained animations.
5. Once the api is solid, implement a wasm module in rust for high performance computation.
