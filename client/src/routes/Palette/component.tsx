import Color from 'color';
import { FunctionComponent } from 'react';
import './palette.css';
import { ColorBlock } from '../../components';

interface Props {
  colors: Color<string>[];
}

export const PalettePageComponent: FunctionComponent<Props> = ({ colors }) => {
  const getColors = () => {
    return colors.map((color) => <ColorBlock color={color} />);
  };
  return <div id="colorContainer">{getColors()}</div>;
};
