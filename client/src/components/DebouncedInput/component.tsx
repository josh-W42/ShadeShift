import { Input, InputProps } from '@mui/material';
import { ChangeEvent, useRef } from 'react';

type DebounceProps = {
  handleDebounce: (value: string) => void;
  debounceTimeout: number;
};

export function DebounceInput(props: InputProps & DebounceProps) {
  const { handleDebounce, debounceTimeout, ...other } = props;

  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      handleDebounce(event.target.value);
    }, debounceTimeout);
  };

  return <Input {...other} onChange={handleChange} />;
}
