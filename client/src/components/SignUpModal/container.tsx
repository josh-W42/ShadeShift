import { FC, useContext, useState } from 'react';
import { BASE_SERVER_URL, Context, UserData } from '../../utils';
import { SignUpModalComponent } from './component';

interface SignInResponse {
  data: UserData;
}

export const SignUpModal: FC = () => {
  const { signUpModal, notifications, user } = useContext(Context);
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (!userName || !password) return;

    try {
      const response = await fetch(BASE_SERVER_URL + '/users', {
        method: 'POST',
        body: JSON.stringify({ username: userName, password: password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const resJSON: SignInResponse = await response.json();

      if (!response.ok) {
        throw new Error(
          `Status:${response.status}\nData:${Object.entries(
            resJSON
          ).toString()}`
        );
      }

      const { data } = resJSON;
      const { id, palettes, username } = data;

      user.setValue({
        id: id,
        savedPalettes: new Set(palettes.map((palette) => palette.colors)),
        username: username,
      });

      notifications.setNotifications([
        ...notifications.notifications,
        {
          message: 'Sign up Success.',
          severity: 'success',
          key: new Date().getTime(),
        },
      ]);

      setUserName('');
      setPassword('');

      signUpModal.setOpen(false);
    } catch (error) {
      console.error(error);
      notifications.setNotifications([
        ...notifications.notifications,
        {
          message: 'Login Failed. Please Try Again.',
          severity: 'error',
          key: new Date().getTime(),
        },
      ]);
    }
  };

  return (
    <SignUpModalComponent
      openModal={[
        signUpModal.isOpen,
        () => {
          signUpModal.setOpen(!signUpModal.isOpen);
          setUserName('');
          setPassword('');
        },
      ]}
      visiblePassword={[showPassword, () => setShowPassword(!showPassword)]}
      handleSubmit={handleSubmit}
      username={[userName, setUserName]}
      password={[password, setPassword]}
    />
  );
};
