import { FunctionComponent } from 'react';
import { Theme } from '../../utils';
import { Link } from 'react-router-dom';
import { PaletteGenModal } from '../PaletteGenModal';
import { Button, ButtonGroup, IconButton, Tooltip } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { History } from '../../classes';

interface Props {
  theme: Theme;
  genUrl: string;
  handleUndo: (current: string) => void;
  handleRedo: (current: string) => void;
  openViewModal: () => void;
}

export const PaletteToolBarComponent: FunctionComponent<Props> = ({
  theme,
  genUrl,
  handleUndo,
  handleRedo,
  openViewModal,
}) => {
  return (
    <div id="paletteToolBar" style={{ backgroundColor: theme.primary }}>
      <ButtonGroup variant="contained">
        <Link to={genUrl} tabIndex={-1}>
          <Button
            onClick={() => {
              History.save(window.location.pathname);
            }}
            style={{
              background: theme.tertiary,
              color: theme.darker,
              borderColor: theme.darker,
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
      </ButtonGroup>
    </div>
  );
};
