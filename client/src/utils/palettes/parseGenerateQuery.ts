import Color from 'color';
import { GeneratePaletteOptions } from './generatePalette';
import { GenerationType } from './types';
import { GenConfigParams } from '../genConfig';

/**
 * Parse URLSearchParams into GeneratePaletteOptions.
 *
 * The following keys are supported:
 *
 * - `type`: The type of palette to generate.
 * - `color`: The base color for the palette.
 * - `num_colors`: The number of colors to generate in the palette.
 *
 * @param params The URLSearchParams to parse.
 * @returns The GeneratePaletteOptions parsed from the query string.
 */
export const parseGenerateQuery: (
  params: URLSearchParams
) => GeneratePaletteOptions = (params: URLSearchParams) => {
  const opts: GeneratePaletteOptions = { type: GenerationType.random };

  if (params.size < 1) return opts;

  for (const [key, value] of params.entries()) {
    switch (key) {
      case GenConfigParams.type:
        opts.type = value as GenerationType;
        break;
      case GenConfigParams.color:
        opts.baseColor = Color(`#${value}`);
        break;
      case GenConfigParams.num_colors:
        opts.numColors = parseInt(value);
        break;
      default:
        break;
    }
  }

  return opts;
};
