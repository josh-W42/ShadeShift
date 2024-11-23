import { useContext } from 'react';
import { TopNavBarComponent } from './component';
import { Context, getGenURL } from '../../utils';

export const TopNavBar = () => {
  const { genConfig, signUpModal, loginModal, user, userDrawerOpen } =
    useContext(Context);
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
    />
  );
};
