import Color from 'color';
import { FC } from 'react';
import { SecondarySettingModal } from '../SecondarySettingModal';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import TonalityIcon from '@mui/icons-material/Tonality';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

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
          startIcon={<TonalityIcon />}
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
      <Tooltip title="Shades" placement="right">
        <IconButton
          className="colorBlockOption"
          sx={{ borderRadius: 0, width: 'fit-content' }}
          onClick={() => toggleShowShades()}
        >
          <TonalityIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Copy" placement="right">
        <IconButton
          className="colorBlockOption"
          sx={{ borderRadius: 0 }}
          onClick={() => handleCopy()}
        >
          <ContentCopyOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Remove" placement="right">
        <IconButton
          className="colorBlockOption"
          sx={{ borderRadius: 0 }}
          onClick={() => handleRemove()}
        >
          <CancelOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Box sx={{ flexGrow: 1 }}></Box>
      <Button
        sx={{ fontWeight: 'bolder', fontSize: '2em' }}
        className="blockHexCode"
      >
        {color.hex().slice(1)}
      </Button>
      <SecondarySettingModal classes={'blockSecondaryInfo'} color={color} />
      <Box sx={{ marginBottom: 10 }}></Box>
    </Box>
  );
};
