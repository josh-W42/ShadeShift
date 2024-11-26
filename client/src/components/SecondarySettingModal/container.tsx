import { FC, useContext, useState } from 'react';
import { SecondarySettingModalComponent } from './component';
import { Context, getColorFormat } from '../../utils';
import Color from 'color';

interface Props {
  color: Color;
  classes?: string;
}

export const SecondarySettingModal: FC<Props> = ({ color, classes }) => {
  const [open, setOpen] = useState(false);
  const { secondaryInfo } = useContext(Context);

  return (
    <SecondarySettingModalComponent
      openModal={[open, () => setOpen(!open)]}
      colorFormat={[
        secondaryInfo.format,
        (val) => secondaryInfo.setFormat(val),
      ]}
      output={getColorFormat(secondaryInfo.format, color)}
      classes={classes}
    />
  );
};
