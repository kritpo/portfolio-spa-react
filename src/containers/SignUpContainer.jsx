import React, { useCallback } from 'react';

import { useHistory } from 'react-router-dom';

import { Auth } from 'aws-amplify';

import { SIGN_UP_CONFIRM } from '../routes';

import useForm from '../utils/useForm';

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

	// setup form hook
	const { form, handleForm, handleSubmit, isSending, error } = useForm({
		fields: [
			{ name: USERNAME, defaultValue: '' },
			{ name: EMAIL, defaultValue: '' },
			{ name: PASSWORD, defaultValue: '' },
			{ name: GDPR, defaultValue: false }
		],
		checkField,
		onSubmit,
		errorMessage:
			'Une erreur inattendue est survenue. Veuillez réessayer ultérieurement.'
	});

	return (
		<SignUp
			form={form}
			handleForm={handleForm}
			handleSubmit={handleSubmit}
			isSending={isSending}
			error={error}
			{...props}
		/>
	);
}

export default SignUpContainer;
