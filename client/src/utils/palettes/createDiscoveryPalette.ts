import Color from 'color';
import { createScientificPalette } from './createScientificPalette';
import { ColorHarmonyType, targetHueSteps } from './types';
import {
  differenceEuclidean,
  nearest,
  parseHex,
  Color as ColorAlias,
  formatHex,
  converter,
  Lch,
} from 'culori';

/**
 * The idea for this function was taken and adapted from this great article:
 * https://tympanus.net/codrops/2021/12/07/coloring-with-code-a-programmatic-approach-to-design/
 *
 * Please check it out if you want to learn more.
 */

/**
 * Creates a discovery palette based on the provided colors by finding the best
 * matching palettes for each color harmony type (analogous, triadic, tetradic, etc.).
 * The function measures the variance between the target and available colors using
 * the euclidean difference in the 'lch' color space, and selects the palette with
 * the least variance for each harmony type.
 *
 * * Since we use two Color libraries, 'Color' refers to the 'color' library and 'ColorAlias' refers to the 'culori' library.
 * * Note THIS FUNCTION REQUIRES AT LEAST 4 COLORS TO FUNCTION
 *
 * @param otherFormatColors An array of colors in a format compatible with 'Color'.
 * @returns A map where keys are color harmony types and values are arrays of Color
 * objects representing the best matching palette for each harmony type.
 */
export const createDiscoveryPalette = (
  otherFormatColors: Color[]
  // harmony?: ColorHarmonyType
) => {
  const colors = otherFormatColors.map((color) => {
    return converter('lch')(parseHex(color.hex()));
  });

  const palettes: Record<
    ColorHarmonyType,
    { colors: ColorAlias[]; variance: number }
  > = {
    analogous: {
      colors: [] as ColorAlias[],
      variance: Infinity,
    },
    triadic: {
      colors: [] as ColorAlias[],
      variance: Infinity,
    },
    tetradic: {
      colors: [] as ColorAlias[],
      variance: Infinity,
    },
    complementary: {
      colors: [] as ColorAlias[],
      variance: Infinity,
    },
    splitComplementary: {
      colors: [] as ColorAlias[],
      variance: Infinity,
    },
  };

  for (const color of colors) {
    const targetPalettes = createScientificPalette(Color(formatHex(color)));

    // switch (harmony) {
    //   case ColorHarmonyType.analogous:
    //     break;
    //   case ColorHarmonyType.complementary:
    //     break;
    //   case ColorHarmonyType.splitComplementary:
    //     break;
    //   case ColorHarmonyType.tetradic:
    //     break;
    //   case ColorHarmonyType.triadic:
    //     break;
    // }

    for (const paletteType of targetHueSteps.keys()) {
      const palette: Lch[] = [];

      let variance = 0;

      for (const targetColor of targetPalettes.get(paletteType)!) {
        const availableColors = colors.filter(
          (color) =>
            !palette.some(
              (otherColor) =>
                color.h === otherColor.h &&
                color.l === otherColor.l &&
                color.c === otherColor.c
            )
        );

        const match = nearest(
          availableColors,
          differenceEuclidean('lch')
        )(converter('lch')(parseHex(targetColor.hex())))[0];

        if (match === undefined) continue;

        variance += differenceEuclidean('lch')(
          converter('lch')(parseHex(targetColor.hex())),
          match
        );

        palette.push(match);
      }

      if (variance < palettes[paletteType].variance) {
        palettes[paletteType] = {
          colors: palette,
          variance,
        };
      }
    }
  }

  const result = new Map<ColorHarmonyType, Color[]>(
    [...targetHueSteps.keys()].map((harmony) => {
      return [
        harmony,
        palettes[harmony].colors.map((alias) => Color(formatHex(alias))),
      ];
    })
  );

  return result;
};
