import Color from 'color';

/**
 * Generates a monochromatic palette based on the base color.
 * The palette consists of colors with varying lightness while
 * keeping the chroma and hue constant.
 *
 * @param baseColor The base color from which to generate the palette.
 * @param numColors The number of colors to generate in the palette. Defaults to 10.
 * @returns An array of hex color strings representing the monochromatic palette.
 */
export const createMonochromaticPalette = (
  baseColor: Color,
  numColors: number = 10
) => {
  const result = [];
  for (let i = 1; i <= numColors; i++) {
    result.push(Color.lch(i * 10, baseColor.chroma(), baseColor.hue()).hex());
  }
  return result;
};
