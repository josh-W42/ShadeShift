import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import { History } from '../../classes';
import { ViewPaletteModal } from '../ViewPaletteModal';
import { SignUpModal } from '../SignUpModal';
import { LoginModal } from '../LogInModal';
import { User } from '../../utils';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

interface Props {
  genUrl: string;
  user?: User;
  userDrawer: [boolean, () => void];
  openSignUp: () => void;
  openLogin: () => void;
}

export const TopNavBarComponent: FC<Props> = ({
  genUrl,
  user,
  userDrawer,
  openSignUp,
  openLogin,
}) => {
  const [isDrawerOpen, toggleDrawer] = userDrawer;
  const drawerIcon = () => {
    if (isDrawerOpen) {
      return (
        <Tooltip title="Close Palette Library">
          <Button
            sx={{ textTransform: 'capitalize' }}
            variant="contained"
            onClick={() => toggleDrawer()}
            startIcon={<BookmarksIcon />}
          >
            Palette Library
          </Button>
        </Tooltip>
      );
    }

    return (
      <Tooltip title="Open Palette Library">
        <Button
          sx={{ textTransform: 'capitalize' }}
          variant="contained"
          onClick={() => toggleDrawer()}
          startIcon={<BookmarksOutlinedIcon />}
        >
          Palette Library
        </Button>
      </Tooltip>
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ padding: 1, background: '#00068F' }}>
        <Toolbar style={{ minHeight: 0 }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Shade Shift
          </Typography>
          <ViewPaletteModal />
          <SignUpModal />
          <LoginModal />
          {user ? (
            <></>
          ) : (
            <>
              <Button onClick={() => openSignUp()} variant="contained">
                SignUp
              </Button>
              <Button
                sx={{ margin: '0 25px' }}
                onClick={() => openLogin()}
                variant="contained"
              >
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
              sx={{ textTransform: 'capitalize' }}
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
              sx={{ textTransform: 'capitalize', margin: '0 25px' }}
            >
              Image Extract
            </Button>
          </Link>
          {drawerIcon()}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
