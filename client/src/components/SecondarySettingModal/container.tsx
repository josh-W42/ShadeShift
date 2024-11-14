import { FC, useContext, useState } from 'react';
import { SecondarySettingModalComponent } from './component';
import { getColorFormat, SecondaryInfoContext } from '../../utils';
import Color from 'color';

interface Props {
  color: Color;
  classes?: string;
}

export const SecondarySettingModal: FC<Props> = ({ color, classes }) => {
  const [open, setOpen] = useState(false);
  const { format, setFormat } = useContext(SecondaryInfoContext);

  return (
    <SecondarySettingModalComponent
      openModal={[open, () => setOpen(!open)]}
      colorFormat={[format, (val) => setFormat(val)]}
      output={getColorFormat(format, color)}
      classes={classes}
    />
  );
};
