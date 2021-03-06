import React, { useState, useMemo } from 'react';

import { useHistory } from 'react-router-dom';

import { Auth } from 'aws-amplify';

import * as routes from '../routes';

import SignUp, { USERNAME, EMAIL, PASSWORD, GDPR } from '../components/SignUp';

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
	else if (field === EMAIL) {
		// check if the email is empty
		if (value === '') {
			return "L'adresse mail doit être précisée.";
		}
		// check if the email includes a `@`
		else if (!value.includes('@')) {
			return "L'adresse mail doit être valide.";
		}
	}
	// check if the field is the password
	else if (field === PASSWORD) {
		// check if the password is lesser than 8 characters
		if (value.length < 8) {
			return 'Le mot de passe doit contenir plus de 8 caractères.';
		}
		// check if the password includes all types of characters
		else if (
			!value.match(
				// eslint-disable-next-line no-useless-escape
				/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[=+\-^$*.[\]{}()?"!@#%&\/\\,><':;|_~`])/
			)
		) {
			return 'Le mot de passe doit contenir des minuscules, majuscules, chiffres et caractères spéciaux.';
		}
	}
	// check if the field is the gdpr
	else if (field === GDPR) {
		// check if the gdpr is not checked
		if (!value) {
			return 'Vous devez accepter le traitement de vos données personnelles.';
		}
	}

	return '';
};

function SignUpContainer({ ...props }) {
	// setup the history hook
	const history = useHistory();

	// setup form states
	const [form, setForm] = useState({
		[USERNAME]: { value: '', error: '', triggered: false },
		[EMAIL]: { value: '', error: '', triggered: false },
		[PASSWORD]: { value: '', error: '', triggered: false },
		[GDPR]: { value: false, error: '', triggered: false }
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
				const emailError = checkField(EMAIL, form[EMAIL].value);
				const passwordError = checkField(
					PASSWORD,
					form[PASSWORD].value
				);
				const gdprError = checkField(GDPR, form[GDPR].value);

				// update the form with the checking
				setForm({
					...form,
					[USERNAME]: {
						...form[USERNAME],
						error: usernameError,
						triggered: true
					},
					[EMAIL]: {
						...form[EMAIL],
						error: emailError,
						triggered: true
					},
					[PASSWORD]: {
						...form[PASSWORD],
						error: passwordError,
						triggered: true
					},
					[GDPR]: {
						...form[GDPR],
						error: gdprError,
						triggered: true
					}
				});

				// check if the form is correct
				if (
					usernameError + emailError + passwordError + gdprError ===
					''
				) {
					// change the state to be as loading
					setIsSending(true);

					// sign up the user
					Auth.signUp({
						username: form.username.value,
						password: form.password.value,
						attributes: {
							email: form.email.value
						}
					})
						.then(() => {
							// redirect the user to the sign up confirmation page
							history.push(routes.SIGN_UP_CONFIRM, {
								username: form.username.value
							});
						})
						.catch(() => {
							// update error to show in the form
							setError(
								'Une erreur inattendue est survenue. Veuillez réessayer ultérieurement.'
							);

							// reset the loading state
							setIsSending(false);
						});
				}
			}
		}),
		[form, history]
	);

	return (
		<SignUp
			form={form}
			handleForm={handleForm}
			isSending={isSending}
			error={error}
			{...props}
		/>
	);
}

export default SignUpContainer;
