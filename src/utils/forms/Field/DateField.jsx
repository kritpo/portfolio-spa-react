import { PropTypes } from 'prop-types';
import React, { Fragment, useCallback } from 'react';

import DateFnsUtils from '@date-io/date-fns';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider
} from '@material-ui/pickers';

// setup fields types constants
export const DATE = 'date';
export const DATE_MASKABLE = 'date_maskable';

// setup data constant
export const MIN_DATE = new Date('1900-01-01');
export const MAX_DATE = new Date('2100-01-01');

// configure the prop types validation
DateField.propTypes = {
	form: PropTypes.objectOf(
		PropTypes.oneOfType([
			PropTypes.shape({
				value: PropTypes.any,
				error: PropTypes.string.isRequired
			}),
			PropTypes.array,
			PropTypes.number
		])
	).isRequired,
	template: PropTypes.shape({
		name: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		configParam: PropTypes.shape({
			minDate: PropTypes.object,
			minDateField: PropTypes.string,
			minDateMessage: PropTypes.string,
			maxDate: PropTypes.object,
			maxDateField: PropTypes.string,
			maxDateMessage: PropTypes.string,
			dateFormat: PropTypes.string,
			invalidDateMessage: PropTypes.string,
			currentLabel: PropTypes.string
		})
	}).isRequired,
	handleForm: PropTypes.shape({
		onChange: PropTypes.func.isRequired,
		onBlur: PropTypes.func.isRequired,
		onError: PropTypes.func.isRequired
	}).isRequired,
	autoSubmit: PropTypes.func.isRequired,
	preName: PropTypes.string
};

function DateField({
	form,
	template: {
		name,
		type,
		label,
		configParam: {
			minDate,
			minDateField,
			minDateMessage,
			maxDate,
			maxDateField,
			maxDateMessage,
			dateFormat,
			invalidDateMessage,
			currentLabel
		} = {}
	},
	handleForm: { onChange, onBlur, onError },
	autoSubmit,
	preName
}) {
	// setup local onChange
	const dateOnChange = useCallback(
		date => {
			// check if the field is not triggered
			if (!form[name].triggered) {
				// trigger the blur event
				onBlur(name)({ target: { value: date } });
			}

			// trigger the change event
			onChange(name)({ target: { value: date } });
		},
		[form, name, onBlur, onChange]
	);

	// initialize the date value
	let currentValue = new Date();

	// check if the date value is not maximum === show date
	if (form[name].value !== MAX_DATE) {
		// update the date value
		currentValue = form[name].value;
	}

	// setup the date toggler
	const toggleCurrent = useCallback(() => {
		// check if the date is not maximum === show date
		if (form[name].value !== MAX_DATE) {
			dateOnChange(MAX_DATE);
		} else {
			dateOnChange(new Date());
		}
	}, [dateOnChange, form, name]);

	return (
		<Fragment>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<KeyboardDatePicker
					id={`${preName !== undefined ? `${preName}_` : ''}${name}`}
					label={label}
					value={currentValue}
					onChange={dateOnChange}
					onError={onError(name)}
					onKeyPress={autoSubmit}
					format={
						dateFormat !== undefined ? dateFormat : 'yyyy/MM/dd'
					}
					invalidDateMessage={
						invalidDateMessage !== undefined
							? invalidDateMessage
							: 'Invalid Date Format'
					}
					minDateMessage={
						minDateMessage !== undefined
							? minDateMessage
							: 'Date should not be before minimal date'
					}
					minDate={
						minDate !== undefined || minDateField !== undefined
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
							: 'Date should not be after maximal date'
					}
					maxDate={
						maxDate !== undefined || maxDateField !== undefined
							? maxDateField !== undefined
								? maxDate === undefined ||
								  form[maxDateField].value < maxDate
									? form[maxDateField].value
									: maxDate
								: maxDate
							: MAX_DATE
					}
					disabled={
						type === DATE_MASKABLE && form[name].value === MAX_DATE
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
					label={
						currentLabel !== undefined ? currentLabel : 'Current'
					}
				/>
			)}
		</Fragment>
	);
}

export default DateField;
