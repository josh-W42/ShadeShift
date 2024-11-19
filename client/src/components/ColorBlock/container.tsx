import { FC, useContext, useState } from 'react';
import { ColorBlockComponent } from './component';
import Color from 'color';
import {
  copyToClipBoard,
  createMonochromaticPalette,
  NotificationContext,
} from '../../utils';
import { useNavigate } from 'react-router-dom';
import { History } from '../../classes';

interface Props {
  color: Color;
  minimal?: boolean;
  noCopy?: boolean;
  onClick?: () => void;
  index?: number;
}

export const ColorBlock: FC<Props> = ({
  color,
  minimal,
  noCopy,
  onClick,
  index,
}) => {
  const [showShades, setShowShades] = useState(false);
  const { notifications, setNotifications } = useContext(NotificationContext);
  const navigate = useNavigate();

  const shades = createMonochromaticPalette(color, 25);
  const handleCopy = () => {
    if (noCopy) return;

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

  const handleShadeClick = (shade: Color) => {
    if (index === undefined) return;

    const sequence = window.location.pathname.split('-');

    if (index > 0) {
      sequence[index] = shade.hex().slice(1);
    } else {
      sequence[index] = `/${shade.hex().slice(1)}`;
    }

    History.emptyRedo();
    History.save(window.location.pathname);
    navigate(sequence.join('-'));
  };

  return (
    <ColorBlockComponent
      color={color}
      showShades={showShades}
      toggleShowShades={() => setShowShades(!showShades)}
      shades={shades}
      handleCopy={handleCopy}
      minimal={minimal}
      onClick={onClick}
      handleShadeClick={handleShadeClick}
    />
  );
};
