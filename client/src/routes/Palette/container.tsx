import { FunctionComponent, useEffect, useState } from 'react';
import { PalettePageComponent } from './component';
import { useParams } from 'react-router-dom';
import Color from 'color';

export const PalettePage: FunctionComponent = () => {
  const { sequence } = useParams();
  const [colors, setColors] = useState<Color<string>[]>([]);

  useEffect(() => {
    if (sequence === undefined) {
      throw new Error('Invalid Color');
    }

    if (sequence.includes('generate')) {
      // Generate a random palette.
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
