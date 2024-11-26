import { FC, useContext, useState } from 'react';
import { ViewPaletteModalComponent } from './component';
import {
  ColorFormats,
  Context,
  copyToClipBoard,
  getColorFormat,
} from '../../utils';

export const ViewPaletteModal: FC = () => {
  const [paletteIndex, setPaletteIndex] = useState(0);
  const { notifications } = useContext(Context);
  const { palette, viewModal } = useContext(Context);

  const handleCopy = (format: ColorFormats) => {
    notifications.setNotifications([
      ...notifications.notifications,
      {
        message: 'Copied to Clipboard',
        severity: 'success',
        key: new Date().getTime(),
      },
    ]);
    copyToClipBoard(getColorFormat(format, palette.current[paletteIndex]));
  };

  return (
    <ViewPaletteModalComponent
      openModal={[viewModal.isOpen, () => viewModal.setOpen(!viewModal.isOpen)]}
      palette={palette.current}
      paletteIndex={[paletteIndex, setPaletteIndex]}
      handleClick={handleCopy}
    />
  );
};
