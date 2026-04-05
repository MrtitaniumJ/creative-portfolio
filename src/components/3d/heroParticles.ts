export type HeroParticle = {
  t: number;
  factor: number;
  speed: number;
  xFactor: number;
  yFactor: number;
  zFactor: number;
  phase: number;
};

export function buildHeroParticles(count: number): HeroParticle[] {
  const temp: HeroParticle[] = [];
  for (let i = 0; i < count; i++) {
    temp.push({
      t: Math.random() * 100,
      factor: 10 + Math.random() * 80,
      speed: 0.005 + Math.random() / 300,
      xFactor: -50 + Math.random() * 100,
      yFactor: -50 + Math.random() * 100,
      zFactor: -50 + Math.random() * 100,
      phase: Math.random() * Math.PI * 2,
    });
  }
  return temp;
}
