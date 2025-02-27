import Color from 'color';
import { ColorHarmonyType, GenerationType, targetHueSteps } from './types';
import { createScientificPalette } from './createScientificPalette';
import { getRandomColor } from './getRandomColor';
import { createMonochromaticPalette } from './createMonochromaticPalette';
import { createGradientPalette } from './createGradientPalette';
import { createHueShiftPalette } from './createHueShiftPalette';

export interface GeneratePaletteOptions {
  baseColor?: Color;
  secondaryColor?: Color;
  hueShiftStep?: number;
  type?: GenerationType;
  numColors?: number;
  include?: Color[];
}

const randomOptions: GenerationType[] = (
  [...Object.values(GenerationType)] as GenerationType[]
).filter((type) => {
  return (
    type != GenerationType.random &&
    !targetHueSteps.has(type as unknown as ColorHarmonyType)
  );
});

// const examples = '947766-B49D94-4D342C-DFD7D9-7D513C'
//   .split('-')
//   .map((hex) => Color(`#${hex}`));

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

  if (opt.numColors === undefined) {
    opt.numColors = Math.floor(Math.random() * 9) + 2;
  }

  if (opt.secondaryColor === undefined) {
    opt.secondaryColor = getRandomColor();
  }

  if (opt.hueShiftStep === undefined) {
    opt.hueShiftStep = Math.floor(Math.random() * 120) + 1;
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

    case GenerationType.gradient:
      return createGradientPalette(
        opt.numColors,
        opt.baseColor,
        opt.secondaryColor
      );

    case GenerationType.hueShift:
      return createHueShiftPalette({
        baseColor: opt.baseColor,
        minLuminosity: Math.floor(Math.random() * 50),
        maxLuminosity: Math.floor(Math.random() * 50) + 50,
        step: opt.hueShiftStep,
        numColors: opt.numColors,
      });

    // // Case Deemed not Ready
    // case GenerationType.discoveryRandom:
    //   return createDiscoveryPalette(examples).get(
    //     [...targetHueSteps.keys()][
    //       Math.floor(Math.random() * targetHueSteps.size)
    //     ]
    //   )!;

    default:
      return generatePalette({
        ...opt,
        type: randomOptions[Math.floor(Math.random() * randomOptions.length)],
      });
  }
};
