import { GenerationType } from '../palettes';

export interface GenConfig {
  type: GenerationType;
  color?: string;
  num_colors?: number;
  secondary_color?: string;
  hue_shift_step?: number;
}

export enum GenConfigParams {
  type = 'type',
  color = 'color',
  secondary_color = 'secondary_color',
  num_colors = 'num_colors',
  hue_shift_step = 'hue_shift_step',
}

export const DEFAULT_CONFIG: GenConfig = {
  type: GenerationType.random,
  num_colors: 5,
  hue_shift_step: 12,
};
