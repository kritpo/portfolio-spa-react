import { PropTypes } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { CV_LIST } from '../../routes';
import CustomLink from '../../utils/CustomLink';
import { COUNTRY_CODE as COUNTRY_CODE_TYPE } from '../../utils/forms/Field/CountryCodeField';
import { TEXT } from '../../utils/forms/Field/TextField';
import Form from '../../utils/forms/Form';
import checkField, {
	checkExactLength,
	checkMinLength,
	checkUpdated
} from '../../utils/forms/checkField';
import languages from '../../utils/languages';

// setup field name constants
export const LANGUAGES = 'languages';
export const COUNTRY_CODE = 'country_code';
export const LANGUAGE = 'language';
export const FLUENCY = 'fluency';

// configure the states to pass as props to the component
const mapStateToProps = ({ language }, ...props) => ({
	language,
	...props
});

// configure the prop types validation
LanguagesContainer.propTypes = {
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function LanguagesContainer({ language: { systemLanguageCode }, ...props }) {
	// setup the form template
	const template = {
		[LANGUAGES]: {
			subform: {
				[COUNTRY_CODE]: {
					type: COUNTRY_CODE_TYPE,
					label:
						languages[systemLanguageCode].cv.languages.countryCode
							.label,
					defaultValue: '',
					checkField: checkField([
						checkUpdated(
							'',
							languages[systemLanguageCode].checkFieldErrorMessage
								.updated
						)
					]),
					inputParam: {
						placeholder:
							languages[systemLanguageCode].cv.languages
								.countryCode.placeholder
					}
				},
				[LANGUAGE]: {
					type: TEXT,
					label:
						languages[systemLanguageCode].cv.languages.language
							.label,
					defaultValue: '',
					checkField: checkField([
						checkUpdated(
							'',
							languages[systemLanguageCode].checkFieldErrorMessage
								.updated
						),
						checkMinLength(
							3,
							languages[systemLanguageCode].checkFieldErrorMessage
								.minLength
						)
					]),
					inputParam: {
						placeholder:
							languages[systemLanguageCode].cv.languages.language
								.placeholder
					}
				},
				[FLUENCY]: {
					type: TEXT,
					label:
						languages[systemLanguageCode].cv.languages.fluency
							.label,
					defaultValue: '',
					checkField: checkField([
						checkUpdated(
							'',
							languages[systemLanguageCode].checkFieldErrorMessage
								.updated
						),
						checkMinLength(
							3,
							languages[systemLanguageCode].checkFieldErrorMessage
								.minLength
						)
					]),
					inputParam: {
						placeholder:
							languages[systemLanguageCode].cv.languages.fluency
								.placeholder
					}
				}
			},
			addLabel: languages[systemLanguageCode].cv.languages.addLanguages,
			removeLabel:
				languages[systemLanguageCode].cv.languages.removeLanguages
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

export default connect(mapStateToProps)(LanguagesContainer);
