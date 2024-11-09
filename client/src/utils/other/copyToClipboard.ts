/**
 * Copies a given string to the user's clipboard.
 *
 * @todo Add some form of indicator (like A toast message) for the user to give a visual cue.
 *
 * @param value The string to copy
 */
export const copyToClipBoard = (value: string) => {
  navigator.clipboard.writeText(value);
};
