import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import Color from 'color';
import { ColorBlock } from '../ColorBlock';
import { ColorFormats, getColorFormat } from '../../utils';

interface Props {
  openModal: [boolean, () => void];
  palette: Color[];
  paletteIndex: [number, (num: number) => void];
  handleClick: (format: ColorFormats) => void;
}

const colorFormats = (color: Color, clickCB: (val: ColorFormats) => void) => {
  return [...Object.values(ColorFormats)].map((format) => (
    <Button
      key={format}
      onClick={() => clickCB(format)}
      className="viewModalBtn"
      sx={{
        background: 'transparent',
        width: '100%',
        textTransform: 'none',
        padding: '20px 10px',
        border: '0px',
        boxShadow: 'none',
        color: color.isDark() ? 'white' : 'black',
        transition: '0.5s',
      }}
    >
      <Typography sx={{ fontWeight: 'bolder' }}>{`${getColorFormat(
        format,
        color
      )}`}</Typography>
      <Box sx={{ flexGrow: 1 }} />
      <Typography sx={{ fontWeight: 'bolder' }} className="viewModalCopyLabel">
        Copy
      </Typography>
    </Button>
  ));
};

export const ViewPaletteModalComponent: FC<Props> = ({
  openModal,
  palette,
  paletteIndex,
  handleClick,
}) => {
  const [open, toggleOpen] = openModal;
  const [index, setIndex] = paletteIndex;

  const colorBlocks = palette.map((color, i) => {
    return (
      <ColorBlock
        onClick={() => setIndex(i)}
        color={color}
        key={color.hexa()}
        minimal
        noCopy
      />
    );
  });

  const selectedColor = () => {
    let i = index;

    if (index >= palette.length) {
      i = 0;
    }

    if (palette.length === 0) {
      return <></>;
    }

    return (
      <Box
        sx={{
          backgroundColor: palette[i].hex(),
          display: 'flex',
          flexDirection: 'column',
          margin: '0px 0',
          transition: '0.5s',
        }}
      >
        {colorFormats(palette[i], handleClick)}
      </Box>
    );
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => toggleOpen()}
        hideBackdrop
        PaperProps={{
          sx: {
            maxWidth: 'fit-content',
            width: 'fit-content',
            minWidth: '400px',
          },
          component: 'form',
        }}
      >
        <DialogTitle>Palette View</DialogTitle>
        <DialogContent sx={{ padding: 0 }}>
          <Box
            sx={{
              maxHeight: '300px',
              overflowY: 'scroll',
            }}
          >
            {selectedColor()}
          </Box>
          <Box sx={{ padding: 3 }}>
            <Paper elevation={2} className="minimalColorContainer">
              {colorBlocks}
            </Paper>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
