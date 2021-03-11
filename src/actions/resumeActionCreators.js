import { API } from 'aws-amplify';

import { RESUME_LOADING, RESUME_LOADED, RESUME_FAILED } from './types';

/**
 * fetch the resume on GitHub Gist
 */
export const fetchResume = () => dispatch => {
	// update status of the state as loading
	dispatch(resumeLoading());

	// fetch data on GitHub Gist
	return (
		API.get('PortfolioAPIServerless', '/resumes/jimmy', {})
			.then(resume => {
				// FIXME temporary fix by attributing id to career items
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
				dispatch(resumeLoaded(resume));
			})
			// update status of the state as failed with the error message
			.catch(({ message }) => {
				dispatch(resumeFailed(message));
			})
	);
};

/**
 * redux action: set the redux state to loading
 * @returns the action
 */
export const resumeLoading = () => ({
	type: RESUME_LOADING
});

/**
 * redux action: set the redux state to loaded
 * @param {object} payload data to load into the state
 * @returns the action
 */
export const resumeLoaded = payload => ({
	type: RESUME_LOADED,
	payload
});

/**
 * redux action: set the redux state to failed
 * @param {string} payload error message
 * @returns the action
 */
export const resumeFailed = payload => ({
	type: RESUME_FAILED,
	payload
});
