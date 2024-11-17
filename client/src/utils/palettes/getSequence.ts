import Color from 'color';

/**
 * Takes an array of colors and returns a string representing the sequence.
 * The string is in the format '/hex1-hex2-...-hexN' where hex1, hex2, ..., hexN
 * are the hex codes of the colors in the array.
 *
 * @param colors The array of colors
 * @returns The sequence string
 */
export const getSequence = (colors: Color[]) => {
  return `/${colors.map((color) => color.hex().slice(1)).join('-')}`;
};
