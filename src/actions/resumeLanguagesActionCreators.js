import { API } from 'aws-amplify';

import {
	RESUME_LANGUAGES_LOADED,
	RESUME_LANGUAGES_FAILED,
	RESUME_LANGUAGES_LOADING,
	MAIN_RESUME_LANGUAGES_LOADING,
	MAIN_RESUME_LANGUAGES_LOADED,
	MAIN_RESUME_LANGUAGES_FAILED
} from './types';

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
