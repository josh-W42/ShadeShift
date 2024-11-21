import { PaletteData } from '../palettes';

export interface UserData {
  id: string;
  username: string;
  palettes: PaletteData[];
}

export interface User {
  id: string;
  username: string;
  savedPalettes: Set<string>;
}
