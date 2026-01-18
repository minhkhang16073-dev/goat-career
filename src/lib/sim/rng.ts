export type RNG = {
  next: () => number;
  nextInt: (min: number, max: number) => number;
  seed: number;
};

export const createRng = (seed: number): RNG => {
  let t = seed >>> 0;
  const next = () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  return {
    seed: t,
    next,
    nextInt: (min, max) => Math.floor(next() * (max - min + 1)) + min,
  };
};

export const nextSeed = (seed: number) => (seed * 1664525 + 1013904223) % 4294967296;
