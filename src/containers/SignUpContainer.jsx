import React, { useCallback } from 'react';

import { useHistory } from 'react-router-dom';

import { Auth } from 'aws-amplify';

import { SIGN_UP_CONFIRM } from '../routes';
import {
	TEXT,
	EMAIL as EMAIL_TYPE,
	PASSWORD as PASSWORD_TYPE,
	CHECKBOX
} from '../utils/forms/Field';

import SignUp, { USERNAME, EMAIL, PASSWORD, GDPR } from '../components/SignUp';

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
 * check the correctness of the email
 * @param {any} value the value to check
 * @returns
 */
const checkEmail = value => {
	// check if the email is empty
	if (value === '') {
		return "L'adresse mail doit être précisée.";
	}
	// check if the email includes a `@`
	else if (!value.includes('@')) {
		return "L'adresse mail doit être valide.";
	}

	return '';
};

/**
 * check the correctness of the password
 * @param {any} value the value to check
 * @returns
 */
const checkPassword = value => {
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

	return '';
};

/**
 * check the correctness of the gdpr
 * @param {any} value the value to check
 * @returns
 */
const checkGDPR = value => {
	// check if the gdpr is not checked
	if (!value) {
		return 'Vous devez accepter le traitement de vos données personnelles.';
	}

	return '';
};

function SignUpContainer({ ...props }) {
	// setup the history hook
	const history = useHistory();

	// setup the fields data
	const fields = [
		{
			name: USERNAME,
			payload: '',
			checkField: checkUsername,
			fieldParam: {
				type: TEXT,
				label: 'Pseudo',
				placeholder: 'dupont'
			}
		},
		{
			name: EMAIL,
			payload: '',
			checkField: checkEmail,
			fieldParam: {
				type: EMAIL_TYPE,
				label: 'Adresse mail',
				placeholder: 'dupont@gmail.com'
			}
		},
		{
			name: PASSWORD,
			payload: '',
			checkField: checkPassword,
			fieldParam: {
				type: PASSWORD_TYPE,
				label: 'Mot de passe',
				placeholder: 'Mot de passe'
			}
		},
		{
			name: GDPR,
			payload: false,
			checkField: checkGDPR,
			fieldParam: {
				type: CHECKBOX,
				label:
					"J'ai pris connaissance et j'accepte sans réserves le traitement de mes données personnelles tel qu'énoncé dans les mentions légales."
			}
		}
	];

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

	return <SignUp fields={fields} onSubmit={onSubmit} {...props} />;
}

export default SignUpContainer;
