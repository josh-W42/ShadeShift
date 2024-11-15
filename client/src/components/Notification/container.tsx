import { FC, useContext, useEffect, useState } from 'react';
import { SnackbarCloseReason } from '@mui/material';
import { NotificationContext, NotificationMessage } from '../../utils';
import { NotificationsComponent } from './component';

export const Notifications: FC = () => {
  const [open, setOpen] = useState(false);
  const { notifications, setNotifications } = useContext(NotificationContext);

  const [messageInfo, setMessageInfo] = useState<
    NotificationMessage | undefined
  >(undefined);

  useEffect(() => {
    if (notifications.length > 0 && messageInfo === undefined) {
      setMessageInfo({ ...notifications[0] });
      setNotifications(notifications.slice(1));
      setOpen(true);
    } else if (notifications.length > 0 && open) {
      setOpen(false);
    }
  }, [notifications, messageInfo, open]);

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <NotificationsComponent
      open={open}
      message={messageInfo?.message}
      handleExit={handleExited}
      handleClose={handleClose}
      severity={messageInfo?.severity}
    />
  );
};
