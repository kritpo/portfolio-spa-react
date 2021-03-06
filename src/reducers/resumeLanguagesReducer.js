import {
	RESUME_LANGUAGES_FAILED,
	RESUME_LANGUAGES_LOADED,
	RESUME_LANGUAGES_LOADING,
	UPDATE_RESUME_DEFAULT_LANGUAGE
} from '../actions/types';

// configure initial state
const initialState = {
	isLoading: true,
	resumeLanguages: {},
	error: null
};

/**
 * redux reducer: reduce the resume languages state
 * @param {object} state the previous state
 * @param {object} action the action to perform
 * @returns the new state
 */
export const resumeLanguages = (state = initialState, { type, payload }) => {
	// check the action type
	switch (type) {
		// check if the resume languages is loading
		case RESUME_LANGUAGES_LOADING:
			return {
				...state,
				isLoading: true,
				resumeLanguages: {},
				error: null
			};

		// check if the resume languages is loaded
		case RESUME_LANGUAGES_LOADED:
			return {
				...state,
				isLoading: false,
				resumeLanguages: payload,
				error: null
			};

		// check if the fetching of the resume languages has failed
		case RESUME_LANGUAGES_FAILED:
			return {
				...state,
				isLoading: false,
				resumeLanguages: {},
				error: payload
			};

		// check if ask to update the default language
		case UPDATE_RESUME_DEFAULT_LANGUAGE:
			return {
				...state,
				isLoading: false,
				resumeLanguages: {
					...state.resumeLanguages,
					defaultLanguage: payload
				},
				error: null
			};

		default:
			return state;
	}
};
