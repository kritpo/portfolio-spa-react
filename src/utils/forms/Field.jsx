import { PropTypes } from 'prop-types';
import React from 'react';

import CheckboxField, { CHECKBOX } from './Field/CheckboxField';
import CountryCodeField, { COUNTRY_CODE } from './Field/CountryCodeField';
import DateField, { DATE, DATE_MASKABLE } from './Field/DateField';
import IconSetField, { HOBBY, SOCIAL, TECHNOLOGY } from './Field/IconSetField';
import ImageField, { IMAGE } from './Field/ImageField';
import LanguageCodeField, { LANGUAGE_CODE } from './Field/LanguageCodeField';
import SelectField, { SELECT } from './Field/SelectField';
import TextField, {
	EMAIL,
	NUMBER_2,
	PASSWORD,
	PHONE_NUMBER,
	TEXT,
	TEXTAREA,
	URL
} from './Field/TextField';

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

		// check if the field must be a country code field
		case COUNTRY_CODE:
			return (
				<CountryCodeField
					form={form}
					template={template}
					handleForm={handleForm}
					autoSubmit={autoSubmit}
					preName={preName}
				/>
			);

		// check if the field must be a language code field
		case LANGUAGE_CODE:
			return (
				<LanguageCodeField
					form={form}
					template={template}
					handleForm={handleForm}
					autoSubmit={autoSubmit}
					preName={preName}
				/>
			);

		// check if the field must be an icon set field
		case HOBBY:
		case SOCIAL:
		case TECHNOLOGY:
			return (
				<IconSetField
					form={form}
					template={template}
					handleForm={handleForm}
					autoSubmit={autoSubmit}
					preName={preName}
				/>
			);

		// check if the field must be a image field
		case IMAGE:
			return (
				<ImageField
					form={form}
					template={template}
					handleForm={handleForm}
					preName={preName}
				/>
			);

		default:
			return null;
	}
}

export default Field;
