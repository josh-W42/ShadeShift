import Color from 'color';

/**
 * Converts a sequence string of hexadecimal color codes into an array of Color objects.
 *
 * The sequence string is expected to be in the format '/hex1-hex2-...-hexN', where hex1,
 * hex2, ..., hexN are the hexadecimal color codes without the leading '#'.
 *
 * @param sequence The sequence string of color codes.
 * @returns An array of Color objects corresponding to the color codes in the sequence.
 */
export const sequenceToPalette = (sequence: string) => {
  if (!sequence) return [];

  return sequence
    .slice(1)
    .split('-')
    .map((hex) => Color(`#${hex}`));
};
