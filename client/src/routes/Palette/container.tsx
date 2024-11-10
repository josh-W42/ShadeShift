import { FunctionComponent, useEffect, useState } from 'react';
import { PalettePageComponent } from './component';
import { useNavigate, useParams } from 'react-router-dom';
import Color from 'color';
import {
  ColorHarmonyType,
  createMonochromaticPalette,
  createScientificPalette,
  getRandomColor,
} from '../../utils';

export const PalettePage: FunctionComponent = () => {
  const { sequence } = useParams();
  const [colors, setColors] = useState<Color<string>[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (sequence === undefined) {
      throw new Error('Invalid Color');
    }

    if (sequence.includes('generate')) {
      const color = getRandomColor();
      const newSequence: string[] = [];

      const mono = createMonochromaticPalette(color);

      for (const color of mono) {
        newSequence.push(color.hex().slice(1));
      }

      // const palettes = createScientificPalette(color);

      // const harmonies = [
      //   ColorHarmonyType.analogous,
      //   ColorHarmonyType.triadic,
      //   ColorHarmonyType.complementary,
      //   ColorHarmonyType.tetradic,
      //   ColorHarmonyType.splitComplementary,
      // ];

      // palettes
      //   .get(harmonies[Math.floor(Math.random() * 4)])!
      //   .forEach((color) => {
      //     newSequence.push(color.hex().slice(1));
      //   });

      navigate(`/${newSequence.join('-')}`);
      return;
    }

    const result: Color[] = [];

    const colorCodes = sequence.split('-');

    if (colorCodes.length > 10) {
      throw new Error('Too Many Colors');
    }

    for (const color of colorCodes) {
      const code = `#${color}`;

      if (!CSS.supports('color', code)) {
        throw new Error('Invalid Color');
      }

      if (result.filter((color) => color.hex() === code).length > 0) {
        continue;
      }

      result.push(Color(code));
    }

    setColors(result);
  }, [sequence]);

  return <PalettePageComponent colors={colors} />;
};
