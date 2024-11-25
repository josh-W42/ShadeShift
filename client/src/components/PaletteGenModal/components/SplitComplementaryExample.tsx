import { FC } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardHeader, Paper } from '@mui/material';
import { ColorBlock } from '../../ColorBlock';
import {
  ColorHarmonyType,
  createScientificPalette,
  getRandomColor,
} from '../../../utils';

export const SplitComplementaryExample: FC = () => {
  const displayPalette = createScientificPalette(getRandomColor()).get(
    ColorHarmonyType.splitComplementary
  );
  const colorBlocks = displayPalette!.map((color, i) => {
    return <ColorBlock key={i} color={color} minimal noCopy disableFocus />;
  });

  return (
    <Card sx={{ maxWidth: 350, marginBottom: 1 }}>
      <CardHeader
        title="Split Complementary"
        subheader="A color scheme comprised of three colors. A base color followed by two colors that are adjacent to the base color's complement."
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
