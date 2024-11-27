import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { FC, ReactElement } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { TopNavBar } from '../TopNavBar';
import { IconButton, ListItem, Paper, Typography } from '@mui/material';
import Color from 'color';
import { ColorBlock } from '../ColorBlock';
import { GeneralPaletteMenu } from '../GeneralPaletteMenu';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  children: ReactElement | undefined;
  open: boolean;
  toggleOpen: () => void;
  savedPalettes: Color[][];
}

export const UserDrawerComponent: FC<Props> = ({
  children,
  open,
  toggleOpen,
  savedPalettes,
}) => {
  const drawerWidth = open ? 240 : 0;

  const palettes = savedPalettes.map((colorArr) => {
    const palette = colorArr.map((color) => {
      return <ColorBlock disableFocus minimal color={color} noCopy />;
    });

    if (colorArr.length == 0) {
      return <></>;
    }

    return (
      <ListItem className="paletteLibListItem">
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            padding: 0,
          }}
          elevation={3}
        >
          {palette}
        </Paper>
        <GeneralPaletteMenu
          palette={colorArr}
          IconEl={<MoreVertIcon />}
          tabIndex={open ? undefined : -1}
        />
      </ListItem>
    );
  });

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          transition: '0.5s',
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            transition: '0.5s',
            boxSizing: 'border-box',
          },
        }}
      >
        <IconButton
          sx={{
            display: 'block',
            justifySelf: 'right',
            alignSelf: 'end',
            width: '40px',
            height: '40px',
          }}
          onClick={() => toggleOpen()}
        >
          <CloseIcon />
        </IconButton>
        <Toolbar />
        <Box
          sx={{
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <Typography sx={{ marginBottom: 2, textAlign: 'center' }}>
            Palette Library
          </Typography>
          <Divider />
          <List id="paletteLibList">{palettes}</List>
        </Box>
      </Drawer>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <TopNavBar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};
