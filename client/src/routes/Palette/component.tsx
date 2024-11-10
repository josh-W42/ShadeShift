import Color from 'color';
import { FunctionComponent } from 'react';
import './palette.css';
import { copyToClipBoard } from '../../utils';

interface Props {
  colors: Color<string>[];
}

export const PalettePageComponent: FunctionComponent<Props> = ({ colors }) => {
  const getColors = () => {
    return colors.map((color, i) => (
      <div
        className={`colorBlock ${color.isDark() ? 'darkBlock' : 'lightBlock'}`}
        style={{
          backgroundColor: color.hexa(),
        }}
        key={color.hex() + i}
      >
        <button onClick={() => copyToClipBoard(color.hex())}>Copy</button>
        <button className="blockHexCode">{color.hex().slice(1)}</button>
        <button className="blockSecondaryInfo">
          {`rgb(${color.red()}, ${color.green()}, ${color.blue()})`}
        </button>
      </div>
    ));
  };

  return <div id="colorContainer">{getColors()}</div>;
};
