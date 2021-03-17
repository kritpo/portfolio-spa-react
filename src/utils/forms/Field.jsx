import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import DateFnsUtils from '@date-io/date-fns';

import {
	FormControl,
	FormControlLabel,
	FormHelperText,
	TextField,
	Checkbox,
	InputLabel,
	Select,
	MenuItem
} from '@material-ui/core';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from '@material-ui/pickers';

import MaskField from './MaskField';

// setup fields types constants
export const TEXT = 'text';
export const TEXTAREA = 'textarea';
export const EMAIL = 'email';
export const PASSWORD = 'password';
export const NUMBER_2 = 'number_2';
export const URL = 'url';
export const PHONE_NUMBER = 'phone_number';
export const COUNTRY_CODE = 'country_code';
export const CHECKBOX = 'checkbox';
export const SELECT = 'select';
export const DATE = 'date';
export const DATE_MASKABLE = 'date_maskable';

// setup data constant
export const MIN_DATE = new Date('1900-01-01');
export const MAX_DATE = new Date('2100-01-01');

// setup the mask array
const maskInput = {
	[NUMBER_2]: {
		mask: Number,
		props: {
			scale: 2,
			signed: false,
			thousandsSeparator: ' ',
			normalizeZeros: true,
			radix: '.',
			mapToRadix: [',']
		}
	},
	[URL]: {
		mask: /^((|h|ht|htt|https?|https?:|https?:\/|https?:\/\/)|(https?:\/\/[A-Za-z0-9\-_./+:#?%=&]+))$/
	},
	[PHONE_NUMBER]: {
		mask: '(+1[00]) 000 000 000 000 00',
		props: {
			definitions: {
				1: /[1-9]/
			}
		}
	},
	[COUNTRY_CODE]: {
		mask: 'AA',
		props: {
			definitions: {
				A: /[A-Z]/
			}
		}
	}
};

// configure the prop types validation
Field.propTypes = {
	form: PropTypes.objectOf(
		PropTypes.oneOfType([
			PropTypes.shape({
				value: PropTypes.any,
				error: PropTypes.string.isRequired
			}),
			PropTypes.array
		])
	).isRequired,
	template: PropTypes.shape({
		name: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		inputParam: PropTypes.object,
		configParam: PropTypes.object
	}).isRequired,
	handleForm: PropTypes.shape({
		onChange: PropTypes.func.isRequired,
		onBlur: PropTypes.func.isRequired
	}).isRequired,
	autoSubmit: PropTypes.func.isRequired,
	preName: PropTypes.string
};

function Field({
	form,
	template: { name, type, label, inputParam = {}, configParam = {} },
	handleForm: { onChange, onBlur },
	autoSubmit,
	preName
}) {
	// check the type of the field
	switch (type) {
		// if the field must be a text, a textarea, a email, a password, a number, a link, a phone number or a country code field
		case TEXT:
		case TEXTAREA:
		case EMAIL:
		case PASSWORD:
		case NUMBER_2:
		case URL:
		case PHONE_NUMBER:
		case COUNTRY_CODE:
			// retrieve the sub type
			const subType = type === EMAIL || type === PASSWORD ? type : 'text';

			return (
				<TextField
					id={`${preName !== undefined ? `${preName}_` : ''}${name}`}
					type={subType}
					label={label}
					value={form[name].value}
					helperText={form[name].error}
					onChange={onChange(name)}
					onBlur={onBlur(name)}
					error={form[name].error !== ''}
					onKeyPress={type !== TEXTAREA ? autoSubmit : undefined}
					multiline={type === TEXTAREA}
					fullWidth
					required
					{...inputParam}
					InputProps={
						maskInput[type] !== undefined
							? {
									inputComponent: MaskField
							  }
							: undefined
					}
					inputProps={
						maskInput[type] !== undefined
							? {
									mask: maskInput[type].mask,
									...maskInput[type].props
							  }
							: undefined
					}
				/>
			);

		// check if the field must be a checkbox field
		case CHECKBOX:
			return (
				<FormControl error={form[name].error !== ''} required>
					<FormControlLabel
						control={
							<Checkbox
								color="primary"
								checked={form[name].value}
								onChange={onChange(name, true)}
								onKeyPress={autoSubmit}
								required
							/>
						}
						label={label}
					/>
					<FormHelperText>{form[name].error}</FormHelperText>
				</FormControl>
			);

		// check if the field must be a select field
		case SELECT:
			return (
				<FormControl error={form[name].error !== ''} required>
					<InputLabel
						id={`${
							preName !== undefined ? `${preName}_` : ''
						}${name}-label`}
					>
						{label}
					</InputLabel>
					<Select
						labelId={`${
							preName !== undefined ? `${preName}_` : ''
						}${name}-label`}
						id={`${
							preName !== undefined ? `${preName}_` : ''
						}${name}`}
						value={form[name].value}
						onChange={onChange(name)}
						onBlur={onBlur(name)}
						onKeyPress={autoSubmit}
						required
					>
						{configParam.fields.map(field => (
							<MenuItem value={field} key={field}>
								{field}
							</MenuItem>
						))}
					</Select>
					<FormHelperText>{form[name].error}</FormHelperText>
				</FormControl>
			);

		// check if the field must be a date or a maskable date field
		case DATE:
		case DATE_MASKABLE:
			// setup local onChange
			const dateOnChange = date => {
				// check if the field is not triggered
				if (!form[name].triggered) {
					// trigger the blur event
					onBlur(name)({ target: { value: date } });
				}

				// trigger the change event
				onChange(name)({ target: { value: date } });
			};

			// retrieve fields
			const {
				minDate,
				minDateField,
				minDateMessage,
				maxDate,
				maxDateField,
				maxDateMessage
			} = configParam;

			// initialize the date value
			let currentValue = new Date();

			// check if the date value is not maximum === show date
			if (form[name].value !== MAX_DATE) {
				// update the date value
				currentValue = form[name].value;
			}

			// setup the date toggler
			const toggleCurrent = () => {
				// check if the date is not maximum === show date
				if (form[name].value !== MAX_DATE) {
					dateOnChange(MAX_DATE);
				} else {
					dateOnChange(new Date());
				}
			};

			return (
				<Fragment>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							id={`${
								preName !== undefined ? `${preName}_` : ''
							}${name}`}
							label={label}
							value={currentValue}
							onChange={dateOnChange}
							onKeyPress={autoSubmit}
							format="dd/MM/yyyy"
							minDateMessage={
								minDateMessage !== undefined
									? minDateMessage
									: 'La date ne devrait pas être avant à la date minimale'
							}
							minDate={
								minDate !== undefined ||
								minDateField !== undefined
									? minDateField !== undefined
										? minDate === undefined ||
										  form[minDateField].value > minDate
											? form[minDateField].value
											: minDate
										: minDate
									: MIN_DATE
							}
							maxDateMessage={
								maxDateMessage !== undefined
									? maxDateMessage
									: 'La date ne devrait pas être après à la date maximale'
							}
							maxDate={
								maxDate !== undefined ||
								maxDateField !== undefined
									? maxDateField !== undefined
										? maxDate === undefined ||
										  form[maxDateField].value < maxDate
											? form[maxDateField].value
											: maxDate
										: maxDate
									: MAX_DATE
							}
							disabled={
								type === DATE_MASKABLE &&
								form[name].value === MAX_DATE
							}
							error={form[name].error !== ''}
							required
						/>
					</MuiPickersUtilsProvider>
					{type === DATE_MASKABLE && (
						<FormControlLabel
							control={
								<Checkbox
									color="primary"
									checked={form[name].value === MAX_DATE}
									onChange={toggleCurrent}
								/>
							}
							label={'En cours'}
						/>
					)}
				</Fragment>
			);

		default:
			return null;
	}
}

export default Field;
