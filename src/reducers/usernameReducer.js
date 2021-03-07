import { SET_USERNAME, RESET_USERNAME } from '../actions/types';

// configure initial state
const initialState = '';

/**
 * redux reducer: reduce the username state
 * @param {boolean} state the previous state
 * @param {object} action the action to perform
 * @returns the new state
 */
export const username = (state = initialState, { type, payload }) => {
	// check the action type
	switch (type) {
		// check if asking to set the username
		case SET_USERNAME:
			return payload;

		// check if asking to reset the username
		case RESET_USERNAME:
			return initialState;

		default:
			return state;
	}
};
