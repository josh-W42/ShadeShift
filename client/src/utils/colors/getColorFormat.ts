import Color from 'color';
import { ColorFormats } from './types';

/**
 * Returns a string representation of the given color in the specified format.
 *
 * @param format - The desired color format.
 * @param color - The color to format.
 * @returns A string representation of the color in the specified format.
 */
export const getColorFormat = (format: ColorFormats, color: Color) => {
  switch (format) {
    case ColorFormats.rgb:
      return `rgb(${Math.round(color.red())}, ${Math.round(
        color.green()
      )}, ${Math.round(color.blue())})`;
    case ColorFormats.name:
      return `${color.keyword()[0].toUpperCase()}${color.keyword().slice(1)}`;
    case ColorFormats.cmyk:
      return `cmyk(${Math.round(color.cyan())}%, ${Math.round(
        color.magenta()
      )}%, ${Math.round(color.yellow())}%, ${Math.round(color.black())}%)
      `;
    case ColorFormats.hsl:
      return `hsl(${Math.round(color.hue())}, ${Math.round(
        color.saturationl()
      )}%, ${Math.round(color.l())}%)`;
    case ColorFormats.hsv:
      return `hsv(${Math.round(color.hue())}, ${Math.round(
        color.saturationv()
      )}%, ${Math.round(color.value())}%)`;
    case ColorFormats.lch:
      return `lch: ${Math.round(color.l())}, ${Math.round(
        color.chroma()
      )}, ${Math.round(color.hue())}`;
    case ColorFormats.hwb:
      return `hwb(${Math.round(color.hue())}, ${Math.round(
        color.white()
      )}%, ${Math.round(color.black())}%)`;
    case ColorFormats.hex:
      return color.hex();
    default:
      return color.toString();
  }
};
