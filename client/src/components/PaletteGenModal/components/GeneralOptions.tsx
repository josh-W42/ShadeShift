import {
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
}

export const GeneralOptions: FC<Props> = ({
  genConfig,
  genColor,
  numColors,
}) => {
  const [config, setGenConfig] = genConfig;
  const [color, setColor] = genColor;
  const [numOfColors, setNumOfColors] = numColors;

  return (
    <FormControl>
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
          debounceTimeout={300}
          handleDebounce={(value) => {
            setColor(value.slice(1));
            setGenConfig({
              ...config,
              color: value.slice(1),
            });
          }}
        />
      </FormControl>
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
