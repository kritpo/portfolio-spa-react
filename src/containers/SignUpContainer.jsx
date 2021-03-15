import React, { useCallback } from 'react';

import { useHistory } from 'react-router-dom';

import { Auth } from 'aws-amplify';

import { SIGN_UP_CONFIRM } from '../routes';
import checkField, {
	checkMinLength,
	checkContains,
	checkCharType,
	checkValue
} from '../utils/forms/checkField';
import {
	TEXT,
	EMAIL as EMAIL_TYPE,
	PASSWORD as PASSWORD_TYPE,
	CHECKBOX
} from '../utils/forms/Field';

import SignUp from '../components/SignUp';

// setup field name constants
const USERNAME = 'username';
const EMAIL = 'email';
const PASSWORD = 'password';
const GDPR = 'gdpr';

function SignUpContainer({ ...props }) {
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
			label: 'Pseudo',
			checkField: checkField([checkMinLength(3)]),
			inputParam: {
				placeholder: 'dupont'
			}
		},
		[EMAIL]: {
			type: EMAIL_TYPE,
			label: 'Adresse mail',
			checkField: checkField([checkMinLength(3), checkContains('@')]),
			inputParam: {
				placeholder: 'dupont@gmail.com'
			}
		},
		[PASSWORD]: {
			type: PASSWORD_TYPE,
			label: 'Mot de passe',
			checkField: checkField([
				checkMinLength(8),
				checkCharType({
					lowercase: true,
					uppercase: true,
					number: true,
					symbols: true
				})
			]),
			inputParam: {
				placeholder: 'Mot de passe'
			}
		},
		[GDPR]: {
			type: CHECKBOX,
			label:
				"J'ai pris connaissance et j'accepte sans réserves le traitement de mes données personnelles tel qu'énoncé dans les mentions légales.",
			checkField: checkField([checkValue(true)])
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
			{...props}
		/>
	);
}

export default SignUpContainer;
