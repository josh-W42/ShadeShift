import Color from 'color';

/**
 * Creates a monochromatic palette given a base color.
 *
 * * A monochromatic color palette is a set of colors that all have the same hue.
 * * The palette is created by varying the lightness of the base color.
 *
 * *Note that lightness (l) and saturation (s) values are in the range [0, 100]
 *
 * @param baseColor The base color
 * @param numColors The number of colors in the palette
 * @returns An array of colors from the monochromatic palette
 */
export const createMonochromaticPalette = (
  baseColor: Color,
  numColors: number = 10
) => {
  let left = baseColor.l();
  const result: Color[] = [baseColor];
  const equalSplit = Math.round(100 / numColors);

  while (left - equalSplit >= 0 && result.length < numColors) {
    result.push(Color(result[result.length - 1]).l(left - equalSplit));
    left -= equalSplit;
  }

  result.reverse();
  let right = baseColor.l();

  while (right + equalSplit <= 100 && result.length < numColors) {
    result.push(Color(result[result.length - 1].l(right + equalSplit)));
    right += equalSplit;
  }

  return result;
};
