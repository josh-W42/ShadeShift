import Color from 'color';

/**
 * Returns a Color object with a random RGB value.
 *
 * The RGB values are chosen independently and uniformly from the range [0, 256).
 * @returns A Color object with a random RGB value.
 */
export const getRandomColor = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  return Color.rgb(red, green, blue);
};
