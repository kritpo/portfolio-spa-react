import * as ActionTypes from '../actions/types';

// configure initial state
const initialState = false;

/**
 * redux reducer: reduce the dark mode state
 * @param {boolean} state the previous state
 * @param {object} action the action to perform
 */
export const darkMode = (state = initialState, { type, payload }) => {
	// check the action type
	switch (type) {
		// check if asking to set the theme mode
		case ActionTypes.SET_THEME_MODE:
			return payload;

		// check if asking to set to light mode
		case ActionTypes.SET_LIGHT_MODE:
			return false;

		// check if asking to set to dark mode
		case ActionTypes.SET_DARK_MODE:
			return true;

		default:
			return state;
	}
};
