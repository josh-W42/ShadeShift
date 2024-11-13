import { FunctionComponent } from 'react';
import { Theme } from '../../utils';
import { Link } from 'react-router-dom';
import { PaletteGenModal } from '../PaletteGenModal';
import { Button, ButtonGroup } from '@mui/material';

interface Props {
  theme: Theme;
  genUrl: string;
}

export const TopNavBarComponent: FunctionComponent<Props> = ({
  theme,
  genUrl,
}) => {
  return (
    <div id="topNavBar" style={{ backgroundColor: theme.primary }}>
      <ButtonGroup variant="contained">
        <Link to={genUrl}>
          <Button
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
      </ButtonGroup>
    </div>
  );
};
