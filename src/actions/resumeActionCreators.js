import { RESUME_LOADING, RESUME_LOADED, RESUME_FAILED } from './types';

/**
 * fetch the resume on GitHub Gist
 */
export const fetchResume = () => dispatch => {
	// update status of the state as loading
	dispatch(resumeLoading());

	// fetch data on GitHub Gist
	return (
		fetch('https://api.github.com/gists/e0cfbc503fd33fb9b3a5be073510afa8')
			.then(response => {
				// check if no error occurred
				if (response.ok) {
					// return the response to continue
					return response;
				} else {
					// otherwise raise an exception with HTTP error
					throw new Error(
						'Error ' + response.status + ': ' + response.statusText
					);
				}
			})
			// parse the response as JSON
			.then(response => response.json())
			.then(response => {
				// retrieve the resume in JSON format
				const resume = JSON.parse(
					response.files['resume.json'].content
				);

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
