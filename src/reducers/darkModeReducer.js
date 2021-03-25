import { SET_THEME_MODE } from '../actions/types';

// configure initial state
const initialState = false;

/**
 * redux reducer: reduce the dark mode state
 * @param {boolean} state the previous state
 * @param {object} action the action to perform
 * @returns the new state
 */
export const darkMode = (state = initialState, { type, payload }) => {
	// check the action type
	switch (type) {
		// check if asking to set the theme mode
		case SET_THEME_MODE:
			return payload;

		default:
			return state;
	}
};
