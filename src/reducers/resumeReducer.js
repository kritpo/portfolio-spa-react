import * as ActionTypes from '../actions/types';

// configure initial state
const initialState = {
	isLoading: true,
	resume: {},
	error: null
};

/**
 * redux reducer: reduce the resume state
 * @param {object} state the previous state
 * @param {object} action the action to perform
 */
export const resume = (state = initialState, { type, payload }) => {
	// check the action type
	switch (type) {
		// check if the resume is loading
		case ActionTypes.RESUME_LOADING:
			return { ...state, isLoading: true, resume: {}, error: null };

		// check if the resume is loaded
		case ActionTypes.RESUME_LOADED:
			return { ...state, isLoading: false, resume: payload, error: null };

		// check if the fetching of the resume has failed
		case ActionTypes.RESUME_FAILED:
			return { ...state, isLoading: false, resume: {}, error: payload };

		default:
			return state;
	}
};
