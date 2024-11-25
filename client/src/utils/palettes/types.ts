import { UserData } from '../user';

export const enum ColorHarmonyType {
  analogous = 'analogous',
  triadic = 'triadic',
  tetradic = 'tetradic',
  complementary = 'complementary',
  splitComplementary = 'splitComplementary',
}

export const targetHueSteps = new Map([
  [ColorHarmonyType.analogous, [0, 30, 60]],
  [ColorHarmonyType.triadic, [0, 120, 240]],
  [ColorHarmonyType.tetradic, [0, 90, 180, 270]],
  [ColorHarmonyType.complementary, [0, 180]],
  [ColorHarmonyType.splitComplementary, [0, 150, 210]],
]);

export enum GenerationType {
  random = 'Random',
  monochromatic = 'Monochromatic',
  gradient = 'Gradient',
  hueShift = 'Hue Shift',
  analogous = 'Analogous',
  triadic = 'Triadic',
  tetradic = 'Tetradic',
  complementary = 'Complementary',
  splitComplementary = 'Split Complementary',
  // discoveryRandom = 'Discovery Random', Not Ready
}

export interface PaletteData {
  id: string;
  colors: string;
  users?: UserData[];
}
