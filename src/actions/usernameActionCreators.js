import { Auth } from 'aws-amplify';

import { SET_USERNAME, RESET_USERNAME } from './types';

/**
 * auto-login the user
 */
export const autoLogin = () => dispatch => {
	// retrieve the current user if exists
	return (
		Auth.currentUserInfo()
			// update the username
			.then(({ username }) => {
				dispatch(login(username));
			})
			// otherwise, do nothing
			.catch(() => {})
	);
};

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
			.catch(() => {})
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
