import { AlertColor } from '@mui/material';

export interface NotificationMessage {
  message: string;
  key: number;
  severity: AlertColor;
}
