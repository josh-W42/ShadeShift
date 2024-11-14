import { FunctionComponent, useEffect, useState } from 'react';
import { PalettePageComponent } from './component';
import { useNavigate, useParams } from 'react-router-dom';
import Color from 'color';
import { generatePalette, parseGenerateQuery } from '../../utils';
import { History } from '../../classes';

export const PalettePage: FunctionComponent = () => {
  const { sequence } = useParams();
  const [colors, setColors] = useState<Color<string>[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (sequence === undefined) {
      throw new Error('Invalid Color');
    }

    if (sequence.includes('generate')) {
      const query = new URLSearchParams(window.location.search);
      const options = parseGenerateQuery(query);

      const newSequence: string[] = [];
      const palette = generatePalette(options);

      for (const color of palette) {
        newSequence.push(color.hex().slice(1));
      }

      navigate(`/${newSequence.join('-')}`);
      History.empty();
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
