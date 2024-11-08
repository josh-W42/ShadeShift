import Color from 'color';
import { FunctionComponent } from 'react';

interface Props {
  colors: Color<string>[];
}

export const PalettePageComponent: FunctionComponent<Props> = ({ colors }) => {
  const getColors = () => {
    return colors.map((color) => (
      <div
        style={{
          height: '100px',
          width: '100px',
          backgroundColor: color.hexa(),
        }}
        key={color.hex()}
      >
        <p style={{ color: color.isDark() ? 'white' : 'black' }}>
          {color.keyword()}
        </p>
        <p>{color.chroma()}</p>
      </div>
    ));
  };

  return (
    <div>
      <div>{getColors()}</div>
    </div>
  );
};
