import { FunctionComponent } from 'react';
import { User } from '../../utils';
import { Link } from 'react-router-dom';
import { PaletteGenModal } from '../PaletteGenModal';
import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Tooltip,
} from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import { History } from '../../classes';

interface Props {
  genUrl: string;
  user?: User;
  handleUndo: (current: string) => void;
  handleRedo: (current: string) => void;
  handleSave: (current: string) => Promise<void>;
  openViewModal: () => void;
}

export const PaletteToolBarComponent: FunctionComponent<Props> = ({
  genUrl,
  user,
  handleUndo,
  handleRedo,
  handleSave,
  openViewModal,
}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" id="paletteToolBar">
        <ButtonGroup variant="contained">
          <Link to={genUrl} tabIndex={-1}>
            <Button
              onClick={() => {
                History.save(window.location.pathname);
              }}
            >
              Generate
            </Button>
          </Link>
          <PaletteGenModal />
          <Tooltip title="Undo">
            <IconButton
              aria-label="undo"
              disabled={!History.canGoBack()}
              onClick={() => handleUndo(window.location.pathname)}
            >
              <UndoIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Redo">
            <IconButton
              aria-label="redo"
              disabled={!History.canGoForward()}
              onClick={() => handleRedo(window.location.pathname)}
            >
              <RedoIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="View Palette">
            <IconButton
              onClick={() => {
                openViewModal();
              }}
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          {user?.savedPalettes.has(window.location.pathname.slice(1)) ? (
            <Tooltip title="Un-save Palette">
              <IconButton>
                <BookmarkOutlinedIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Save Palette">
              <IconButton
                onClick={() => {
                  handleSave(window.location.pathname);
                }}
              >
                <BookmarkBorderOutlinedIcon />
              </IconButton>
            </Tooltip>
          )}
        </ButtonGroup>
      </AppBar>
    </Box>
  );
};
