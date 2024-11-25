import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
} from '@mui/material';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import ShuffleOnIcon from '@mui/icons-material/ShuffleOn';
import { FC } from 'react';
import { GenConfig } from '../../../utils';
import { DebounceInput } from '../../DebouncedInput';

interface Props {
  genConfig: [GenConfig, (config: GenConfig) => void];
  genColor: [string | undefined, (hex: string) => void];
}

export const ScientificOptions: FC<Props> = ({ genConfig, genColor }) => {
  const [config, setGenConfig] = genConfig;
  const [color, setColor] = genColor;

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
    </FormControl>
  );
};
