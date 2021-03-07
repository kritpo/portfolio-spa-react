import { Auth } from 'aws-amplify';

import { SET_USERNAME, RESET_USERNAME } from './types';

/**
 * logout the user
 */
export const logout = () => dispatch => {
	// logout the user
	return (
		Auth.signOut()
			// update the username
			.then(() => {
				dispatch(resetUsername());
			})
			// otherwise, log the error
			.catch(err => {
				console.log(err);
			})
	);
};

/**
 * redux action: update the username
 * @param {string} payload the username
 * @returns the action
 */
export const login = payload => ({
	type: SET_USERNAME,
	payload
});

/**
 * redux action: reset the username
 * @returns the action
 */
export const resetUsername = () => ({
	type: RESET_USERNAME
});
