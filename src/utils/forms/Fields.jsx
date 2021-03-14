import React, { useState, useMemo, useEffect, Fragment } from 'react';
import { PropTypes } from 'prop-types';

import { Box } from '@material-ui/core';

import Field from './Field';

// configure the prop types validation
Fields.propTypes = {
	fields: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			payload: PropTypes.any.isRequired,
			checkField: PropTypes.func.isRequired,
			fieldParam: PropTypes.object
		})
	).isRequired,
	autoSubmit: PropTypes.func.isRequired,
	trigger: PropTypes.bool.isRequired,
	setForm: PropTypes.func.isRequired,
	currentFieldsName: PropTypes.string,
	currentFieldsIndex: PropTypes.number
};

function Fields({
	fields,
	autoSubmit,
	trigger,
	setForm: setParentForm,
	currentFieldsName,
	currentFieldsIndex
}) {
	// setup form states
	const [form, setForm] = useState(
		fields.reduce(
			(object, { name, payload, checkField, setter }) => ({
				...object,
				[name]:
					typeof payload !== 'object'
						? {
								value: payload,
								error: '',
								triggered: false,
								currentErrorMessage: '',
								checkField,
								setter: setter // could be undefined
						  }
						: []
			}),
			{}
		)
	);

	// setup form handler
	const handleForm = useMemo(
		() => ({
			// handle field update
			onChange: (field, isCheckbox = false) => ({ target }) => {
				// check if the field checker is not defined
				if (form[field].checkField === undefined) {
					return;
				}

				// retrieve the value
				const value = isCheckbox ? target.checked : target.value;

				// retrieve the error message
				const error = form[field].checkField(value);

				// update the form
				setForm({
					...form,
					[field]: {
						...form[field],
						value,
						error: form[field].triggered ? error : '',
						currentErrorMessage: error
					}
				});

				// check if a setter is defined
				if (form[field].setter !== undefined) {
					// set the data
					form[field].setter(value);
				}
			},
			// handle field blur
			onBlur: field => ({ target }) => {
				// check if the field trigger is not defined or if the field is already triggered
				if (
					form[field].triggered === undefined ||
					form[field].triggered
				) {
					return;
				}

				// update the form
				setForm({
					...form,
					[field]: {
						...form[field],
						error: form[field].checkField(target.value),
						triggered: true
					}
				});
			}
		}),
		[form]
	);

	// setup the error message and the trigger status
	useEffect(() => {
		// retrieve a copy of the form
		const formCopy = { ...form };

		// loop all fields
		for (const fieldName in formCopy) {
			// retrieve the current field
			const field = formCopy[fieldName];

			// check if the field contains a field checker
			if (field.checkField !== undefined) {
				// retrieve the error message
				const error = field.checkField(field.value);

				// update the form copy
				field.error = trigger ? error : '';
				field.triggered = trigger;
				field.currentErrorMessage = error;
			}
		}

		// update the form
		setForm(formCopy);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [trigger]);

	// update the parent form
	useEffect(() => {
		// check if the parent field name is not defined
		if (currentFieldsName === undefined) {
			setParentForm(form);

			return;
		}

		setParentForm(prev => {
			// retrieve a copy of the form
			const formCopy = { ...prev };

			// update the current form
			formCopy[currentFieldsName][currentFieldsIndex] = form;

			// return the updated copy
			return formCopy;
		});
	}, [currentFieldsIndex, form, currentFieldsName, setParentForm]);

	return fields.map(field =>
		typeof field.payload !== 'object' ? (
			<Box mb={2} key={field.name}>
				<Field
					field={{ name: field.name, ...field.fieldParam }}
					form={form}
					handleForm={handleForm}
					autoSubmit={autoSubmit}
					preName={
						currentFieldsName !== undefined
							? `${currentFieldsName}_${currentFieldsIndex}`
							: ''
					}
				/>
			</Box>
		) : (
			<Fragment key={field.name}>
				{field.payload.map((subFields, index) => (
					<Fields
						fields={subFields}
						autoSubmit={autoSubmit}
						trigger={trigger}
						setForm={setForm}
						currentFieldsName={field.name}
						currentFieldsIndex={index}
						key={index}
					/>
				))}
			</Fragment>
		)
	);
}

export default Fields;
