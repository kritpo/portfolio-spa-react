import * as ActionTypes from '../actions/types';

// configure initial state
const initialState = {
	ref: null,
	inView: false,
	entry: null
};

/**
 * redux reducer: reduce the nav intersection state
 * @param {object} state the previous state
 * @param {object} param1 the action to perform
 */
export const navIntersection = (state = initialState, { type, payload }) => {
	// check the action type
	switch (type) {
		// check if the nav intersection observer is updating
		case ActionTypes.UPDATE_NAV_INTERSECTION:
			return { ...state, ...payload };

		default:
			return state;
	}
};
