import { Auth } from 'aws-amplify';
import { PropTypes } from 'prop-types';
import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { login } from '../actions';
import SignIn from '../components/SignIn';
import { HOME } from '../routes';
import {
	PASSWORD as PASSWORD_TYPE,
	TEXT
} from '../utils/forms/Field/TextField';
import checkField, {
	checkMinLength,
	checkUpdated
} from '../utils/forms/checkField';
import languages from '../utils/languages';

// setup field name constants
const USERNAME = 'username';
const PASSWORD = 'password';

// configure the states to pass as props to the component
const mapStateToProps = ({ language }, ...props) => ({
	language,
	...props
});

// configure the actions to pass as props to the component
const mapDispatchToProps = {
	login
};

// configure the prop types validation
SignInContainer.propTypes = {
	location: PropTypes.shape({
		state: PropTypes.object
	}).isRequired,
	login: PropTypes.func.isRequired,
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function SignInContainer({
	location: { state },
	login,
	language: { systemLanguageCode },
	...props
}) {
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
			label: languages[systemLanguageCode].signIn.username.label,
			checkField: checkField([
				checkUpdated(
					'',
					languages[systemLanguageCode].checkFieldErrorMessage.updated
				),
				checkMinLength(
					3,
					languages[systemLanguageCode].checkFieldErrorMessage
						.minLength
				)
			]),
			inputParam: {
				placeholder:
					languages[systemLanguageCode].signIn.username.placeholder
			}
		},
		[PASSWORD]: {
			type: PASSWORD_TYPE,
			label: languages[systemLanguageCode].signIn.password.label,
			checkField: checkField([
				checkUpdated(
					'',
					languages[systemLanguageCode].checkFieldErrorMessage.updated
				)
			]),
			inputParam: {
				placeholder:
					languages[systemLanguageCode].signIn.password.placeholder
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
			language={{ systemLanguageCode }}
			{...props}
		/>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer);
