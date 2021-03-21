import {
	MAIN_RESUME_LANGUAGES_FAILED,
	MAIN_RESUME_LANGUAGES_LOADED,
	MAIN_RESUME_LANGUAGES_LOADING
} from '../actions/types';

// configure initial state
const initialState = {
	isLoading: true,
	mainResumeLanguages: {},
	error: null
};

/**
 * redux reducer: reduce the main resume languages state
 * @param {object} state the previous state
 * @param {object} action the action to perform
 * @returns the new state
 */
export const mainResumeLanguages = (
	state = initialState,
	{ type, payload }
) => {
	// check the action type
	switch (type) {
		// check if the main resume languages is loading
		case MAIN_RESUME_LANGUAGES_LOADING:
			return {
				...state,
				isLoading: true,
				mainResumeLanguages: {},
				error: null
			};

		// check if the main resume languages is loaded
		case MAIN_RESUME_LANGUAGES_LOADED:
			return {
				...state,
				isLoading: false,
				mainResumeLanguages: payload,
				error: null
			};

		// check if the fetching of the main resume languages has failed
		case MAIN_RESUME_LANGUAGES_FAILED:
			return {
				...state,
				isLoading: false,
				mainResumeLanguages: {},
				error: payload
			};

		default:
			return state;
	}
};
