import Color from 'color';
import { adjustHue } from './adjustHue';
import { ColorHarmonyType, targetHueSteps } from './types';

/**
 * TODO:
 *
 * Tetradic is not exactly correct.
 *
 * At the present time, tetradic selects colors that are positioned 90 degrees
 * from the base color, and while this is a tetradic color scheme, not all
 * tetradic color schemes are square, they can be rectangles. As long as there are
 * 2 complementary sets of colors then that too can be tetradic.
 */

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
  const result = new Map<ColorHarmonyType, Color[]>();

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
