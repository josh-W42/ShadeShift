import Color from 'color';
import { ColorFormats } from './types';

/**
 * Converts a color to a string representation in a given color format.
 *
 * @param format The color format to convert to. Can be one of:
 *   - 'rgb'
 *   - 'name'
 *   - 'cmyk'
 *   - 'hsl'
 *   - 'hsv'
 *   - 'lch'
 *   - 'hwb'
 * @param color The color to convert.
 *
 * @returns A string representation of the color in the given format.
 */
export const getColorFormat = (format: ColorFormats, color: Color) => {
  switch (format) {
    case ColorFormats.rgb:
      return color.toString().toUpperCase();
    case ColorFormats.name:
      return `${color.keyword()[0].toUpperCase()}${color.keyword().slice(1)}`;
    case ColorFormats.cmyk:
      return `CMYK(${Math.round(color.cyan())}, ${Math.round(
        color.magenta()
      )}, ${Math.round(color.yellow())}, ${Math.round(color.black())})
      `;
    case ColorFormats.hsl:
      return `HSL: (${Math.round(color.hue())} ${Math.round(
        color.saturationl()
      )}, ${Math.round(color.l())})`;
    case ColorFormats.hsv:
      return `HSV: (${Math.round(color.hue())}, ${Math.round(
        color.saturationv()
      )}, ${Math.round(color.value())})`;
    case ColorFormats.lch:
      return `LCH: (${Math.round(color.l())}, ${Math.round(
        color.chroma()
      )}, ${Math.round(color.hue())})`;
    case ColorFormats.hwb:
      return `HWB: (${Math.round(color.hue())}, ${Math.round(
        color.white()
      )}, ${Math.round(color.black())})`;
    default:
      return color.toString();
  }
};
