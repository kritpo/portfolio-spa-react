import {
	MAIN_RESUME_LOADING,
	MAIN_RESUME_LOADED,
	MAIN_RESUME_FAILED
} from '../actions/types';

// configure initial state
const initialState = {
	isLoading: true,
	resume: {},
	error: null
};

/**
 * redux reducer: reduce the main resume state
 * @param {object} state the previous state
 * @param {object} action the action to perform
 * @returns the new state
 */
export const mainResume = (state = initialState, { type, payload }) => {
	// check the action type
	switch (type) {
		// check if the main resume is loading
		case MAIN_RESUME_LOADING:
			return { ...state, isLoading: true, resume: {}, error: null };

		// check if the main resume is loaded
		case MAIN_RESUME_LOADED:
			return { ...state, isLoading: false, resume: payload, error: null };

		// check if the fetching of the main resume has failed
		case MAIN_RESUME_FAILED:
			return { ...state, isLoading: false, resume: {}, error: payload };

		default:
			return state;
	}
};
