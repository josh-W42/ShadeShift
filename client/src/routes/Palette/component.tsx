import Color from 'color';
import { FunctionComponent } from 'react';
import './palette.css';
import { ColorBlock, PaletteToolBar } from '../../components';

interface Props {
  colors: Color<string>[];
}

export const PalettePageComponent: FunctionComponent<Props> = ({ colors }) => {
  const getColors = () => {
    return colors.map((color, i) => (
      <ColorBlock key={color.hexa()} color={color} index={i} />
    ));
  };
  return (
    <div>
      <PaletteToolBar />
      <div id="colorContainer">{getColors()}</div>
    </div>
  );
};
