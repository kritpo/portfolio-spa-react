import { SET_THEME_MODE } from './types';

/**
 * redux action: set the theme mode
 * @param {boolean} payload if set the dark mode
 * @returns the action
 */
export const setThemeMode = payload => ({
	type: SET_THEME_MODE,
	payload
});
