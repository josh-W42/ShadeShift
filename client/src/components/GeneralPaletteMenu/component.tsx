import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { FC, MouseEvent } from 'react';
import IosShareIcon from '@mui/icons-material/IosShare';

interface Props {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  onClose: () => void;
  open: boolean;
  anchorEl: null | HTMLElement;
  handleNavigate: () => void;
}

export const GeneralPaletteMenuComponent: FC<Props> = ({
  onClick,
  onClose,
  handleNavigate,
  open,
  anchorEl,
}) => {
  return (
    <div>
      <IconButton
        id="export-button"
        aria-controls={open ? 'basic-general-palette-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={onClick}
      >
        <SettingsIcon />
      </IconButton>
      <Menu
        id="general-palette-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        MenuListProps={{
          'aria-labelledby': 'export-button',
        }}
      >
        <MenuItem
          onClick={() => {
            onClose();
            handleNavigate();
          }}
        >
          <ListItemIcon>
            <IosShareIcon />
          </ListItemIcon>
          <ListItemText>Open Palette</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};
