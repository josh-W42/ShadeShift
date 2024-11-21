import { FC, useContext, useState } from 'react';
import {
  BASE_SERVER_URL,
  Context,
  NotificationContext,
  UserData,
} from '../../utils';
import { LoginModalComponent } from './component';

interface LoginResponse {
  data: {
    user: UserData;
  };
}

export const LoginModal: FC = () => {
  const { loginModal, user } = useContext(Context);
  const { notifications, setNotifications } = useContext(NotificationContext);
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      if (!userName || !password) {
        throw new Error('Null Username or Password');
      }

      const response = await fetch(BASE_SERVER_URL + '/login', {
        method: 'POST',
        body: JSON.stringify({ username: userName, password: password }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const resJSON: LoginResponse = await response.json();

      if (!response.ok) {
        throw new Error(
          `Status:${response.status}\nData:${Object.entries(
            resJSON
          ).toString()}`
        );
      }

      const { id, palettes, username } = resJSON.data.user;
      user.setValue({
        id: id,
        savedPalettes: new Set(palettes.map((palette) => palette.colors)),
        username: username,
      });

      loginModal.setOpen(false);
    } catch (error) {
      console.error(error);
      setNotifications([
        ...notifications,
        {
          message: 'Login Failed. Please Try Again.',
          severity: 'error',
          key: new Date().getTime(),
        },
      ]);
    }
  };

  return (
    <LoginModalComponent
      openModal={[
        loginModal.isOpen,
        () => {
          loginModal.setOpen(!loginModal.isOpen);
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
