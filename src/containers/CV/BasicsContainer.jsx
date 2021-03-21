import { PropTypes } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { CV_LIST } from '../../routes';
import CustomLink from '../../utils/CustomLink';
import { COUNTRY_CODE as COUNTRY_CODE_TYPE } from '../../utils/forms/Field/CountryCodeField';
import { SOCIAL } from '../../utils/forms/Field/IconSetField';
import {
	EMAIL as EMAIL_TYPE,
	PHONE_NUMBER,
	TEXT,
	TEXTAREA,
	URL as URL_TYPE
} from '../../utils/forms/Field/TextField';
import Form from '../../utils/forms/Form';
import checkField, {
	checkExactLength,
	checkMinLength,
	checkRegex
} from '../../utils/forms/checkField';
import languages from '../../utils/languages';

// setup field name constants
export const BASICS = 'basics';
export const NAME = 'name';
export const LABEL = 'label';
export const SUMMARY = 'summary';
export const PICTURE = 'picture';
export const EMAIL = 'email';
export const PHONE = 'phone';
export const WEBSITE = 'website';
export const ADDRESS = 'address';
export const POSTAL_CODE = 'postal_code';
export const CITY = 'city';
export const REGION = 'region';
export const COUNTRY_CODE = 'country_code';
export const PROFILES = 'profiles';
export const NETWORK = 'network';
export const USERNAME = 'username';
export const URL = 'url';

// configure the states to pass as props to the component
const mapStateToProps = ({ language }, ...props) => ({
	language,
	...props
});

// configure the prop types validation
BasicsContainer.propTypes = {
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function BasicsContainer({ language: { systemLanguageCode }, ...props }) {
	// setup the form template
	const template = {
		[NAME]: {
			type: TEXT,
			label: languages[systemLanguageCode].cv.basics.name.label,
			checkField: checkField([
				checkMinLength(
					3,
					languages[systemLanguageCode].checkFieldErrorMessage
						.minLength
				)
			]),
			inputParam: {
				placeholder:
					languages[systemLanguageCode].cv.basics.name.placeholder
			}
		},
		[LABEL]: {
			type: TEXT,
			label: languages[systemLanguageCode].cv.basics.label.label,
			checkField: checkField([
				checkMinLength(
					3,
					languages[systemLanguageCode].checkFieldErrorMessage
						.minLength
				)
			]),
			inputParam: {
				placeholder:
					languages[systemLanguageCode].cv.basics.label.placeholder
			}
		},
		[SUMMARY]: {
			type: TEXTAREA,
			label: languages[systemLanguageCode].cv.basics.summary.label,
			checkField: checkField([
				checkMinLength(
					3,
					languages[systemLanguageCode].checkFieldErrorMessage
						.minLength
				)
			]),
			inputParam: {
				placeholder:
					languages[systemLanguageCode].cv.basics.summary.placeholder
			}
		},
		[PICTURE]: {
			type: URL_TYPE,
			label: languages[systemLanguageCode].cv.basics.picture.label,
			checkField: checkField([
				checkMinLength(
					8,
					languages[systemLanguageCode].checkFieldErrorMessage
						.minLength
				)
			]),
			inputParam: {
				placeholder:
					languages[systemLanguageCode].cv.basics.picture.placeholder
			}
		},
		[EMAIL]: {
			type: EMAIL_TYPE,
			label: languages[systemLanguageCode].cv.basics.email.label,
			checkField: checkField([
				checkMinLength(
					3,
					languages[systemLanguageCode].checkFieldErrorMessage
						.minLength
				),
				checkRegex(
					/^[a-z0-9.\-_]+@[a-z0-9.\-_]+\.[a-z0-9]{2,}$/,
					languages[systemLanguageCode].checkFieldErrorMessage.regex
				)
			]),
			inputParam: {
				placeholder:
					languages[systemLanguageCode].cv.basics.email.placeholder
			}
		},
		[PHONE]: {
			type: PHONE_NUMBER,
			label: languages[systemLanguageCode].cv.basics.phone.label,
			checkField: checkField([
				checkMinLength(
					6,
					languages[systemLanguageCode].checkFieldErrorMessage
						.minLength
				)
			]),
			inputParam: {
				placeholder:
					languages[systemLanguageCode].cv.basics.phone.placeholder
			}
		},
		[WEBSITE]: {
			type: URL_TYPE,
			label: languages[systemLanguageCode].cv.basics.website.label,
			checkField: checkField([
				checkMinLength(
					8,
					languages[systemLanguageCode].checkFieldErrorMessage
						.minLength
				)
			]),
			inputParam: {
				placeholder:
					languages[systemLanguageCode].cv.basics.website.placeholder
			}
		},
		[ADDRESS]: {
			type: TEXT,
			label: languages[systemLanguageCode].cv.basics.address.label,
			checkField: checkField([]),
			inputParam: {
				placeholder:
					languages[systemLanguageCode].cv.basics.address.placeholder,
				required: false
			}
		},
		[POSTAL_CODE]: {
			type: TEXT,
			label: languages[systemLanguageCode].cv.basics.postalCode.label,
			checkField: checkField([]),
			inputParam: {
				placeholder:
					languages[systemLanguageCode].cv.basics.postalCode
						.placeholder,
				required: false
			}
		},
		[CITY]: {
			type: TEXT,
			label: languages[systemLanguageCode].cv.basics.city.label,
			checkField: checkField([
				checkMinLength(
					3,
					languages[systemLanguageCode].checkFieldErrorMessage
						.minLength
				)
			]),
			inputParam: {
				placeholder:
					languages[systemLanguageCode].cv.basics.city.placeholder
			}
		},
		[REGION]: {
			type: TEXT,
			label: languages[systemLanguageCode].cv.basics.region.label,
			checkField: checkField([]),
			inputParam: {
				placeholder:
					languages[systemLanguageCode].cv.basics.region.placeholder,
				required: false
			}
		},
		[COUNTRY_CODE]: {
			type: COUNTRY_CODE_TYPE,
			label: languages[systemLanguageCode].cv.basics.countryCode.label,
			checkField: checkField([
				checkExactLength(
					2,
					languages[systemLanguageCode].checkFieldErrorMessage
						.exactLength
				)
			]),
			inputParam: {
				placeholder:
					languages[systemLanguageCode].cv.basics.countryCode
						.placeholder
			}
		},
		[PROFILES]: {
			subform: {
				[NETWORK]: {
					type: SOCIAL,
					label:
						languages[systemLanguageCode].cv.basics.network.label,
					defaultValue: '',
					checkField: checkField([
						checkMinLength(
							2,
							languages[systemLanguageCode].checkFieldErrorMessage
								.minLength
						)
					]),
					inputParam: {
						placeholder:
							languages[systemLanguageCode].cv.basics.network
								.placeholder
					}
				},
				[USERNAME]: {
					type: TEXT,
					label:
						languages[systemLanguageCode].cv.basics.username.label,
					defaultValue: '',
					checkField: checkField([
						checkMinLength(
							3,
							languages[systemLanguageCode].checkFieldErrorMessage
								.minLength
						)
					]),
					inputParam: {
						placeholder:
							languages[systemLanguageCode].cv.basics.username
								.placeholder
					}
				},
				[URL]: {
					type: URL_TYPE,
					label: languages[systemLanguageCode].cv.basics.url.label,
					defaultValue: '',
					checkField: checkField([
						checkMinLength(
							8,
							languages[systemLanguageCode].checkFieldErrorMessage
								.minLength
						)
					]),
					inputParam: {
						placeholder:
							languages[systemLanguageCode].cv.basics.url
								.placeholder
					}
				}
			},
			addLabel: languages[systemLanguageCode].cv.basics.addProfile,
			removeLabel: languages[systemLanguageCode].cv.basics.removeProfile
		}
	};

	return (
		<Form
			template={template}
			errorMessage={languages[systemLanguageCode].cv.error}
			sendingMessage={
				languages[systemLanguageCode].generic.sendingMessage
			}
			{...props}
		>
			<CustomLink to={CV_LIST}>
				{languages[systemLanguageCode].cv.goToCVList}
			</CustomLink>
		</Form>
	);
}

export default connect(mapStateToProps)(BasicsContainer);
