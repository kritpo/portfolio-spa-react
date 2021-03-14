import { useState, useCallback, useMemo } from 'react';

import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

/**
 * setup the form hook
 * @param {object} params the list of form params
 * @returns the hook variables
 */
const useForm = ({ fields, checkField, onSubmit, errorMessage }) => {
	// setup a recaptcha hook
	const { executeRecaptcha } = useGoogleReCaptcha();

	// setup form states
	const [form, setForm] = useState(
		fields.reduce(
			(object, { name, defaultValue }) => ({
				...object,
				[name]: {
					value: defaultValue,
					error: '',
					triggered: false
				}
			}),
			{}
		)
	);
	const [isSending, setIsSending] = useState(false);
	const [error, setError] = useState('');

	// setup form handler
	const handleForm = useMemo(
		() => ({
			// handle field update
			onChange: (field, isCheckbox = false) => ({ target }) => {
				// retrieve the value
				const value = isCheckbox ? target.checked : target.value;

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
			onBlur: field => ({ target }) => {
				// check if the field is already triggered
				if (form[field].triggered) {
					return;
				}

				// update the form
				setForm({
					...form,
					[field]: {
						...form[field],
						error: checkField(field, target.value),
						triggered: true
					}
				});
			}
		}),
		[checkField, form]
	);

	// setup the form submit handler
	const handleSubmit = useCallback(() => {
		// reset the error message
		setError('');

		// retrieve a copy of the form
		const formCopy = { ...form };

		// check all fields
		const fieldsError = [];
		fields.forEach(({ name }) => {
			// check for error
			const error = checkField(name, form[name].value);

			// add the error to the error list
			fieldsError.push(error);
			formCopy[name] = { ...form[name], error, triggered: true };
		});

		// update the form with the checking
		setForm(formCopy);

		// check if the form is correct
		if (fieldsError.join('') === '') {
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
	}, [checkField, errorMessage, executeRecaptcha, fields, form, onSubmit]);

	return { form, handleForm, handleSubmit, isSending, error };
};

export default useForm;
