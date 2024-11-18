import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Tooltip,
} from '@mui/material';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import ShuffleOnIcon from '@mui/icons-material/ShuffleOn';
import { FC } from 'react';
import { GenConfig, GenerationType } from '../../utils';
import { DebounceInput } from '../DebouncedInput';
import SettingsIcon from '@mui/icons-material/Settings';

interface Props {
  modalOpen: [boolean, () => void];
  genConfig: [GenConfig, (config: GenConfig) => void];
  genColor: [string | undefined, (hex: string) => void];
}

const getGenTypes = [...Object.values(GenerationType)].map((type) => (
  <FormControlLabel key={type} value={type} control={<Radio />} label={type} />
));

export const PaletteGenModalComponent: FC<Props> = ({
  modalOpen,
  genConfig,
  genColor,
}) => {
  const [open, toggleOpen] = modalOpen;
  const [config, setGenConfig] = genConfig;
  const [color, setColor] = genColor;

  return (
    <>
      <Tooltip title="Generator Settings">
        <Button
          startIcon={<SettingsIcon />}
          variant="contained"
          onClick={() => toggleOpen()}
        >
          Settings
        </Button>
      </Tooltip>
      <Dialog
        open={open}
        onClose={() => toggleOpen()}
        hideBackdrop
        PaperProps={{
          component: 'form',
        }}
      >
        <DialogTitle>Palette Generator Settings</DialogTitle>
        <DialogContent>
          <FormControl>
            <FormLabel id="palette-type-label">Palette Type</FormLabel>
            <RadioGroup
              aria-labelledby="palette-type-label"
              value={config.type}
              name="palette-type-button-group"
              onChange={(e) => {
                setGenConfig({
                  ...config,
                  type: e.target.value as GenerationType,
                });
              }}
            >
              {getGenTypes}
            </RadioGroup>
          </FormControl>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => toggleOpen()}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
