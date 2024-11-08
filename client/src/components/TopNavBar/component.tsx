import { FunctionComponent } from 'react';
import { Theme } from '../../utils';
import { Link } from 'react-router-dom';

interface Props {
  theme: Theme;
}

export const TopNavBarComponent: FunctionComponent<Props> = ({ theme }) => {
  return (
    <div style={{ backgroundColor: theme.primary, padding: 0, margin: 0 }}>
      <Link to={'generate'}>
        <button
          style={{
            background: theme.tertiary,
            color: theme.darker,
            borderColor: theme.darker,
          }}
        >
          Generate
        </button>
      </Link>
    </div>
  );
};
