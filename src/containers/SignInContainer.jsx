import React, { useCallback } from 'react';
import { PropTypes } from 'prop-types';

import { useHistory } from 'react-router-dom';

import { connect } from 'react-redux';

import { Auth } from 'aws-amplify';

import { login } from '../actions';
import { HOME } from '../routes';
import { TEXT, PASSWORD as PASSWORD_TYPE } from '../utils/forms/Field';

import SignIn, { USERNAME, PASSWORD } from '../components/SignIn';

/**
 * check the correctness of the username
 * @param {any} value the value to check
 * @returns
 */
const checkUsername = value => {
	// check if the username is empty
	if (value === '') {
		return "Le nom d'utilisateur doit être précisé.";
	}

	return '';
};

/**
 * check the correctness of the username
 * @param {any} value the value to check
 * @returns
 */
const checkPassword = value => {
	// check if the password is empty
	if (value === '') {
		return 'Le mot de passe doit être précisé.';
	}

	return '';
};

// configure the actions to pass as props to the component
const mapDispatchToProps = {
	login
};

// configure the prop types validation
SignInContainer.propTypes = {
	location: PropTypes.shape({
		state: PropTypes.object
	}).isRequired,
	login: PropTypes.func.isRequired
};

function SignInContainer({ location: { state }, login, ...props }) {
	// setup the history hook
	const history = useHistory();

	// retrieve the default username
	let defaultUsername =
		state !== undefined && state !== null && state.username !== undefined
			? state.username
			: '';

	// setup the fields data
	const fields = [
		{
			name: USERNAME,
			payload: defaultUsername,
			checkField: checkUsername,
			fieldParam: {
				type: TEXT,
				label: 'Pseudo',
				placeholder: 'dupont'
			}
		},
		{
			name: PASSWORD,
			payload: '',
			checkField: checkPassword,
			fieldParam: {
				type: PASSWORD_TYPE,
				label: 'Mot de passe',
				placeholder: 'Mot de passe'
			}
		}
	];

	// setup the onSubmit callback
	const onSubmit = useCallback(
		(form, reCaptchaToken) =>
			reCaptchaToken.then(token =>
				Auth.signIn(
					{
						username: form[USERNAME].value,
						password: form[PASSWORD].value
					},
					undefined,
					{
						recaptchaToken: token
					}
				).then(() => {
					// login the user
					login(form[USERNAME].value);

					// redirect the user to the home page
					history.push(HOME);
				})
			),
		[history, login]
	);

	return <SignIn fields={fields} onSubmit={onSubmit} {...props} />;
}

export default connect(null, mapDispatchToProps)(SignInContainer);
