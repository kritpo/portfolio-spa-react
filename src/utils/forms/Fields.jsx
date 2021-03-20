import { Box, Button, Paper } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import { useTheme } from '@material-ui/styles';
import { PropTypes } from 'prop-types';
import React, { useCallback, useMemo } from 'react';

import Field from './Field';

// configure the prop types validation
Fields.propTypes = {
	form: PropTypes.objectOf(
		PropTypes.oneOfType([
			PropTypes.shape({
				value: PropTypes.any,
				error: PropTypes.string.isRequired,
				triggered: PropTypes.bool.isRequired
			}),
			PropTypes.array
		])
	).isRequired,
	setForm: PropTypes.func.isRequired,
	template: PropTypes.objectOf(
		PropTypes.oneOfType([
			PropTypes.shape({
				checkField: PropTypes.func.isRequired
			}),
			PropTypes.shape({
				subform: PropTypes.object.isRequired,
				addLabel: PropTypes.string.isRequired,
				removeLabel: PropTypes.string.isRequired
			})
		])
	).isRequired,
	autoSubmit: PropTypes.func.isRequired,
	currentFieldsName: PropTypes.string,
	currentFieldsIndex: PropTypes.number
};

function Fields({
	form,
	setForm,
	template,
	autoSubmit,
	currentFieldsName,
	currentFieldsIndex
}) {
	// setup the background color hooks
	const {
		palette: {
			background: { default: defaultBG }
		}
	} = useTheme();

	// setup form handler
	const handleForm = useMemo(
		() => ({
			// handle field update
			onChange: (field, isCheckbox = false) => ({ target }) => {
				// check if the field is an array
				if (Array.isArray(form[field]) === undefined) {
					return;
				}

				// retrieve the value
				const value = isCheckbox ? target.checked : target.value;

				// retrieve the error message
				const error = template[field].checkField(value);

				// update the form
				setForm(prev => ({
					...prev,
					[field]: {
						...prev[field],
						value,
						error: prev[field].triggered ? error : ''
					}
				}));
			},
			// handle field blur
			onBlur: field => ({ target }) => {
				// check if the field is an array or if the field is already triggered
				if (Array.isArray(form[field]) || form[field].triggered) {
					return;
				}

				// update the form
				setForm(prev => ({
					...prev,
					[field]: {
						...prev[field],
						error: template[field].checkField(target.value),
						triggered: true
					}
				}));
			},
			// handle field error trigger
			onError: field => error => {
				// check if the field error is already triggered or if the error is already setted
				if (form[field].error !== '' || form[field].error === error) {
					return;
				}

				// update the form
				setForm(prev => ({
					...prev,
					[field]: {
						...prev[field],
						error
					}
				}));
			}
		}),
		[form, setForm, template]
	);

	// setup the subform setter
	const setSubform = useCallback(
		(field, index) => newSubform => {
			// update the field with the new subform
			setForm(prev => {
				// retrieve a copy of the form
				const formCopy = { ...prev };

				// update the form copy
				formCopy[field][index] =
					typeof newSubform === 'object'
						? newSubform
						: newSubform(formCopy[field][index]);

				return formCopy;
			});
		},
		[setForm]
	);

	// setup the add subform callback
	const addSubform = useCallback(
		field => () => {
			// create a new subform
			const subform = {};

			// check the template to hydrate the subform
			Object.entries(template[field].subform).forEach(
				([key, { subform: fieldSubform, defaultValue }]) => {
					// check if the field has a subform
					if (fieldSubform !== undefined) {
						// affect a empty array
						subform[key] = [];
					} else {
						// otherwise create a new field
						subform[key] = {
							value:
								defaultValue !== undefined ? defaultValue : '',
							error: '',
							triggered: false
						};
					}
				}
			);

			// update the form
			setForm(prev => {
				// retrieve a copy of the form
				const formCopy = { ...prev };

				// add the subform to the field
				formCopy[field].push(subform);

				return formCopy;
			});
		},
		[setForm, template]
	);

	// setup the remove subform callback
	const removeSubform = useCallback(
		(field, index) => () => {
			// update the form
			setForm(prev => {
				// retrieve a copy of the form
				const formCopy = { ...prev };

				// remove the subform from the field
				formCopy[field].splice(index, 1);

				return formCopy;
			});
		},
		[setForm]
	);

	return Object.entries(form).map(([key, field]) =>
		!Array.isArray(field) ? (
			<Box mb={2} key={key}>
				<Field
					form={form}
					template={{ name: key, ...template[key] }}
					handleForm={handleForm}
					autoSubmit={autoSubmit}
					preName={
						currentFieldsName !== undefined
							? `${currentFieldsName}_${currentFieldsIndex}`
							: undefined
					}
				/>
			</Box>
		) : (
			<Box mb={2} p={1} bgcolor={defaultBG} clone key={key}>
				<Paper elevation={4}>
					{field.map((subForm, index) => (
						<Box mb={2} p={1} clone key={index}>
							<Paper elevation={2}>
								<Button
									variant="contained"
									color="secondary"
									startIcon={<Remove />}
									onClick={removeSubform(key, index)}
								>
									{template[key].removeLabel}
								</Button>
								<Fields
									form={subForm}
									setForm={setSubform(key, index)}
									template={template[key].subform}
									autoSubmit={autoSubmit}
									currentFieldsName={`${
										currentFieldsName !== undefined
											? `${currentFieldsName}_${currentFieldsIndex}_`
											: ''
									}${key}`}
									currentFieldsIndex={index}
								/>
							</Paper>
						</Box>
					))}
					<Button
						variant="contained"
						color="secondary"
						startIcon={<Add />}
						onClick={addSubform(key)}
					>
						{template[key].addLabel}
					</Button>
				</Paper>
			</Box>
		)
	);
}

export default Fields;
