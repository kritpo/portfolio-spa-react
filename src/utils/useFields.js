import { useState, useCallback, useMemo } from 'react';

/**
 * setup the fields hook
 * @param {object} params the list of form params
 * @returns the hook variables
 */
const useFields = ({ fields, checkField }) => {
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

	// setup the error checker
	const checkNoError = useCallback(() => {
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

		return fieldsError.join('') === '';
	}, [checkField, fields, form]);

	return { form, handleForm, checkNoError };
};

export default useFields;
