import LANGUAGE_CONST, { DEFAULT_LANGUAGE_CODE } from '../utils/languages/languageConst';
import { SET_LANGUAGE } from './types';

/**
 * redux action: set the language
 * @param {string} languageCode the new language code
 * @returns the action
 */
export const setLanguage = languageCode => {
	// check if the language code does not exist
	if (LANGUAGE_CONST[languageCode] === undefined) {
		// end the action here
		return;
	}

	// setup the payload
	const payload = {
		resumeLanguageCode: languageCode,
		systemLanguageCode: LANGUAGE_CONST[languageCode].support
			? languageCode
			: DEFAULT_LANGUAGE_CODE
	};

	return {
		type: SET_LANGUAGE,
		payload
	};
};
