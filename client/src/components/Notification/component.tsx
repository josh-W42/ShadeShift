import {
  Alert,
  AlertColor,
  IconButton,
  Snackbar,
  SnackbarCloseReason,
} from '@mui/material';
import { FC, SyntheticEvent } from 'react';

interface Props {
  open: boolean;
  handleClose: (
    e: SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => void;
  message: string | undefined;
  handleExit: () => void;
  severity: AlertColor | undefined;
}

export const NotificationsComponent: FC<Props> = ({
  open,
  handleClose,
  handleExit,
  message,
  severity,
}) => {
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
        action={
          <>
            <IconButton
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            />
          </>
        }
        TransitionProps={{ onExited: handleExit }}
      >
        <Alert onClose={handleClose} variant="filled" severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};
