import { SET_LANGUAGE } from '../actions/types';
import { DEFAULT_LANGUAGE_CODE } from '../utils/languages/languageConst';

// configure initial state
const initialState = {
	resumeLanguageCode: DEFAULT_LANGUAGE_CODE,
	systemLanguageCode: DEFAULT_LANGUAGE_CODE
};

/**
 * redux reducer: reduce the language state
 * @param {boolean} state the previous state
 * @param {object} action the action to perform
 * @returns the new state
 */
export const language = (state = initialState, { type, payload }) => {
	// check the action type
	switch (type) {
		// check if asking to set the language
		case SET_LANGUAGE:
			return payload;

		default:
			return state;
	}
};
