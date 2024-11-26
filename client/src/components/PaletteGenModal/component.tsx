import {
  Button,
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
import { FC, ReactNode } from 'react';
import { GenConfig, GenerationType } from '../../utils';
import SettingsIcon from '@mui/icons-material/Settings';

interface Props {
  modalOpen: [boolean, () => void];
  genConfig: [GenConfig, (config: GenConfig) => void];
  getFormOptions: () => ReactNode;
}

const getGenTypes = [...Object.values(GenerationType)].map((type) => (
  <FormControlLabel key={type} value={type} control={<Radio />} label={type} />
));

export const PaletteGenModalComponent: FC<Props> = ({
  modalOpen,
  genConfig,
  getFormOptions,
}) => {
  const [open, toggleOpen] = modalOpen;
  const [config, setGenConfig] = genConfig;

  return (
    <>
      <Tooltip title="Generator Settings">
        <Button
          startIcon={<SettingsIcon />}
          sx={{ textTransform: 'capitalize' }}
          onClick={() => toggleOpen()}
        >
          Settings
        </Button>
      </Tooltip>
      <Dialog
        open={open}
        onClose={() => toggleOpen()}
        hideBackdrop
        maxWidth={false}
        PaperProps={{
          component: 'form',
          sx: { width: 'fit-content' },
        }}
      >
        <DialogTitle>Palette Generator Settings</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'row' }}>
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
          {getFormOptions()}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => toggleOpen()}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
