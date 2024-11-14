import Color from 'color';
import { FC } from 'react';
import { copyToClipBoard } from '../../utils';
import { SecondarySettingModal } from '../SecondarySettingModal';

interface Props {
  color: Color;
  showShades: boolean;
  toggleShowShades: () => void;
  shades: Color[];
}

export const ColorBlockComponent: FC<Props> = ({
  color,
  showShades,
  toggleShowShades,
  shades,
}) => {
  if (showShades) {
    const getShades = shades.map((shade) => {
      return (
        <button
          className={`shadeButton ${
            shade.isDark() ? 'darkShade' : 'lightShade'
          }`}
          style={{ background: shade.hexa(), border: '0px' }}
        >
          <span className="hoverHex">{shade.hex()}</span>
          <span className="currentShadeIndicator">
            {shade.hex() === color.hex() ? '*' : ''}
          </span>
        </button>
      );
    });

    return (
      <div
        className={`colorBlock ${color.isDark() ? 'darkBlock' : 'lightBlock'}`}
      >
        <button
          style={{ background: color.hex() }}
          onClick={() => toggleShowShades()}
        >
          Shades
        </button>
        {getShades}
      </div>
    );
  }

  return (
    <div
      className={`colorBlock ${color.isDark() ? 'darkBlock' : 'lightBlock'}`}
      style={{
        backgroundColor: color.hexa(),
      }}
      key={color.hex()}
    >
      <button onClick={() => toggleShowShades()}>Shades</button>
      <button onClick={() => copyToClipBoard(color.hex())}>Copy</button>
      <button className="blockHexCode">{color.hex().slice(1)}</button>
      <SecondarySettingModal classes={'blockSecondaryInfo'} color={color} />
    </div>
  );
};
