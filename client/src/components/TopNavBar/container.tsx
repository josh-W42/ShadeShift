import { useContext } from 'react';
import { TopNavBarComponent } from './component';
import { BASE_SERVER_URL, Context, getGenURL } from '../../utils';

export const TopNavBar = () => {
  const {
    genConfig,
    signUpModal,
    loginModal,
    user,
    userDrawerOpen,
    notifications,
  } = useContext(Context);
  const genUrl = getGenURL(genConfig.value);

  // const handleDb = async () => {
  //   try {
  //     const response = await fetch(BASE_SERVER_URL + '/users');

  //     const { data } = await response.json();

  //     console.log(data);

  //     if (!response.ok) {
  //       const data = await response.json();

  //       throw new Error(
  //         `Status:${response.status}\nData:${Object.entries(data).toString()}`
  //       );
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleLogout = async () => {
    try {
      const response = await fetch(BASE_SERVER_URL + '/logout');

      if (!response.ok) {
        throw new Error('Failed to logout');
      }

      user.setValue(undefined);
    } catch (error) {
      console.error(error);
      notifications.setNotifications([
        ...notifications.notifications,
        {
          message: 'Failed to Logout. Please Try Again.',
          severity: 'error',
          key: new Date().getTime(),
        },
      ]);
    }
  };

  return (
    <TopNavBarComponent
      genUrl={genUrl}
      user={user.value}
      userDrawer={[
        userDrawerOpen.isOpen,
        () => userDrawerOpen.setOpen(!userDrawerOpen.isOpen),
      ]}
      openSignUp={() => signUpModal.setOpen(true)}
      openLogin={() => loginModal.setOpen(true)}
      handleLogout={handleLogout}
    />
  );
};
