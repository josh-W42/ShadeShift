import { FC, MouseEvent, useState } from 'react';
import { GeneralPaletteMenuComponent } from './component';
import { useNavigate } from 'react-router-dom';
import Color from 'color';
import { getSequence } from '../../utils';

interface Props {
  palette: Color[];
}

export const GeneralPaletteMenu: FC<Props> = ({ palette }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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

  return (
    <GeneralPaletteMenuComponent
      onClick={handleClick}
      onClose={handleClose}
      handleNavigate={handleNavigate}
      anchorEl={anchorEl}
      open={open}
    />
  );
};
