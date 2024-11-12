import Color from 'color';
import { ColorHarmonyType, GenerationType } from './types';
import { createScientificPalette } from './createScientificPalette';
import { getRandomColor } from './getRandomColor';
import { createMonochromaticPalette } from './createMonochromaticPalette';

export interface GeneratePaletteOptions {
  baseColor?: Color;
  type?: GenerationType;
  numColors?: number;
  include?: Color[];
}

const randomOptions: GenerationType[] = (
  [...Object.values(GenerationType)] as GenerationType[]
).filter((type) => type != GenerationType.random);

/**
 * Generates a color palette given a base color and type.
 *
 * * If the base color is not supplied, a random color is chosen.
 * * If the type is not supplied, a random palette is chosen.
 * * If the type is not recognized, a random palette is generated.
 *
 * @param opt Options object with the following properties:
 *   baseColor: the color to generate the palette from
 *   type: the type of palette to generate
 *   numColors: the number of colors to generate in the palette
 *   include: an array of colors to include in the palette
 * @returns an array of colors
 */
export const generatePalette: (opt?: GeneratePaletteOptions) => Color[] = (
  opt
) => {
  if (opt === undefined) {
    opt = {
      baseColor: getRandomColor(),
      type: GenerationType.random,
    };
  }

  if (opt.baseColor === undefined) {
    opt.baseColor = getRandomColor();
  }

  if (opt.type === undefined) {
    opt.type = GenerationType.random;
  }

  switch (opt.type) {
    case GenerationType.random:
      return generatePalette({
        ...opt,
        type: randomOptions[Math.floor(Math.random() * randomOptions.length)],
      });

    case GenerationType.monochromatic:
      return createMonochromaticPalette(opt.baseColor, opt.numColors);

    case GenerationType.analogous:
      return createScientificPalette(opt.baseColor).get(
        ColorHarmonyType.analogous
      )!;

    case GenerationType.triadic:
      return createScientificPalette(opt.baseColor).get(
        ColorHarmonyType.triadic
      )!;

    case GenerationType.tetradic:
      return createScientificPalette(opt.baseColor).get(
        ColorHarmonyType.tetradic
      )!;

    case GenerationType.complementary:
      return createScientificPalette(opt.baseColor).get(
        ColorHarmonyType.complementary
      )!;

    case GenerationType.splitComplementary:
      return createScientificPalette(opt.baseColor).get(
        ColorHarmonyType.splitComplementary
      )!;

    default:
      return generatePalette({
        ...opt,
        type: randomOptions[Math.floor(Math.random() * randomOptions.length)],
      });
  }
};
