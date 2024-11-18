import { FC, useContext, useState } from 'react';
import { ViewPaletteModalComponent } from './component';
import {
  ColorFormats,
  copyToClipBoard,
  getColorFormat,
  NotificationContext,
  PaletteContext,
} from '../../utils';

export const ViewPaletteModal: FC = () => {
  const [paletteIndex, setPaletteIndex] = useState(0);
  const { notifications, setNotifications } = useContext(NotificationContext);
  const { palette, viewModal } = useContext(PaletteContext);

  const handleCopy = (format: ColorFormats) => {
    setNotifications([
      ...notifications,
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
