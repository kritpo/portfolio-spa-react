import React, { useCallback, useMemo } from 'react';
import { PropTypes } from 'prop-types';

import { useHistory } from 'react-router-dom';

import { connect } from 'react-redux';

import { Auth } from 'aws-amplify';

import { login } from '../actions';
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

// configure the actions to pass as props to the component
const mapDispatchToProps = {
	login
};

// configure the prop types validation
SignInContainer.propTypes = {
	location: PropTypes.shape({
		state: PropTypes.object
	}).isRequired,
	login: PropTypes.func.isRequired
};

function SignInContainer({ location: { state }, login, ...props }) {
	// setup the history hook
	const history = useHistory();

	// retrieve the default username
	let defaultUsername = useMemo(
		() =>
			state !== undefined &&
			state !== null &&
			state.username !== undefined
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
				// login the user
				login(form[USERNAME].value);

				// redirect the user to the home page
				history.push(HOME);
			}),
		[history, login]
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

export default connect(null, mapDispatchToProps)(SignInContainer);
