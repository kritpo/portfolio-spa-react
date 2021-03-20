import { API } from 'aws-amplify';

import { MAIN_RESUME_LANGUAGES_FAILED, MAIN_RESUME_LANGUAGES_LOADED, MAIN_RESUME_LANGUAGES_LOADING, RESUME_LANGUAGES_FAILED, RESUME_LANGUAGES_LOADED, RESUME_LANGUAGES_LOADING, UPDATE_RESUME_DEFAULT_LANGUAGE } from './types';

/**
 * fetch the resume languages on portfolio-api-serverless
 * @param {boolean} isMain if the resume languages fetching is to hydrate the main resume languages
 * @param {string} username the username to fetch
 * @returns the final promise
 */
export const fetchResumeLanguages = (
	isMain = true,
	username = 'kritpo'
) => dispatch => {
	// update status of the state as loading
	dispatch(resumeLanguagesLoading(isMain));

	// fetch the resume languages on the API
	return (
		API.get(
			'PortfolioAPIServerless',
			'/resumes/' + username + '/languages',
			{}
		)
			.then(resumeLanguages => {
				// update state with fetched data
				dispatch(resumeLanguagesLoaded(resumeLanguages, isMain));
			})
			// update status of the state as failed with the error message
			.catch(({ message }) => {
				dispatch(resumeLanguagesFailed(message, isMain));
			})
	);
};

/**
 * update the resume default language code on portfolio-api-serverless
 * @param {string} languageCode the language code of the new default language
 * @returns the final promise
 */
export const updateResumeDefaultLanguage = languageCode => (
	dispatch,
	getState
) => {
	// retrieve the current resume languages and user
	const { resumeLanguages, username } = getState();

	// check if the resume languages is not correctly loaded
	if (resumeLanguages.isLoading || resumeLanguages.error !== null) {
		// return an auto-resolved promise
		return new Promise(resolve => resolve());
	}

	// retrieve the final body
	const body = {
		languageCode
	};

	// update the resume on the API
	return API.put(
		'PortfolioAPIServerless',
		'/resumes/' + username + '/languages',
		{
			body
		}
	).then(() => {
		// retrieve the language
		const language = resumeLanguages.resumeLanguages.languages.find(
			language => language.languageCode === languageCode
		);

		// update state with data
		dispatch(
			resumeDefaultLanguageUpdated(
				language !== undefined
					? language
					: resumeLanguages.resumeLanguages.defaultLanguage
			)
		);
	});
};

/**
 * redux action: set the redux state to loading
 * @param {boolean} isMain if the resume languages fetching is to hydrate the main resume languages
 * @returns the action
 */
export const resumeLanguagesLoading = isMain => ({
	type: isMain ? MAIN_RESUME_LANGUAGES_LOADING : RESUME_LANGUAGES_LOADING
});

/**
 * redux action: set the redux state to loaded
 * @param {object} payload data to load into the state
 * @param {boolean} isMain if the resume languages fetching is to hydrate the main resume languages
 * @returns the action
 */
export const resumeLanguagesLoaded = (payload, isMain) => ({
	type: isMain ? MAIN_RESUME_LANGUAGES_LOADED : RESUME_LANGUAGES_LOADED,
	payload
});

/**
 * redux action: set the redux state to failed
 * @param {string} payload error message
 * @param {boolean} isMain if the resume languages fetching is to hydrate the main resume languages
 * @returns the action
 */
export const resumeLanguagesFailed = (payload, isMain) => ({
	type: isMain ? MAIN_RESUME_LANGUAGES_FAILED : RESUME_LANGUAGES_FAILED,
	payload
});

/**
 * redux action: update the resume default language
 * @param {object} payload the new default language
 * @returns the action
 */
export const resumeDefaultLanguageUpdated = payload => ({
	type: UPDATE_RESUME_DEFAULT_LANGUAGE,
	payload
});
