import { FunctionComponent } from 'react';
import { User } from '../../utils';
import { Link } from 'react-router-dom';
import { PaletteGenModal } from '../PaletteGenModal';
import { AppBar, Box, Button, ButtonGroup, Tooltip } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
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
      <AppBar
        position="static"
        sx={{
          display: 'flex',
          'flex-direction': 'row',
          position: 'relative',
          paddingRight: 1,
        }}
        color="secondary"
      >
        <Box sx={{ flexGrow: 1 }}></Box>
        <ButtonGroup variant="text" size={'large'}>
          <Link to={genUrl} tabIndex={-1}>
            <Button
              aria-label="Generate Palette"
              sx={{ padding: 1, textTransform: 'capitalize' }}
              onClick={() => {
                History.save(window.location.pathname);
              }}
              startIcon={<AutoAwesomeIcon />}
            >
              Generate
            </Button>
          </Link>
          <PaletteGenModal />
          <Tooltip title="Undo">
            <Button
              aria-label="undo"
              color="primary"
              disabled={!History.canGoBack()}
              onClick={() => handleUndo(window.location.pathname)}
              startIcon={<UndoIcon />}
              sx={{ textTransform: 'capitalize' }}
            >
              Undo
            </Button>
          </Tooltip>
          <Tooltip title="Redo">
            <Button
              aria-label="redo"
              color="primary"
              disabled={!History.canGoForward()}
              onClick={() => handleRedo(window.location.pathname)}
              startIcon={<RedoIcon />}
              sx={{ textTransform: 'capitalize' }}
            >
              Redo
            </Button>
          </Tooltip>
          <Tooltip title="View Palette">
            <Button
              aria-label="View Palette"
              color="primary"
              onClick={() => {
                openViewModal();
              }}
              startIcon={<VisibilityIcon />}
              sx={{ textTransform: 'capitalize' }}
            >
              View
            </Button>
          </Tooltip>
          {user?.savedPalettes.has(window.location.pathname.slice(1)) ? (
            <Tooltip
              aria-label="Unsave Palette"
              title="Unsave Palette"
              sx={{ textTransform: 'capitalize' }}
            >
              <Button startIcon={<BookmarkOutlinedIcon />}>Unsave</Button>
            </Tooltip>
          ) : (
            <Tooltip title="Save Palette">
              <Button
                aria-label="Save Palette"
                color="primary"
                onClick={() => {
                  handleSave(window.location.pathname);
                }}
                startIcon={<BookmarkBorderOutlinedIcon />}
                sx={{ textTransform: 'capitalize' }}
              >
                Save
              </Button>
            </Tooltip>
          )}
        </ButtonGroup>
      </AppBar>
    </Box>
  );
};
