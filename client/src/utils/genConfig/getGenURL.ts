import { GenConfig } from './types';

/**
 * Given a GenConfig object, returns a URL string that will generate a palette
 * with the given configuration.
 *
 * @example
 * getGenURL({ type: GenerationType.random, num_colors: 6 })
 * // returns '/generate?type=random&num_colors=6'
 *
 * @param {GenConfig} config
 * @returns {string}
 */
export const getGenURL = (config: GenConfig) => {
  return (
    '/generate?' +
    [...Object.entries(config)]
      .map(([key, value]) => {
        return `${key}=${value}`;
      })
      .join('&')
  );
};
