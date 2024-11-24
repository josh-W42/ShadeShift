import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { FC, MouseEvent, ReactElement } from 'react';
import IosShareIcon from '@mui/icons-material/IosShare';

interface Props {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  onClose: () => void;
  open: boolean;
  anchorEl: null | HTMLElement;
  IconEl: ReactElement;
  handleNavigate: () => void;
  openViewModal: () => void;
  tabIndex?: number;
}

export const GeneralPaletteMenuComponent: FC<Props> = ({
  onClick,
  onClose,
  handleNavigate,
  openViewModal,
  open,
  anchorEl,
  IconEl,
  tabIndex,
}) => {
  return (
    <div>
      <IconButton
        id="export-button"
        aria-controls={open ? 'basic-general-palette-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={onClick}
        tabIndex={tabIndex}
      >
        {IconEl}
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
        <MenuItem
          onClick={() => {
            openViewModal();
            onClose();
          }}
        >
          <ListItemIcon>
            <VisibilityIcon />
          </ListItemIcon>
          <ListItemText>View Palette</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};
