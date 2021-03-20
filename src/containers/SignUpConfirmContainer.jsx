import React, { useState, useCallback } from 'react';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { Auth } from 'aws-amplify';

import { SIGN_IN } from '../routes';
import checkField, { checkMinLength } from '../utils/forms/checkField';
import { TEXT } from '../utils/forms/Field/TextField';
import languages from '../utils/languages';

import SignUpConfirm from '../components/SignUpConfirm';

// setup field name constants
const USERNAME = 'username';
const CODE = 'code';

// configure the states to pass as props to the component
const mapStateToProps = ({ language }, ...props) => ({
	language,
	...props
});

// configure the prop types validation
SignUpConfirmContainer.propTypes = {
	location: PropTypes.shape({
		state: PropTypes.object
	}).isRequired,
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function SignUpConfirmContainer({
	location: { state },
	language: { systemLanguageCode },
	...props
}) {
	// setup the history hook
	const history = useHistory();

	// setup the form hook
	const [form, setForm] = useState({});

	// retrieve the default username
	let defaultUsername =
		state !== undefined && state !== null && state.username !== undefined
			? state.username
			: '';

	// setup the resend button messages hook
	const [resendWaitMessage, setResendWaitMessage] = useState('');
	const [resendErrorMessage, setResendErrorMessage] = useState('');

	// setup the fields data
	const data = [
		{
			name: USERNAME,
			payload: defaultUsername
		},
		{
			name: CODE,
			payload: ''
		}
	];

	// setup the form template
	const template = waitComponent => ({
		[USERNAME]: {
			type: TEXT,
			label: languages[systemLanguageCode].signUpConfirm.username.label,
			checkField: checkField([
				checkMinLength(
					3,
					languages[systemLanguageCode].checkFieldErrorMessage
						.minLength
				)
			]),
			inputParam: {
				placeholder:
					languages[systemLanguageCode].signUpConfirm.username
						.placeholder,
				InputProps: {
					endAdornment: waitComponent
				}
			}
		},
		[CODE]: {
			type: TEXT,
			label: languages[systemLanguageCode].signUpConfirm.code.label,
			checkField: checkField([
				checkMinLength(
					6,
					languages[systemLanguageCode].checkFieldErrorMessage
						.minLength
				)
			]),
			inputParam: {
				placeholder:
					languages[systemLanguageCode].signUpConfirm.code.placeholder
			}
		}
	});

	// setup the onSubmit callback
	const onSubmit = useCallback(
		form =>
			Auth.confirmSignUp(form[USERNAME].value, form[CODE].value).then(
				() => {
					// redirect the user to the sign in page
					history.push(SIGN_IN, {
						username: form[USERNAME].value
					});
				}
			),
		[history]
	);

	// setup the resend callback
	const resend = useCallback(
		() =>
			Auth.resendSignUp(
				form[USERNAME] !== undefined ? form[USERNAME].value : ''
			)
				.then(() => {
					// setup a interval to lock the update
					let waitLeft = 60;
					const interval = setInterval(() => {
						// decrement the wait time
						waitLeft--;

						// check if the wait time is null
						if (waitLeft === 0) {
							// clear the interval
							clearInterval(interval);

							// clear the wait message
							setResendWaitMessage('');

							return;
						}

						// update the wait message
						setResendWaitMessage(
							languages[
								systemLanguageCode
							].signUpConfirm.resendCode.waitingMessage(waitLeft)
						);
					}, 1000);
				})
				.catch(() => {
					// lock the resend button
					setResendErrorMessage(
						languages[systemLanguageCode].signUpConfirm.resendCode
							.error
					);

					// setup a timeout to unlock the resend button
					setTimeout(() => {
						// unlock the button
						setResendErrorMessage('');
					}, 1000);
				}),
		[form, systemLanguageCode]
	);

	return (
		<SignUpConfirm
			data={data}
			template={template}
			onSubmit={onSubmit}
			setForm={setForm}
			resend={resend}
			resendWaitMessage={resendWaitMessage}
			resendErrorMessage={resendErrorMessage}
			language={{ systemLanguageCode }}
			{...props}
		/>
	);
}

export default connect(mapStateToProps)(SignUpConfirmContainer);
