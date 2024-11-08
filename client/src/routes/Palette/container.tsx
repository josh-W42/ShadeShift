import { FunctionComponent, useEffect, useState } from 'react';
import { PalettePageComponent } from './component';
import { useNavigate, useParams } from 'react-router-dom';
import Color from 'color';
import {
  ColorHarmonyType,
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
      const palettes = createScientificPalette(getRandomColor());

      const newSequence: string[] = [];

      const harmonies = [
        ColorHarmonyType.analogous,
        ColorHarmonyType.triadic,
        ColorHarmonyType.complementary,
        ColorHarmonyType.tetradic,
        ColorHarmonyType.splitComplementary,
      ];

      palettes
        .get(harmonies[Math.floor(Math.random() * 4)])!
        .forEach((color) => {
          newSequence.push(color.hex().slice(1));
        });
      navigate(`/${newSequence.join('-')}`);
      return;
    }

    const result = [];
    for (const color of sequence.split('-')) {
      const code = `#${color}`;

      if (!CSS.supports('color', code)) {
        throw new Error('Invalid Color');
      }

      result.push(Color(code));
    }
    setColors(result);
  }, [sequence]);

  return <PalettePageComponent colors={colors} />;
};
