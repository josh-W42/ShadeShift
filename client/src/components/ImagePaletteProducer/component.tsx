import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Skeleton,
} from '@mui/material';
import Color from 'color';
import { ChangeEvent, FC } from 'react';
import { ColorBlock } from '../ColorBlock';
import { CloudUpload } from '@mui/icons-material';
import { GeneralPaletteMenu } from '../GeneralPaletteMenu';

interface Props {
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  imageURL: string;
  colors: Color[];
  handleSubmit: () => void;
  isLoading: boolean;
}

export const ImagePaletteProducerComponent: FC<Props> = ({
  handleFileChange,
  handleSubmit,
  imageURL,
  colors,
  isLoading,
}) => {
  const colorBlocks = colors.map((color) => {
    return <ColorBlock color={color} key={color.hexa()} minimal />;
  });

  return (
    <>
      <Card sx={{ maxWidth: '100%', width: 500 }} elevation={5}>
        <CardHeader
          title="Image Extract"
          subheader="Create a palette by uploading an image."
        />
        <CardMedia
          component="img"
          alt="Uploaded image"
          height="300"
          image={imageURL}
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <CardContent>
            {isLoading ? (
              <Skeleton sx={{ width: '100%', maxWidth: '100%' }}>
                <div className="minimalColorContainer">
                  <ColorBlock color={Color('#000000')} minimal />
                  <ColorBlock color={Color('#000000')} minimal />
                  <ColorBlock color={Color('#000000')} minimal />
                  <ColorBlock color={Color('#000000')} minimal />
                  <ColorBlock color={Color('#000000')} minimal />
                </div>
              </Skeleton>
            ) : (
              <div className="minimalColorContainer">{colorBlocks}</div>
            )}
          </CardContent>
          <CardActions>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUpload />}
              size="large"
            >
              Upload
              <input
                style={{ visibility: 'hidden', width: 0, height: 0 }}
                id="image-input"
                onChange={handleFileChange}
                name="image"
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
              />
            </Button>
            <Button
              size="large"
              variant="contained"
              onClick={() => handleSubmit()}
            >
              Create
            </Button>
            <GeneralPaletteMenu palette={colors} />
          </CardActions>
        </form>
      </Card>
    </>
  );
};
