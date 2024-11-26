import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
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
  secondaryColor: [string | undefined, (hex: string) => void];
}

export const GradientOptions: FC<Props> = ({
  genConfig,
  genColor,
  numColors,
  secondaryColor,
}) => {
  const [config, setGenConfig] = genConfig;
  const [color, setColor] = genColor;
  const [numOfColors, setNumOfColors] = numColors;
  const [secondary_color, setSecondaryColor] = secondaryColor;

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
          <FormControl>
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <FormControl>
            <FormLabel id="palette-secondary-color-label">
              Secondary Color
            </FormLabel>
            <FormControlLabel
              control={
                <Checkbox
                  icon={<ShuffleIcon />}
                  checkedIcon={<ShuffleOnIcon />}
                  checked={config.secondary_color === undefined}
                  onChange={() => {
                    setGenConfig({
                      ...config,
                      secondary_color: config.secondary_color
                        ? undefined
                        : secondary_color,
                    });
                  }}
                />
              }
              label="Random"
            />
          </FormControl>
          <FormControl>
            <DebounceInput
              type="color"
              defaultValue={
                config.color ? `#${config.secondary_color}` : `#${color}`
              }
              disabled={config.secondary_color ? false : true}
              placeholder="Type in here…"
              debounceTimeout={500}
              handleDebounce={(value) => {
                setSecondaryColor(value.slice(1));
                setGenConfig({
                  ...config,
                  secondary_color: value.slice(1),
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
