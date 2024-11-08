import Color from 'color';
import { adjustHue } from './adjustHue';

const targetHueSteps = new Map([
  ['analogous', [0, 30, 60]],
  ['triadic', [0, 120, 240]],
  ['tetradic', [0, 90, 180, 270]],
  ['complementary', [0, 180]],
  ['splitComplementary', [0, 150, 210]],
]);

/**
 * Generates a scientific palette based on the input color.
 * The palette is created by varying the hue of the input color
 * according to predefined hue steps for different color harmony types.
 *
 * @param color The base color from which to generate the palette.
 * @returns A map where keys are color harmony types (e.g., 'analogous', 'triadic')
 * and values are arrays of Colors that belong to the respective harmony.
 */
export const createScientificPalette = (color: Color) => {
  const result = new Map<string, Color[]>();

  for (const type of targetHueSteps.keys()) {
    result.set(
      type,
      targetHueSteps.get(type)!.map((step) => {
        const newColor = color.lch(
          color.l(),
          color.chroma(),
          adjustHue(color.hue() + step)
        );

        return newColor;
      })
    );
  }

  return result;
};
