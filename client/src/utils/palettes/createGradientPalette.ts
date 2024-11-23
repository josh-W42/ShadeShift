import Color from 'color';

/**
 * Generates a gradient palette of colors by interpolating between the two colors.
 *
 * @param {number} [numColors=5] The number of colors to generate in the palette.
 * @param {Color} startColor The starting color of the gradient.
 * @param {Color} endColor The ending color of the gradient.
 * @returns {Color[]} A list of colors in the gradient palette.
 */
export const createGradientPalette = (
  numColors: number = 5,
  startColor: Color,
  endColor: Color
) => {
  // Since the start and end colors are in the palette!
  const n = numColors - 1;

  const redDelta = endColor.red() - startColor.red();
  const redShift = redDelta / n;

  const greenDelta = endColor.green() - startColor.green();
  const greenShift = greenDelta / n;

  const blueDelta = endColor.blue() - startColor.blue();
  const blueShift = blueDelta / n;

  const results = [startColor];

  for (let i = 1; i < n; i++) {
    const currentRed = results[i - 1].red();
    const currentGreen = results[i - 1].green();
    const currentBlue = results[i - 1].blue();
    results.push(
      results[i - 1]
        .red(currentRed + redShift)
        .green(currentGreen + greenShift)
        .blue(currentBlue + blueShift)
    );
  }

  results.push(endColor);
  return results;
};
