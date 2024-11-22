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
  disableFocus?: boolean;
  onClick?: () => void;
  handleShadeClick: (color: Color) => void;
  handleRemove: () => void;
}

export const ColorBlockComponent: FC<Props> = ({
  color,
  showShades,
  toggleShowShades,
  shades,
  handleCopy,
  minimal,
  disableFocus,
  handleShadeClick,
  handleRemove,
  onClick,
}) => {
  if (minimal) {
    return (
      <Button
        disableElevation
        disableTouchRipple
        disableFocusRipple={disableFocus}
        tabIndex={disableFocus ? -1 : undefined}
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
        <Button
          key={shade.hexa()}
          disableElevation
          onClick={() => handleShadeClick(shade)}
          className={`shadeButton ${
            shade.isDark() ? 'darkShade' : 'lightShade'
          }`}
          style={{
            background: shade.hexa(),
            border: '0px',
            padding: 0,
            borderRadius: 0,
            height: '200px',
            transition: '2s',
          }}
        >
          <span className="hoverHex">
            {shade.hex() === color.hex() ? '' : shade.hex()}
          </span>
          <span className="currentShadeIndicator">
            {shade.hex() === color.hex() ? 'Current' : ''}
          </span>
        </Button>
      );
    });

    return (
      <Box
        sx={{ width: '100%', height: '95vh', padding: 0 }}
        className={`colorBlock ${color.isDark() ? 'darkBlock' : 'lightBlock'}`}
      >
        <Button
          style={{
            background: color.hex(),
            borderRadius: 0,
            textTransform: 'capitalize',
          }}
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
      <button onClick={() => handleRemove()}>Remove</button>
      <button onClick={() => handleCopy()}>Copy</button>
      <button className="blockHexCode">{color.hex().slice(1)}</button>
      <SecondarySettingModal classes={'blockSecondaryInfo'} color={color} />
    </Box>
  );
};
