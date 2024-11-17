import { FC, useContext, useState } from 'react';
import { ColorBlockComponent } from './component';
import Color from 'color';
import {
  copyToClipBoard,
  createMonochromaticPalette,
  NotificationContext,
} from '../../utils';

interface Props {
  color: Color;
  minimal?: boolean;
}

export const ColorBlock: FC<Props> = ({ color, minimal }) => {
  const [showShades, setShowShades] = useState(false);
  const { notifications, setNotifications } = useContext(NotificationContext);

  const shades = createMonochromaticPalette(color, 25);
  const handleCopy = () => {
    setNotifications([
      ...notifications,
      {
        message: 'Copied to Clipboard',
        severity: 'success',
        key: new Date().getTime(),
      },
    ]);
    copyToClipBoard(color.hex());
  };

  return (
    <ColorBlockComponent
      color={color}
      showShades={showShades}
      toggleShowShades={() => setShowShades(!showShades)}
      shades={shades}
      handleCopy={handleCopy}
      minimal={minimal}
    />
  );
};
