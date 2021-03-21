import { Auth } from 'aws-amplify';
import { PropTypes } from 'prop-types';
import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SignUp from '../components/SignUp';
import { SIGN_UP_CONFIRM } from '../routes';
import { CHECKBOX } from '../utils/forms/Field/CheckboxField';
import {
	EMAIL as EMAIL_TYPE,
	PASSWORD as PASSWORD_TYPE,
	TEXT
} from '../utils/forms/Field/TextField';
import checkField, {
	checkCharType,
	checkMinLength,
	checkRegex,
	checkValue
} from '../utils/forms/checkField';
import languages from '../utils/languages';

// setup field name constants
const USERNAME = 'username';
const EMAIL = 'email';
const PASSWORD = 'password';
const GDPR = 'gdpr';

// configure the states to pass as props to the component
const mapStateToProps = ({ language }, ...props) => ({
	language,
	...props
});

// configure the prop types validation
SignUpContainer.propTypes = {
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function SignUpContainer({ language: { systemLanguageCode }, ...props }) {
	// setup the history hook
	const history = useHistory();

	// setup the fields data
	const data = [
		{
			name: USERNAME,
			payload: ''
		},
		{
			name: EMAIL,
			payload: ''
		},
		{
			name: PASSWORD,
			payload: ''
		},
		{
			name: GDPR,
			payload: false
		}
	];

	// setup the form template
	const template = {
		[USERNAME]: {
			type: TEXT,
			label: languages[systemLanguageCode].signUp.username.label,
			checkField: checkField([
				checkMinLength(
					3,
					languages[systemLanguageCode].checkFieldErrorMessage
						.minLength
				)
			]),
			inputParam: {
				placeholder:
					languages[systemLanguageCode].signUp.username.placeholder
			}
		},
		[EMAIL]: {
			type: EMAIL_TYPE,
			label: languages[systemLanguageCode].signUp.email.label,
			checkField: checkField([
				checkMinLength(
					3,
					languages[systemLanguageCode].checkFieldErrorMessage
						.minLength
				),
				checkRegex(
					/^[a-z0-9.\-_]+@[a-z0-9.\-_]+\.[a-z0-9]{2,}$/,
					languages[systemLanguageCode].checkFieldErrorMessage.regex
				)
			]),
			inputParam: {
				placeholder:
					languages[systemLanguageCode].signUp.email.placeholder
			}
		},
		[PASSWORD]: {
			type: PASSWORD_TYPE,
			label: languages[systemLanguageCode].signUp.password.label,
			checkField: checkField([
				checkMinLength(
					8,
					languages[systemLanguageCode].checkFieldErrorMessage
						.minLength
				),
				checkCharType(
					{
						lowercase: true,
						uppercase: true,
						number: true,
						symbols: true
					},
					languages[systemLanguageCode].checkFieldErrorMessage
						.charType
				)
			]),
			inputParam: {
				placeholder:
					languages[systemLanguageCode].signUp.password.placeholder
			}
		},
		[GDPR]: {
			type: CHECKBOX,
			label: languages[systemLanguageCode].signUp.gdpr.label,
			checkField: checkField([
				checkValue(
					true,
					languages[systemLanguageCode].checkFieldErrorMessage.value
				)
			])
		}
	};

	// setup the onSubmit callback
	const onSubmit = useCallback(
		(form, reCaptchaToken) =>
			reCaptchaToken.then(token =>
				Auth.signUp({
					username: form[USERNAME].value,
					password: form[PASSWORD].value,
					attributes: {
						email: form[EMAIL].value
					},
					clientMetadata: {
						recaptchaToken: token
					}
				}).then(() => {
					// redirect the user to the sign up confirmation page
					history.push(SIGN_UP_CONFIRM, {
						username: form[USERNAME].value
					});
				})
			),
		[history]
	);

	return (
		<SignUp
			data={data}
			template={template}
			onSubmit={onSubmit}
			language={{ systemLanguageCode }}
			{...props}
		/>
	);
}

export default connect(mapStateToProps)(SignUpContainer);
