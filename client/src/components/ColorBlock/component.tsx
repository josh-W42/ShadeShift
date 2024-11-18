import Color from 'color';
import { FC } from 'react';
import { SecondarySettingModal } from '../SecondarySettingModal';
import { Box, Button } from '@mui/material';

interface Props {
  color: Color;
  showShades: boolean;
  toggleShowShades: () => void;
  shades: Color[];
  handleCopy: () => void;
  minimal?: boolean;
  onClick?: () => void;
}

export const ColorBlockComponent: FC<Props> = ({
  color,
  showShades,
  toggleShowShades,
  shades,
  handleCopy,
  minimal,
  onClick,
}) => {
  if (minimal) {
    return (
      <Button
        disableElevation
        disableTouchRipple
        className={`colorBlock ${
          color.isDark() ? 'darkBlock' : 'lightBlock'
        } minimal`}
        sx={{
          backgroundColor: color.hexa(),
          borderRadius: 0,
        }}
        onClick={() => {
          if (onClick) onClick();
          handleCopy();
        }}
        key={color.hex()}
      >
        <Box className="blockHexCode">{color.hex().slice(1)}</Box>
      </Button>
    );
  }

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
      <Box
        className={`colorBlock ${color.isDark() ? 'darkBlock' : 'lightBlock'}`}
      >
        <Button
          style={{ background: color.hex() }}
          onClick={() => toggleShowShades()}
        >
          Shades
        </Button>
        {getShades}
      </Box>
    );
  }

  return (
    <Box
      className={`colorBlock ${color.isDark() ? 'darkBlock' : 'lightBlock'}`}
      style={{
        backgroundColor: color.hexa(),
      }}
      key={color.hex()}
    >
      <button onClick={() => toggleShowShades()}>Shades</button>
      <button onClick={() => handleCopy()}>Copy</button>
      <button className="blockHexCode">{color.hex().slice(1)}</button>
      <SecondarySettingModal classes={'blockSecondaryInfo'} color={color} />
    </Box>
  );
};
