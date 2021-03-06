import React, { useState, useMemo } from 'react';

import { Auth } from 'aws-amplify';

import SignUpConfirm, { USERNAME, CODE } from '../components/SignUpConfirm';

/**
 * check the correctness of the field
 * @param {string} field the field name
 * @param {any} value the value to check
 * @returns
 */
const checkField = (field, value) => {
	// check if the field is the username
	if (field === USERNAME) {
		// check if the username is empty
		if (value === '') {
			return "Le nom d'utilisateur doit être précisé.";
		}
	}
	// check if the field is the email
	else if (field === CODE) {
		// check if the code is empty
		if (value === '') {
			return 'Le code doit être précisée.';
		}
	}

	return '';
};

function SignUpConfirmContainer({ location, ...props }) {
	// initialize the default username
	let defaultUsername = '';
	// check if the username state is defined in history
	if (location.state !== undefined && location.state.username !== undefined) {
		// define the default username
		defaultUsername = location.state.username;
	}

	// setup form states
	const [form, setForm] = useState({
		[USERNAME]: { value: defaultUsername, error: '', triggered: false },
		[CODE]: { value: '', error: '', triggered: false }
	});
	const [isSending, setIsSending] = useState(false);
	const [error, setError] = useState('');

	// setup form handler
	const handleForm = useMemo(
		() => ({
			// handle field update
			onChange: (field, isCheckbox = false) => event => {
				// retrieve the value
				const value = isCheckbox
					? event.target.checked
					: event.target.value;

				// update the form
				setForm({
					...form,
					[field]: {
						...form[field],
						value,
						error: form[field].triggered
							? checkField(field, value)
							: ''
					}
				});
			},
			// handle field blur
			onBlur: field => event => {
				// check if the field is already triggered
				if (form[field].triggered) {
					return;
				}

				// update the form
				setForm({
					...form,
					[field]: {
						...form[field],
						error: checkField(field, event.target.value),
						triggered: true
					}
				});
			},
			// handle form submit
			onSubmit: () => {
				// reset the error message
				setError('');

				// check all fields
				const usernameError = checkField(
					USERNAME,
					form[USERNAME].value
				);
				const codeError = checkField(CODE, form[CODE].value);

				// update the form with the checking
				setForm({
					...form,
					[USERNAME]: {
						...form[USERNAME],
						error: usernameError,
						triggered: true
					},
					[CODE]: {
						...form[CODE],
						error: codeError,
						triggered: true
					}
				});

				// check if the form is correct
				if (usernameError + codeError === '') {
					// change the state to be as loading
					setIsSending(true);

					// confirm the user's sign up
					Auth.confirmSignUp(form.username.value, form.code.value)
						.then(() => {
							console.log('confirmed');
						})
						.catch(() => {
							setError(
								'Une erreur inattendue est survenue. Vérifiez le code, sinon veuillez réessayer ultérieurement.'
							);
						})
						.finally(() => {
							setIsSending(false);
						});
				}
			}
		}),
		[form]
	);

	return (
		<SignUpConfirm
			form={form}
			handleForm={handleForm}
			isSending={isSending}
			error={error}
			{...props}
		/>
	);
}

export default SignUpConfirmContainer;
