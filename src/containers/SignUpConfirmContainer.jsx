import { Auth } from 'aws-amplify';
import { PropTypes } from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SignUpConfirm from '../components/SignUpConfirm';
import { SIGN_IN } from '../routes';
import { TEXT } from '../utils/forms/Field/TextField';
import { encryptForm } from '../utils/forms/Form';
import checkField, {
	checkExactLength,
	checkMinLength,
	checkUpdated
} from '../utils/forms/checkField';
import languages from '../utils/languages';

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
	// setup the mounting status checker hook
	let _isMounted = useRef(true);

	// auto unsubscribe
	useEffect(
		// config the willUnmount cleanup
		() => () => {
			_isMounted.current = false;
		},
		[]
	);

	// setup the history hook
	const history = useHistory();

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

	// setup the form hook
	const [form, setForm] = useState(encryptForm(data));

	// setup the form template
	const template = waitComponent => ({
		[USERNAME]: {
			type: TEXT,
			label: languages[systemLanguageCode].signUpConfirm.username.label,
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
				checkUpdated(
					'',
					languages[systemLanguageCode].checkFieldErrorMessage.updated
				),
				checkExactLength(
					6,
					languages[systemLanguageCode].checkFieldErrorMessage
						.exactLength
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

							// check if the component is still mounted
							if (_isMounted.current) {
								// clear the wait message
								setResendWaitMessage('');
							}

							return;
						}

						// check if the component is still mounted
						if (_isMounted.current) {
							// update the wait message
							setResendWaitMessage(
								languages[
									systemLanguageCode
								].signUpConfirm.resendCode.waitingMessage(
									waitLeft
								)
							);
						}
					}, 1000);
				})
				.catch(() => {
					// check if the component is still mounted
					if (_isMounted.current) {
						// lock the resend button
						setResendErrorMessage(
							languages[systemLanguageCode].signUpConfirm
								.resendCode.error
						);
					}

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
