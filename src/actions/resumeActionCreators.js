import { API } from 'aws-amplify';

import {
	RESUME_LOADING,
	RESUME_LOADED,
	RESUME_FAILED,
	MAIN_RESUME_LOADING,
	MAIN_RESUME_LOADED,
	MAIN_RESUME_FAILED
} from './types';

/**
 * fetch the resume on portfolio-api-serverless
 * @param {boolean} isMain if the resume fetching is to hydrate the main resume
 * @param {string} username the username to fetch
 * @returns the final promise
 */
export const fetchResume = (isMain = true, username = 'kritpo') => dispatch => {
	// update status of the state as loading
	dispatch(resumeLoading(isMain));

	// fetch data on GitHub Gist
	return (
		API.get('PortfolioAPIServerless', '/resumes/' + username, {})
			.then(resume => {
				// setup an unique id for the life of the state
				let i = 0;
				resume.work = resume.work.map(workItem => ({
					...workItem,
					id: i++
				}));
				resume.education = resume.education.map(educationItem => ({
					...educationItem,
					id: i++
				}));
				resume.volunteer = resume.volunteer.map(volunteerItem => ({
					...volunteerItem,
					id: i++
				}));

				// update state with fetched data
				dispatch(resumeLoaded(resume, isMain));
			})
			// update status of the state as failed with the error message
			.catch(({ message }) => {
				dispatch(resumeFailed(message, isMain));
			})
	);
};

/**
 * redux action: set the redux state to loading
 * @param {boolean} isMain if the resume fetching is to hydrate the main resume
 * @returns the action
 */
export const resumeLoading = isMain => ({
	type: isMain ? MAIN_RESUME_LOADING : RESUME_LOADING
});

/**
 * redux action: set the redux state to loaded
 * @param {object} payload data to load into the state
 * @param {boolean} isMain if the resume fetching is to hydrate the main resume
 * @returns the action
 */
export const resumeLoaded = (payload, isMain) => ({
	type: isMain ? MAIN_RESUME_LOADED : RESUME_LOADED,
	payload
});

/**
 * redux action: set the redux state to failed
 * @param {string} payload error message
 * @param {boolean} isMain if the resume fetching is to hydrate the main resume
 * @returns the action
 */
export const resumeFailed = (payload, isMain) => ({
	type: isMain ? MAIN_RESUME_FAILED : RESUME_FAILED,
	payload
});
