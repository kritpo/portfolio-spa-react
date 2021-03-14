import React, { useState, useCallback } from 'react';
import { PropTypes } from 'prop-types';

import { useHistory } from 'react-router-dom';

import { Auth } from 'aws-amplify';

import { SIGN_IN } from '../routes';
import { TEXT } from '../utils/forms/Field';

import SignUpConfirm, { USERNAME, CODE } from '../components/SignUpConfirm';

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
 * check the correctness of the code
 * @param {any} value the value to check
 * @returns
 */
const checkCode = (field, value) => {
	// check if the code is empty
	if (value === '') {
		return 'Le code doit être précisée.';
	}

	return '';
};

// configure the prop types validation
SignUpConfirmContainer.propTypes = {
	location: PropTypes.shape({
		state: PropTypes.object
	}).isRequired
};

function SignUpConfirmContainer({ location: { state }, ...props }) {
	// setup the history hook
	const history = useHistory();

	// setup the resend button messages hook
	const [resendWaitMessage, setResendWaitMessage] = useState('');
	const [resendErrorMessage, setResendErrorMessage] = useState('');

	// setup username hook
	const [username, setUsername] = useState(
		state !== undefined && state.username !== undefined
			? state.username
			: ''
	);

	// setup the fields data retriever
	const fields = waitComponent => [
		{
			name: USERNAME,
			payload: username,
			checkField: checkUsername,
			fieldParam: {
				type: TEXT,
				label: 'Pseudo',
				placeholder: 'dupont',
				InputProps: {
					endAdornment: waitComponent
				}
			},
			setter: setUsername
		},
		{
			name: CODE,
			payload: '',
			checkField: checkCode,
			fieldParam: {
				type: TEXT,
				label: 'Code de vérification',
				placeholder: '123456'
			}
		}
	];

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
			Auth.resendSignUp(username)
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
						setResendWaitMessage(`Attendez ${waitLeft}s`);
					}, 1000);

					console.log('re sended');
				})
				.catch(() => {
					// lock the resend button
					setResendErrorMessage('Erreur');

					// setup a timeout to unlock the resend button
					setTimeout(() => {
						// unlock the button
						setResendErrorMessage('');
					}, 1000);
				}),
		[username]
	);

	return (
		<SignUpConfirm
			fields={fields}
			onSubmit={onSubmit}
			resend={resend}
			resendWaitMessage={resendWaitMessage}
			resendErrorMessage={resendErrorMessage}
			{...props}
		/>
	);
}

export default SignUpConfirmContainer;
