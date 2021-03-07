import React, { useCallback, useMemo } from 'react';

import { useHistory } from 'react-router-dom';

import { Auth } from 'aws-amplify';

import { HOME } from '../routes';

import useForm from '../utils/useForm';

import SignIn, { USERNAME, PASSWORD } from '../components/SignIn';

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
	// check if the field is the password
	else if (field === PASSWORD) {
		// check if the password is empty
		if (value === '') {
			return 'Le mot de passe doit être précisé.';
		}
	}

	return '';
};

function SignInContainer({ location: { state }, ...props }) {
	// setup the history hook
	const history = useHistory();

	// retrieve the default username
	let defaultUsername = useMemo(
		() =>
			state !== undefined && state.username !== undefined
				? state.username
				: '',
		[state]
	);

	// setup the onSubmit callback
	const onSubmit = useCallback(
		form =>
			Auth.signIn({
				username: form[USERNAME].value,
				password: form[PASSWORD].value
			}).then(() => {
				// redirect the user to the home page
				history.push(HOME);
			}),
		[history]
	);

	// setup form hook
	const { form, handleForm, isSending, error } = useForm({
		fields: [
			{ name: USERNAME, defaultValue: defaultUsername },
			{ name: PASSWORD, defaultValue: '' }
		],
		checkField,
		onSubmit,
		errorMessage:
			'Une erreur inattendue est survenue. Vérifiez vos identifiants, sinon veuillez réessayer ultérieurement.'
	});

	return (
		<SignIn
			form={form}
			handleForm={handleForm}
			isSending={isSending}
			error={error}
			{...props}
		/>
	);
}

export default SignInContainer;
