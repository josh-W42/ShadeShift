import { FC } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardHeader, Paper } from '@mui/material';
import { ColorBlock } from '../../ColorBlock';
import { createMonochromaticPalette, getRandomColor } from '../../../utils';

export const MonochromaticExample: FC = () => {
  const displayPalette = createMonochromaticPalette(getRandomColor(), 5);
  const colorBlocks = displayPalette.map((color, i) => {
    return <ColorBlock index={i} color={color} minimal noCopy disableFocus />;
  });

  return (
    <Card sx={{ maxWidth: 350, marginBottom: 1 }}>
      <CardHeader
        title="Monochromatic"
        subheader="A color scheme comprised of variations of a single color."
      />
      <CardContent>
        <Paper elevation={6} sx={{ flexDirection: 'row', display: 'flex' }}>
          {colorBlocks}
        </Paper>
      </CardContent>
    </Card>
  );
};
