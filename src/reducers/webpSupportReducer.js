import * as ActionTypes from '../actions/types';

// configure initial state
const initialState = true;

/**
 * redux reducer: reduce the webp image support state
 * @param {boolean} state the previous state
 * @param {object} action the action to perform
 */
export const webpSupport = (state = initialState, { type, payload }) => {
	// check the action type
	switch (type) {
		// check if asking to set the webp image support
		case ActionTypes.SET_WEBP_SUPPORT:
			return payload;

		default:
			return state;
	}
};
