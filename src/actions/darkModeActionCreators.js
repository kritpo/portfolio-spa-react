import * as ActionTypes from './types';

/**
 * redux action: set the theme mode
 */
export const setThemeMode = payload => ({
	type: ActionTypes.SET_THEME_MODE,
	payload
});

/**
 * redux action: set to light mode
 */
export const setToLightMode = () => ({
	type: ActionTypes.SET_LIGHT_MODE
});

/**
 * redux action: set to dark mode
 */
export const setToDarkMode = () => ({
	type: ActionTypes.SET_DARK_MODE
});
