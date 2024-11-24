import { FC, MouseEvent, ReactElement, useContext, useState } from 'react';
import { GeneralPaletteMenuComponent } from './component';
import { useNavigate } from 'react-router-dom';
import Color from 'color';
import { getSequence, PaletteContext } from '../../utils';

interface Props {
  palette: Color[];
  IconEl: ReactElement;
  tabIndex?: number;
}

export const GeneralPaletteMenu: FC<Props> = ({
  palette,
  IconEl,
  tabIndex,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { viewModal, palette: globalPalette } = useContext(PaletteContext);

  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = () => {
    navigate(getSequence(palette));
  };

  const handleViewModalTrigger = () => {
    viewModal.setOpen(true);
    globalPalette.setPalette(palette);
  };

  return (
    <GeneralPaletteMenuComponent
      onClick={handleClick}
      onClose={handleClose}
      handleNavigate={handleNavigate}
      openViewModal={handleViewModalTrigger}
      anchorEl={anchorEl}
      open={open}
      IconEl={IconEl}
      tabIndex={tabIndex}
    />
  );
};
