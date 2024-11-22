import { FunctionComponent, useContext } from 'react';
import { PaletteToolBarComponent } from './component';
import {
  BASE_SERVER_URL,
  Context,
  getGenURL,
  NotificationContext,
  PaletteContext,
  PaletteData,
} from '../../utils';
import { History } from '../../classes';
import { useNavigate } from 'react-router-dom';

interface SavePaletteResponse {
  data: PaletteData;
}

export const PaletteToolBar: FunctionComponent = () => {
  const { theme, genConfig, user } = useContext(Context);
  const { viewModal } = useContext(PaletteContext);
  const { notifications, setNotifications } = useContext(NotificationContext);
  const navigate = useNavigate();
  const genUrl = getGenURL(genConfig.value);

  const handleUndo = (current: string) => {
    const last = History.goBack(current);
    navigate(last);
  };

  const handleRedo = (current: string) => {
    const next = History.goForward(current);
    navigate(next);
  };

  const handleSave = async (current: string) => {
    try {
      const response = await fetch(BASE_SERVER_URL + '/users/palettes', {
        method: 'POST',
        body: JSON.stringify({ colors: current.slice(1) }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          setNotifications([
            ...notifications,
            {
              message: 'You Must Login Before Saving!',
              severity: 'error',
              key: new Date().getTime(),
            },
          ]);

          throw new Error(`Status:${response.status}\nData: Unauthorized`);
        }

        const resJSON = await response.json();
        throw new Error(
          `Status:${response.status}\nData:${Object.entries(
            resJSON
          ).toString()}`
        );
      }

      const resJSON: SavePaletteResponse = await response.json();

      const { data } = resJSON;

      if (user.value == undefined) {
        throw new Error('User must log in.');
      }

      const newSet = new Set([...user.value.savedPalettes]);
      newSet.add(data.colors);
      user.setValue({ ...user.value, savedPalettes: newSet });
    } catch (error) {
      console.error(error);
      setNotifications([
        ...notifications,
        {
          message: 'Failed to Save Palette. Please try again.',
          severity: 'error',
          key: new Date().getTime(),
        },
      ]);
    }
  };

  return (
    <PaletteToolBarComponent
      theme={theme.value}
      genUrl={genUrl}
      user={user.value}
      handleUndo={handleUndo}
      handleRedo={handleRedo}
      handleSave={handleSave}
      openViewModal={() => viewModal.setOpen(true)}
    />
  );
};
