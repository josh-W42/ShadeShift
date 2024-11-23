import { FC, ReactElement, useContext } from 'react';
import { UserDrawerComponent } from './component';
import { Context } from '../../utils';
import Color from 'color';

interface Props {
  children: ReactElement | undefined;
}

export const UserDrawer: FC<Props> = ({ children }) => {
  const { user, userDrawerOpen } = useContext(Context);

  const getSavedPalettes: () => Color[][] = () => {
    if (user.value && user.value.savedPalettes) {
      const result: Color[][] = [...user.value.savedPalettes].map(
        (paletteString) =>
          paletteString.split('-').map((hexString) => Color(`#${hexString}`))
      );

      return result;
    }

    return [[]];
  };

  return (
    <UserDrawerComponent
      open={userDrawerOpen.isOpen}
      savedPalettes={getSavedPalettes()}
    >
      {children}
    </UserDrawerComponent>
  );
};
