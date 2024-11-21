import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from '@mui/material';
import { FC } from 'react';

interface Props {
  openModal: [boolean, () => void];
  visiblePassword: [boolean, () => void];
  username: [string, (val: string) => void];
  password: [string, (val: string) => void];
  handleSubmit: () => void;
}

export const SignUpModalComponent: FC<Props> = ({
  openModal,
  visiblePassword,
  username,
  password,
  handleSubmit,
}) => {
  const [showPassword, handleShowPassword] = visiblePassword;
  const [open, toggleOpen] = openModal;
  const [usernameValue, setUserName] = username;
  const [passwordValue, setPassword] = password;

  return (
    <>
      <Dialog
        open={open}
        onClose={() => toggleOpen()}
        hideBackdrop
        PaperProps={{
          sx: {
            maxWidth: 'fit-content',
            width: 'fit-content',
            minWidth: '400px',
          },
          component: 'form',
        }}
      >
        <DialogTitle>Sign Up</DialogTitle>
        <DialogContent
          sx={{ padding: 10, display: 'flex', flexDirection: 'column' }}
        >
          <FormControl sx={{ margin: 1 }} variant="standard">
            <InputLabel htmlFor="username-field">Username</InputLabel>
            <Input
              id="username-field"
              type="text"
              value={usernameValue}
              autoComplete="off"
              onChange={({ currentTarget }) => setUserName(currentTarget.value)}
            />
          </FormControl>
          <FormControl sx={{ margin: 1 }} variant="standard">
            <InputLabel htmlFor="password-field">Password</InputLabel>
            <Input
              id="password-field"
              type={showPassword ? 'text' : 'password'}
              value={passwordValue}
              autoComplete="off"
              onChange={({ currentTarget }) => setPassword(currentTarget.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? 'hide the password'
                        : 'display the password'
                    }
                    onClick={() => handleShowPassword()}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', margin: '10px' }}>
          <Button
            onClick={() => handleSubmit()}
            sx={{ width: '100%' }}
            variant="contained"
          >
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
