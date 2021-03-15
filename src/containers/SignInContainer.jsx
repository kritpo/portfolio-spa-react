import React, { useCallback } from 'react';
import { PropTypes } from 'prop-types';

import { useHistory } from 'react-router-dom';

import { connect } from 'react-redux';

import { Auth } from 'aws-amplify';

import { login } from '../actions';
import { HOME } from '../routes';
import checkField, { checkMinLength } from '../utils/forms/checkField';
import { TEXT, PASSWORD as PASSWORD_TYPE } from '../utils/forms/Field';

import SignIn from '../components/SignIn';

// setup field name constants
const USERNAME = 'username';
const PASSWORD = 'password';

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
	const data = [
		{
			name: USERNAME,
			payload: defaultUsername
		},
		{
			name: PASSWORD,
			payload: ''
		}
	];

	// setup the form template
	const template = {
		[USERNAME]: {
			type: TEXT,
			label: 'Pseudo',
			checkField: checkField([checkMinLength(3)]),
			inputParam: {
				placeholder: 'dupont'
			}
		},
		[PASSWORD]: {
			type: PASSWORD_TYPE,
			label: 'Mot de passe',
			checkField: checkField([checkMinLength(1)]),
			inputParam: {
				placeholder: 'Mot de passe'
			}
		}
	};

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

	return (
		<SignIn
			data={data}
			template={template}
			onSubmit={onSubmit}
			{...props}
		/>
	);
}

export default connect(null, mapDispatchToProps)(SignInContainer);
