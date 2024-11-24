import { GenerationType } from '../palettes';

export interface GenConfig {
  type: GenerationType;
  color?: string;
  num_colors?: number;
}

export enum GenConfigParams {
  type = 'type',
  color = 'color',
  num_colors = 'num_colors',
}

export const DEFAULT_CONFIG: GenConfig = {
  type: GenerationType.random,
  num_colors: 5,
};
