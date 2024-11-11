import Color from 'color';
import { adjustHue } from './adjustHue';
import { targetHueSteps } from './types';

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
        return Color(color).hue(adjustHue(color.hue() + step));
      })
    );
  }

  return result;
};
