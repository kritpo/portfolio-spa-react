import { API } from 'aws-amplify';

import { fetchResumeLanguages } from './resumeLanguagesActionCreators';
import { DELETE_RESUME, MAIN_RESUME_FAILED, MAIN_RESUME_LOADED, MAIN_RESUME_LOADING, RESUME_FAILED, RESUME_LOADED, RESUME_LOADING, UPDATE_RESUME } from './types';

/**
 * fetch the resume on portfolio-api-serverless
 * @param {boolean} isMain if the resume fetching is to hydrate the main resume
 * @param {string} username the username to fetch
 * @param {string} languageCode the language to fetch
 * @returns the final promise
 */
export const fetchResume = (
	isMain = true,
	username = 'kritpo',
	languageCode
) => (dispatch, getState) => {
	// retrieve the current resumes
	const { mainResume, resume } = getState();
	const currentResume = isMain ? mainResume : resume;

	// check if the requested resume is the one loaded
	if (
		currentResume.resume.username === username &&
		currentResume.resume.languageCode === languageCode
	) {
		// return an auto-resolved promise
		return new Promise(resolve => resolve());
	}

	// update status of the state as loading
	dispatch(resumeLoading(isMain));

	// fetch the resume languages as well
	fetchResumeLanguages(isMain, username)(dispatch);

	// fetch the resume on the API
	return (
		API.get(
			'PortfolioAPIServerless',
			'/resumes/' +
				username +
				(languageCode !== undefined
					? '?languageCode=' + languageCode
					: ''),
			{}
		)
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

				return resume;
			})
			// update status of the state as failed with the error message
			.catch(({ message }) => {
				dispatch(resumeFailed(message, isMain));
			})
	);
};

/**
 * update the resume on portfolio-api-serverless
 * @param {object} resumePart the part of the resume to update
 * @returns the final promise
 */
export const updateResume = resumePart => (dispatch, getState) => {
	// retrieve the current resume and user
	const { resume, username } = getState();

	// check if the resume is not correctly loaded
	if (resume.isLoading || resume.error !== null) {
		// return an auto-resolved promise
		return new Promise(resolve => resolve());
	}

	// retrieve the final body
	const body = {
		isPartial: true,
		languageCode: resume.resume.languageCode,
		...resumePart
	};

	// update the resume on the API
	return API.put('PortfolioAPIServerless', '/resumes/' + username, {
		body
	}).then(() => {
		// update state with data
		dispatch(resumeUpdated(resumePart));
	});
};

/**
 * delete the resume on portfolio-api-serverless
 * @param languageCode the language code of the resume to delete
 * @returns the final promise
 */
export const deleteResume = languageCode => (dispatch, getState) => {
	// retrieve the current resume and user
	const { resume, username } = getState();

	// delete the resume on the API
	return API.del(
		'PortfolioAPIServerless',
		'/resumes/' + username + '?languageCode=' + languageCode,
		{}
	)
		.then(() => {
			// check if a resume is correctly loaded and if the loaded resume is wanted to delete one
			if (
				!resume.isLoading &&
				resume.error === null &&
				resume.resume.username === username &&
				resume.resume.languageCode === languageCode
			) {
				// update state with data
				dispatch(resumeDeleted());
			}
		})
		.finally(() => {
			// fetch the new resume languages as well
			fetchResumeLanguages(false, username)(dispatch);
		});
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

/**
 * redux action: update the resume
 * @param {object} payload the new sub part of resume
 * @returns the action
 */
export const resumeUpdated = payload => ({
	type: UPDATE_RESUME,
	payload
});

/**
 * redux action: delete the resume
 * @returns the action
 */
export const resumeDeleted = () => ({
	type: DELETE_RESUME
});
