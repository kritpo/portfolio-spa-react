import { SET_THEME_MODE, SET_LIGHT_MODE, SET_DARK_MODE } from './types';

/**
 * redux action: set the theme mode
 * @param {boolean} payload if set the dark mode
 * @returns the action
 */
export const setThemeMode = payload => ({
	type: SET_THEME_MODE,
	payload
});

/**
 * redux action: set to light mode
 * @returns the action
 */
export const setToLightMode = () => ({
	type: SET_LIGHT_MODE
});

/**
 * redux action: set to dark mode
 * @returns the action
 */
export const setToDarkMode = () => ({
	type: SET_DARK_MODE
});
