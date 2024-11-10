import { FC, useState } from 'react';
import { ColorBlockComponent } from './component';
import Color from 'color';
import { createMonochromaticPalette } from '../../utils';

interface Props {
  color: Color;
}

export const ColorBlock: FC<Props> = ({ color }) => {
  const [showShades, setShowShades] = useState(false);

  const shades = createMonochromaticPalette(color, 25);

  return (
    <ColorBlockComponent
      color={color}
      showShades={showShades}
      toggleShowShades={() => setShowShades(!showShades)}
      shades={shades}
    />
  );
};
