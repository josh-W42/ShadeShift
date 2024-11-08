/**
 * Adjust hue to be within the range [0, 360).
 * This is necessary because the Color library sometimes returns negative hue values.
 * @param hue hue value
 * @returns hue value within the range [0, 360)
 */
export const adjustHue: (hue: number) => number = (hue) => {
  if (hue < 0) {
    hue += Math.ceil(-hue / 360) * 360;
  }
  return hue % 360;
};
