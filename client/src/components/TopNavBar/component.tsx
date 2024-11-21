import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import { History } from '../../classes';
import { ViewPaletteModal } from '../ViewPaletteModal';
import { SignUpModal } from '../SignUpModal';
import { LoginModal } from '../LogInModal';
import { User } from '../../utils';

interface Props {
  genUrl: string;
  user?: User;
  handleDb: () => Promise<void>;
  openSignUp: () => void;
  openLogin: () => void;
}

export const TopNavBarComponent: FC<Props> = ({
  genUrl,
  user,
  handleDb,
  openSignUp,
  openLogin,
}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Shade Shift
          </Typography>
          <ViewPaletteModal />
          <SignUpModal />
          <LoginModal />
          <button
            onClick={() => {
              handleDb();
            }}
          >
            Database
          </button>
          {user ? (
            <></>
          ) : (
            <>
              <Button onClick={() => openSignUp()} variant="contained">
                SignUp
              </Button>
              <Button onClick={() => openLogin()} variant="contained">
                Login
              </Button>
            </>
          )}
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
