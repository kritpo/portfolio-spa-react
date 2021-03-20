import React from 'react';
import { PropTypes } from 'prop-types';

import TextField, {
	TEXT,
	TEXTAREA,
	EMAIL,
	PASSWORD,
	NUMBER_2,
	URL,
	PHONE_NUMBER,
	COUNTRY_CODE
} from './Field/TextField';
import CheckboxField, { CHECKBOX } from './Field/CheckboxField';
import SelectField, { SELECT } from './Field/SelectField';
import DateField, { DATE, DATE_MASKABLE } from './Field/DateField';

// configure the prop types validation
Field.propTypes = {
	form: PropTypes.object.isRequired,
	template: PropTypes.object.isRequired,
	handleForm: PropTypes.object.isRequired,
	autoSubmit: PropTypes.func.isRequired,
	preName: PropTypes.string
};

function Field({ form, template, handleForm, autoSubmit, preName }) {
	// check the type of the field
	switch (template.type) {
		// if the field must be a text, a textarea, a email, a password, a number, a link, a phone number or a country code field
		case TEXT:
		case TEXTAREA:
		case EMAIL:
		case PASSWORD:
		case NUMBER_2:
		case URL:
		case PHONE_NUMBER:
		case COUNTRY_CODE:
			return (
				<TextField
					form={form}
					template={template}
					handleForm={handleForm}
					autoSubmit={autoSubmit}
					preName={preName}
				/>
			);

		// check if the field must be a checkbox field
		case CHECKBOX:
			return (
				<CheckboxField
					form={form}
					template={template}
					handleForm={handleForm}
					autoSubmit={autoSubmit}
				/>
			);

		// check if the field must be a select field
		case SELECT:
			return (
				<SelectField
					form={form}
					template={template}
					handleForm={handleForm}
					autoSubmit={autoSubmit}
					preName={preName}
				/>
			);

		// check if the field must be a date or a maskable date field
		case DATE:
		case DATE_MASKABLE:
			return (
				<DateField
					form={form}
					template={template}
					handleForm={handleForm}
					autoSubmit={autoSubmit}
					preName={preName}
				/>
			);

		default:
			return null;
	}
}

export default Field;
