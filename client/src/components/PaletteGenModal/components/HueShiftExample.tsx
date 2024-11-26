import { FC } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardHeader, Paper } from '@mui/material';
import { ColorBlock } from '../../ColorBlock';
import { createHueShiftPalette, getRandomColor } from '../../../utils';

export const HueShiftExample: FC = () => {
  const displayPalette = createHueShiftPalette({
    baseColor: getRandomColor(),
    numColors: 5,
    step: 12,
    minLuminosity: 10,
    maxLuminosity: 90,
  });

  const colorBlocks = displayPalette!.map((color, i) => {
    return <ColorBlock key={i} color={color} minimal noCopy disableFocus />;
  });

  return (
    <Card sx={{ maxWidth: 350, marginBottom: 2 }}>
      <CardHeader
        title="Hue Shift"
        subheader="A palette of up to ten colors where the hue is shifted by a constant number of degrees."
      />
      {/* <CardMedia
        component="img"
        height={'100px'}
        sx={{ width: '100px', justifySelf: 'center' }}
        image="https://res.cloudinary.com/dom5vocai/image/upload/c_scale,h_100,w_100/wqqegedgggdxayro0qwz"
      /> */}
      <CardContent>
        <Paper elevation={6} sx={{ flexDirection: 'row', display: 'flex' }}>
          {colorBlocks}
        </Paper>
      </CardContent>
    </Card>
  );
};
