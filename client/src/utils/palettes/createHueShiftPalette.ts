import Color from 'color';
import { adjustHue } from './adjustHue';

export interface HueShiftPaletteOptions {
  baseColor: Color;
  minLuminosity: number;
  maxLuminosity: number;
  step: number;
  numColors?: number;
}

/**
 * Shifts a value `n` from the range [start1, end1] to the range [start2, end2]
 * by linear interpolation.
 *
 * @param n The value to shift.
 * @param start1 The start of the initial range.
 * @param end1 The end of the initial range.
 * @param start2 The start of the target range.
 * @param end2 The end of the target range.
 * @returns The shifted value.
 */
const shiftLuminosity = (
  n: number,
  start1: number,
  end1: number,
  start2: number,
  end2: number
) => {
  return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
};

/**
 * Creates a palette of colors that shift in hue and luminosity.
 *
 * The function starts with the given `baseColor` and then shifts the hue
 * by `step` for each color in the palette. The luminosity is also shifted
 * by linear interpolation between `minLuminosity` and `maxLuminosity`.
 * The resulting palette is symmetric around the `baseColor`.
 *
 * @param baseColor The base color from which to generate the palette.
 * @param minLuminosity The minimum luminosity of the palette.
 * @param maxLuminosity The maximum luminosity of the palette.
 * @param step The step size of the hue shift.
 * @param numColors The number of colors to generate in the palette.
 * @returns An array of Color objects representing the generated palette.
 */
export const createHueShiftPalette = ({
  baseColor,
  minLuminosity,
  maxLuminosity,
  step,
  numColors = 5,
}: HueShiftPaletteOptions) => {
  const result = [baseColor];

  let i = 1;
  while (result.length < numColors) {
    const hueDark = adjustHue(baseColor.hue() - step * i);
    const hueLight = adjustHue(baseColor.hue() + step * i);
    const lightnessDark = shiftLuminosity(
      i,
      0,
      4,
      baseColor.l(),
      minLuminosity
    );
    const lightnessLight = shiftLuminosity(
      i,
      0,
      4,
      baseColor.l(),
      maxLuminosity
    );

    result.push(Color.lch(lightnessDark, baseColor.chroma(), hueDark));

    if (result.length == numColors) {
      return result;
    }

    result.unshift(Color.lch(lightnessLight, baseColor.chroma(), hueLight));

    i++;
  }
  return result;
};
