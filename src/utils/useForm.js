import { useState, useCallback } from 'react';

import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import useFields from './useFields';

/**
 * setup the form hook
 * @param {object} params the list of form params
 * @returns the hook variables
 */
const useForm = ({ fields, checkField, onSubmit, errorMessage }) => {
	// setup a recaptcha hook
	const { executeRecaptcha } = useGoogleReCaptcha();

	// setup the fields hook
	const { form, handleForm, checkNoError } = useFields({
		fields,
		checkField
	});

	// setup form states
	const [isSending, setIsSending] = useState(false);
	const [error, setError] = useState('');

	// setup the form submit handler
	const handleSubmit = useCallback(() => {
		// reset the error message
		setError('');

		// check if the form is correct
		if (checkNoError()) {
			// lock the form
			setIsSending(true);

			// setup the form unlock
			const unlockForm = () => setIsSending(false);

			// resolve the form submit promise
			onSubmit(form, executeRecaptcha(), unlockForm).catch(() => {
				// update the error message
				setError(errorMessage);

				// unlock the form
				unlockForm();
			});
		}
	}, [checkNoError, errorMessage, executeRecaptcha, form, onSubmit]);

	return { form, handleForm, handleSubmit, isSending, error };
};

export default useForm;
