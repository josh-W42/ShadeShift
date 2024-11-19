import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import { History } from '../../classes';
import { ViewPaletteModal } from '../ViewPaletteModal';

interface Props {
  genUrl: string;
}

export const TopNavBarComponent: FC<Props> = ({ genUrl }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Shade Shift
          </Typography>
          <ViewPaletteModal />
          <Link to={genUrl} tabIndex={-1}>
            <Button
              onClick={() => {
                if (window.location.pathname.includes('-')) {
                  History.save(window.location.pathname);
                }
              }}
              variant="contained"
              sx={{ textTransform: 'capitalize', margin: '0 25px' }}
            >
              Palette Creator
            </Button>
          </Link>
          <Link to={'/image'} tabIndex={-1}>
            <Button
              onClick={() => {
                History.empty();
              }}
              variant="contained"
              sx={{ textTransform: 'capitalize' }}
            >
              Image Extract
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
