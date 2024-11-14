import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { FC } from 'react';
import { ColorFormats } from '../../utils';

interface Props {
  openModal: [boolean, () => void];
  colorFormat: [ColorFormats, (val: ColorFormats) => void];
  output: string;
  classes?: string;
}

const colorFormats = [...Object.values(ColorFormats)].map((format) => (
  <MenuItem key={format} value={format}>
    {format}
  </MenuItem>
));

export const SecondarySettingModalComponent: FC<Props> = ({
  openModal,
  colorFormat,
  output,
  classes,
}) => {
  const [open, toggleOpen] = openModal;
  const [format, setFormat] = colorFormat;

  return (
    <>
      <button className={classes} onClick={() => toggleOpen()}>
        {output}
      </button>
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
            <FormLabel id="color-info-select-label">
              Secondary Information
            </FormLabel>
            <Select
              labelId="color-info-select-label"
              value={format}
              onChange={({ target }: SelectChangeEvent) =>
                setFormat(target.value as ColorFormats)
              }
            >
              {colorFormats}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => toggleOpen()}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
