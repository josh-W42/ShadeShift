import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { FC, ReactElement } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { TopNavBar } from '../TopNavBar';
import { ListItem, Typography } from '@mui/material';
import Color from 'color';
import { ColorBlock } from '../ColorBlock';
import { GeneralPaletteMenu } from '../GeneralPaletteMenu';

const drawerWidth = 240;

interface Props {
  children: ReactElement | undefined;
  savedPalettes: Color[][];
}

export const UserDrawerComponent: FC<Props> = ({ children, savedPalettes }) => {
  const palettes = savedPalettes.map((colorArr) => {
    const palette = colorArr.map((color) => {
      return <ColorBlock disableFocus minimal color={color} noCopy />;
    });

    if (colorArr.length == 0) {
      return <></>;
    }

    return (
      <ListItem className="paletteLibListItem">
        {palette}
        <GeneralPaletteMenu palette={colorArr} IconEl={<MoreVertIcon />} />
      </ListItem>
    );
  });

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
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
