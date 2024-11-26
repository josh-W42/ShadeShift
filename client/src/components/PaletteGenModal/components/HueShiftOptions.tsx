import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  Slider,
} from '@mui/material';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import ShuffleOnIcon from '@mui/icons-material/ShuffleOn';
import { FC } from 'react';
import { GenConfig } from '../../../utils';
import { DebounceInput } from '../../DebouncedInput';

interface Props {
  genConfig: [GenConfig, (config: GenConfig) => void];
  genColor: [string | undefined, (hex: string) => void];
  numColors: [number, (val: number) => void];
  shiftSteps: [number, (val: number) => void];
}

export const HueShiftOptions: FC<Props> = ({
  genConfig,
  genColor,
  numColors,
  shiftSteps,
}) => {
  const [config, setGenConfig] = genConfig;
  const [color, setColor] = genColor;
  const [numOfColors, setNumOfColors] = numColors;
  const [steps, setSteps] = shiftSteps;

  return (
    <FormControl sx={{ width: 350 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <FormControl>
            <FormLabel id="palette-color-label">Base Color</FormLabel>
            <FormControlLabel
              control={
                <Checkbox
                  icon={<ShuffleIcon />}
                  checkedIcon={<ShuffleOnIcon />}
                  checked={config.color === undefined}
                  onChange={() => {
                    setGenConfig({
                      ...config,
                      color: config.color ? undefined : color,
                    });
                  }}
                />
              }
              label="Random"
            />
          </FormControl>
          <FormControl sx={{ marginTop: 2 }}>
            <DebounceInput
              type="color"
              defaultValue={config.color ? `#${config.color}` : `#${color}`}
              disabled={config.color ? false : true}
              placeholder="Type in here…"
              debounceTimeout={500}
              handleDebounce={(value) => {
                setColor(value.slice(1));
                setGenConfig({
                  ...config,
                  color: value.slice(1),
                });
              }}
            />
          </FormControl>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <FormControl>
            <FormLabel id="palette-hue-steps-label">Hue Steps</FormLabel>
            <FormControlLabel
              control={
                <Checkbox
                  icon={<ShuffleIcon />}
                  checkedIcon={<ShuffleOnIcon />}
                  checked={config.hue_shift_step === undefined}
                  onChange={() => {
                    setGenConfig({
                      ...config,
                      hue_shift_step: config.hue_shift_step ? undefined : steps,
                    });
                  }}
                />
              }
              label="Random"
            />
            <Input
              value={steps}
              disabled={config.hue_shift_step ? false : true}
              type="number"
              onChange={({ currentTarget }) => {
                let value = parseInt(currentTarget.value);

                if (isNaN(value)) {
                  value = 0;
                }

                if (value < 1) {
                  value = 1;
                } else if (value >= 360) {
                  value = 359;
                }

                setSteps(value);
                setGenConfig({
                  ...config,
                  hue_shift_step: value,
                });
              }}
            />
          </FormControl>
        </Box>
      </Box>
      <FormControl sx={{ marginTop: 5 }}>
        <FormLabel id="palette-type-label">Number of Colors</FormLabel>
        <FormControlLabel
          control={
            <Checkbox
              icon={<ShuffleIcon />}
              checkedIcon={<ShuffleOnIcon />}
              checked={config.num_colors === undefined}
              onChange={() => {
                setGenConfig({
                  ...config,
                  num_colors: config.num_colors ? undefined : numOfColors,
                });
              }}
            />
          }
          label="Random"
        />
        <Slider
          valueLabelDisplay="auto"
          aria-label="Number of Colors to Generate"
          min={1}
          max={10}
          marks
          disabled={config.num_colors ? false : true}
          onChange={(_, value) => {
            const val = typeof value === 'number' ? value : value[0];
            setNumOfColors(val);
            setGenConfig({
              ...config,
              num_colors: val,
            });
          }}
          value={numOfColors}
        />
      </FormControl>
    </FormControl>
  );
};
