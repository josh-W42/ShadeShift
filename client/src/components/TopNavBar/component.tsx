import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import { History } from '../../classes';

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
          <Link to={genUrl}>
            <Button
              onClick={() => {
                if (window.location.pathname.includes('-')) {
                  History.save(window.location.pathname);
                }
              }}
              variant="contained"
              sx={{ textTransform: 'capitalize' }}
            >
              Palette Creator
            </Button>
          </Link>
          <Link to={'/image'}>
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
