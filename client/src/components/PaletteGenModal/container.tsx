import { FC, useContext, useState } from 'react';
import { PaletteGenModalComponent } from './component';
import { Context } from '../../utils';

export const PaletteGenModal: FC = () => {
  const { genConfig } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState<string>(genConfig.value.color || '000000');
  const [numColors, setNumColors] = useState(genConfig.value.num_colors || 5);

  return (
    <PaletteGenModalComponent
      modalOpen={[open, () => setOpen(!open)]}
      genConfig={[genConfig.value, genConfig.setConfig]}
      genColor={[color, (hex) => setColor(hex)]}
      numColors={[numColors, setNumColors]}
    />
  );
};
