export type AmbientParticle = {
  t: number;
  factor: number;
  speed: number;
  xFactor: number;
  yFactor: number;
  zFactor: number;
  mx: number;
  my: number;
};

export function buildAmbientParticles(count: number): AmbientParticle[] {
  const temp: AmbientParticle[] = [];
  for (let i = 0; i < count; i++) {
    temp.push({
      t: Math.random() * 100,
      factor: 10 + Math.random() * 80,
      speed: 0.005 + Math.random() / 300,
      xFactor: -50 + Math.random() * 100,
      yFactor: -50 + Math.random() * 100,
      zFactor: -50 + Math.random() * 100,
      mx: 0,
      my: 0,
    });
  }
  return temp;
}
