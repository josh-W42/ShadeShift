import { FC, useContext, useState } from 'react';
import { BASE_SERVER_URL, Context } from '../../utils';
import { SignUpModalComponent } from './component';

export const SignUpModal: FC = () => {
  const { signUpModal } = useContext(Context);
  const { notifications } = useContext(Context);
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
      const resJSON = await response.json();

      if (!response.ok) {
        throw new Error(
          `Status:${response.status}\nData:${Object.entries(
            resJSON
          ).toString()}`
        );
      }

      const { data } = resJSON;

      console.log(data);
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
