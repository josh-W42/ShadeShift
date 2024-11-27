import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
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
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ImageIcon from '@mui/icons-material/Image';

interface Props {
  genUrl: string;
  user?: User;
  userDrawer: [boolean, () => void];
  openSignUp: () => void;
  openLogin: () => void;
  handleLogout: () => void;
}

export const TopNavBarComponent: FC<Props> = ({
  genUrl,
  user,
  userDrawer,
  openSignUp,
  openLogin,
  handleLogout,
}) => {
  const [isDrawerOpen, toggleDrawer] = userDrawer;
  const drawerIcon = () => {
    if (isDrawerOpen) {
      return (
        <Tooltip title="Close Palette Library">
          <Button
            sx={{ textTransform: 'capitalize' }}
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
      <AppBar position="static" sx={{ padding: 1 }}>
        <Toolbar style={{ minHeight: 0 }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Shade Shift
          </Typography>
          <ViewPaletteModal />
          <ButtonGroup variant="text" size="large">
            <SignUpModal />
            <LoginModal />
            <Link to={genUrl} tabIndex={-1}>
              <Button
                onClick={() => {
                  if (window.location.pathname.includes('-')) {
                    History.save(window.location.pathname);
                  }
                }}
                sx={{ textTransform: 'capitalize' }}
                startIcon={<AutoFixHighIcon />}
              >
                Palette Creator
              </Button>
            </Link>
            <Link to={'/image'} tabIndex={-1}>
              <Button
                onClick={() => {
                  History.empty();
                }}
                sx={{ textTransform: 'capitalize' }}
                startIcon={<ImageIcon />}
              >
                Image Extract
              </Button>
            </Link>
            {drawerIcon()}
          </ButtonGroup>
          <ButtonGroup variant="text" size="large" className="topNavUserGroup">
            {user ? (
              <Button
                sx={{ textTransform: 'capitalize' }}
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  sx={{ textTransform: 'capitalize' }}
                  onClick={() => openSignUp()}
                >
                  Sign Up
                </Button>
                <Button
                  sx={{ textTransform: 'capitalize' }}
                  onClick={() => openLogin()}
                >
                  Login
                </Button>
              </>
            )}
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
