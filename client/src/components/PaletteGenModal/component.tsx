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
import { FC } from 'react';
import { GenConfig, GenerationType } from '../../utils';

interface Props {
  open: boolean;
  toggleOpen: () => void;
  config: GenConfig;
  setGenConfig: (config: GenConfig) => void;
}

export const PaletteGenModalComponent: FC<Props> = ({
  open,
  toggleOpen,
  config,
  setGenConfig,
}) => {
  const getGenTypes = [...Object.values(GenerationType)].map((type) => (
    <FormControlLabel value={type} control={<Radio />} label={type} />
  ));

  return (
    <>
      <Tooltip title="Generator Settings">
        <Button variant="outlined" onClick={() => toggleOpen()}>
          G
        </Button>
      </Tooltip>
      <Dialog
        open={open}
        onClose={() => toggleOpen()}
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
              onChange={(e) =>
                setGenConfig({
                  ...config,
                  type: e.target.value as GenerationType,
                })
              }
            >
              {getGenTypes}
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => toggleOpen()}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
