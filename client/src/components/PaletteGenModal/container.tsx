import { FC, useContext, useState } from 'react';
import { PaletteGenModalComponent } from './component';
import { Context } from '../../utils';

export const PaletteGenModal: FC = () => {
  const [open, setOpen] = useState(false);
  const { genConfig } = useContext(Context);

  return (
    <PaletteGenModalComponent
      open={open}
      toggleOpen={() => setOpen(!open)}
      config={genConfig.value}
      setGenConfig={genConfig.setConfig}
    />
  );
};
