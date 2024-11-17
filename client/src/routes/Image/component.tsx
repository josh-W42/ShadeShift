import { FC } from 'react';
import { ImagePaletteProducer } from '../../components';

export const ImagePageComponent: FC = () => {
  return (
    <div
      style={{
        alignContent: 'center',
        justifyContent: 'center',
        display: 'flex',
        marginTop: '10px',
      }}
    >
      <ImagePaletteProducer />
    </div>
  );
};
