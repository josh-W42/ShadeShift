import { ChangeEvent, FC, useState } from 'react';
import { ImagePaletteProducerComponent } from './component';
import Color from 'color';

const DEFAULT_IMAGE_URL =
  'https://res.cloudinary.com/dom5vocai/image/upload/f_auto,q_auto/map-min_cgscdw';

const IMAGE_EXTRACT_URL = 'http://localhost:8000/api/images/extract';

interface ImageResponseData {
  data: [number, number, number][];
}

// These colors should be the colors extracted from the DEFAULT_IMAGE_URL
// If the image changes, update this as well.
const DEFAULT_COLORS: Color[] = [
  Color('#947766'),
  Color('#B49D94'),
  Color('#4D342C'),
  Color('#DFD7D9'),
  Color('#7D513C'),
];

export const ImagePaletteProducer: FC = () => {
  const [imgURL, setImgURL] = useState(DEFAULT_IMAGE_URL);
  const [colors, setColors] = useState<Color[]>(DEFAULT_COLORS);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = ({
    currentTarget,
  }: ChangeEvent<HTMLInputElement>) => {
    const files = currentTarget.files;

    if (files && files.length > 0) {
      setImgURL(URL.createObjectURL(files.item(0) as Blob));
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const fileInput: HTMLInputElement | null =
      document.querySelector('#image-input');
    const formData = new FormData();

    if (!fileInput || !fileInput.files) return;

    formData.append('image', fileInput.files[0]);

    try {
      const response = await fetch(IMAGE_EXTRACT_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();

        throw new Error(
          `Status:${response.status}\nData:${Object.entries(data).toString()}`
        );
      }

      const { data }: ImageResponseData = await response.json();

      const results: Color[] = [];
      for (const triplet of data) {
        results.push(Color.rgb(triplet[0], triplet[1], triplet[2]));
      }

      setColors(results);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ImagePaletteProducerComponent
      imageURL={imgURL}
      handleFileChange={handleFileChange}
      colors={colors}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
};
