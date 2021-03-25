import {
	DELETE_RESUME,
	RESUME_FAILED,
	RESUME_LOADED,
	RESUME_LOADING,
	UPDATE_RESUME
} from '../actions/types';

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
 * @returns the new state
 */
export const resume = (state = initialState, { type, payload }) => {
	// check the action type
	switch (type) {
		// check if the resume is loading
		case RESUME_LOADING:
			return { ...state, isLoading: true, resume: {}, error: null };

		// check if the resume is loaded
		case RESUME_LOADED:
			return { ...state, isLoading: false, resume: payload, error: null };

		// check if the fetching of the resume has failed
		case RESUME_FAILED:
			return { ...state, isLoading: false, resume: {}, error: payload };

		// check if the asking to update the resume
		case UPDATE_RESUME:
			return {
				...state,
				isLoading: false,
				resume: { ...state.resume, ...payload },
				error: null
			};

		// check if the asking to delete the resume
		case DELETE_RESUME:
			return initialState;

		default:
			return state;
	}
};
