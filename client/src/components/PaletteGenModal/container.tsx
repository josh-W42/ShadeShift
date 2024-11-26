import { FC, useContext, useState } from 'react';
import { PaletteGenModalComponent } from './component';
import { Context, GenerationType } from '../../utils';
import {
  AnalogousExample,
  ComplementaryExample,
  GeneralOptions,
  GradientExample,
  GradientOptions,
  HueShiftExample,
  HueShiftOptions,
  ScientificOptions,
  TetradicExample,
  TriadicExample,
} from './components';
import { MonochromaticExample } from './components';
import { Box } from '@mui/material';
import { SplitComplementaryExample } from './components/SplitComplementaryExample';

export const PaletteGenModal: FC = () => {
  const { genConfig } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState<string>(genConfig.value.color || '000000');
  const [numColors, setNumColors] = useState(genConfig.value.num_colors || 5);
  const [secondary_color, setSecondaryColor] = useState(
    genConfig.value.secondary_color || '000000'
  );
  const [hueShiftSteps, setHueShiftSteps] = useState(
    genConfig.value.hue_shift_step || 0
  );

  const getFormOptions = () => {
    switch (genConfig.value.type) {
      case GenerationType.random:
        return (
          <GeneralOptions
            genConfig={[genConfig.value, genConfig.setConfig]}
            numColors={[numColors, setNumColors]}
            genColor={[color, (hex) => setColor(hex)]}
          />
        );
      case GenerationType.monochromatic:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <MonochromaticExample />
            <GeneralOptions
              genConfig={[genConfig.value, genConfig.setConfig]}
              genColor={[color, (hex) => setColor(hex)]}
              numColors={[numColors, setNumColors]}
            />
          </Box>
        );
      case GenerationType.analogous:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <AnalogousExample />
            <ScientificOptions
              genConfig={[genConfig.value, genConfig.setConfig]}
              genColor={[color, (hex) => setColor(hex)]}
            />
          </Box>
        );
      case GenerationType.triadic:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TriadicExample />
            <ScientificOptions
              genConfig={[genConfig.value, genConfig.setConfig]}
              genColor={[color, (hex) => setColor(hex)]}
            />
          </Box>
        );
      case GenerationType.tetradic:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TetradicExample />
            <ScientificOptions
              genConfig={[genConfig.value, genConfig.setConfig]}
              genColor={[color, (hex) => setColor(hex)]}
            />
          </Box>
        );
      case GenerationType.complementary:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <ComplementaryExample />
            <ScientificOptions
              genConfig={[genConfig.value, genConfig.setConfig]}
              genColor={[color, (hex) => setColor(hex)]}
            />
          </Box>
        );
      case GenerationType.splitComplementary:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <SplitComplementaryExample />
            <ScientificOptions
              genConfig={[genConfig.value, genConfig.setConfig]}
              genColor={[color, (hex) => setColor(hex)]}
            />
          </Box>
        );
      case GenerationType.gradient:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <GradientExample />
            <GradientOptions
              genConfig={[genConfig.value, genConfig.setConfig]}
              genColor={[color, (hex) => setColor(hex)]}
              numColors={[numColors, setNumColors]}
              secondaryColor={[secondary_color, setSecondaryColor]}
            />
          </Box>
        );
      case GenerationType.hueShift:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <HueShiftExample />
            <HueShiftOptions
              genConfig={[genConfig.value, genConfig.setConfig]}
              genColor={[color, (hex) => setColor(hex)]}
              numColors={[numColors, setNumColors]}
              shiftSteps={[hueShiftSteps, setHueShiftSteps]}
            />
          </Box>
        );

      default:
        return <></>;
    }
  };

  return (
    <PaletteGenModalComponent
      modalOpen={[open, () => setOpen(!open)]}
      genConfig={[genConfig.value, genConfig.setConfig]}
      getFormOptions={getFormOptions}
    />
  );
};
