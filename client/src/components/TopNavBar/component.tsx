import { FunctionComponent } from 'react';
import { Theme } from '../../utils';
import { Link } from 'react-router-dom';
import { PaletteGenModal } from '../PaletteGenModal';

interface Props {
  theme: Theme;
  genUrl: string;
}

export const TopNavBarComponent: FunctionComponent<Props> = ({
  theme,
  genUrl,
}) => {
  return (
    <div id="topNavBar" style={{ backgroundColor: theme.primary }}>
      <Link to={genUrl}>
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
      <PaletteGenModal />
    </div>
  );
};
