import React, { useCallback, useMemo } from 'react';

import { Auth } from 'aws-amplify';

import useForm from '../utils/useForm';

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

function SignUpConfirmContainer({ location: { state }, ...props }) {
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
			Auth.confirmSignUp(form[USERNAME].value, form[CODE].value).then(
				() => {
					console.log('confirmed');
				}
			),
		[]
	);

	// setup form hook
	const { form, handleForm, isSending, error } = useForm({
		fields: [
			{ name: USERNAME, defaultValue: defaultUsername },
			{ name: CODE, defaultValue: '' }
		],
		checkField,
		onSubmit,
		errorMessage:
			'Une erreur inattendue est survenue. Vérifiez le code, sinon veuillez réessayer ultérieurement.'
	});

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
