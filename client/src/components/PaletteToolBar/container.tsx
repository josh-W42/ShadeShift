import { FunctionComponent, useContext } from 'react';
import { PaletteToolBarComponent } from './component';
import { Context, getGenURL, PaletteContext } from '../../utils';
import { History } from '../../classes';
import { useNavigate } from 'react-router-dom';

export const PaletteToolBar: FunctionComponent = () => {
  const { theme, genConfig } = useContext(Context);
  const { viewModal } = useContext(PaletteContext);
  const navigate = useNavigate();
  const genUrl = getGenURL(genConfig.value);

  const handleUndo = (current: string) => {
    const last = History.goBack(current);
    navigate(last);
  };

  const handleRedo = (current: string) => {
    const next = History.goForward(current);
    navigate(next);
  };

  return (
    <PaletteToolBarComponent
      theme={theme.value}
      genUrl={genUrl}
      handleUndo={handleUndo}
      handleRedo={handleRedo}
      openViewModal={() => viewModal.setOpen(true)}
    />
  );
};