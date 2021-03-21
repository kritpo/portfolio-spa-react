import { PropTypes } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { DATE, DATE_MASKABLE } from '../../utils/forms/Field/DateField';
import { TEXT, TEXTAREA, URL } from '../../utils/forms/Field/TextField';
import Form from '../../utils/forms/Form';
import checkField, {
	checkDate,
	checkMinLength
} from '../../utils/forms/checkField';
import languages from '../../utils/languages';

// setup field name constants
export const VOLUNTEER = 'volunteer';
export const ORGANIZATION = 'organization';
export const POSITION = 'position';
export const WEBSITE = 'website';
export const START_DATE = 'start_date';
export const END_DATE = 'end_date';
export const SUMMARY = 'summary';
export const HIGHLIGHTS = 'highlights';
export const HIGHLIGHT = 'highlight';

// configure the states to pass as props to the component
const mapStateToProps = ({ language }, ...props) => ({
	language,
	...props
});

// configure the prop types validation
VolunteerContainer.propTypes = {
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function VolunteerContainer({ language: { systemLanguageCode }, ...props }) {
	// setup the form template
	const template = {
		[VOLUNTEER]: {
			subform: {
				[ORGANIZATION]: {
					type: TEXT,
					label:
						languages[systemLanguageCode].cv.volunteer.organization
							.label,
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
							languages[systemLanguageCode].cv.volunteer
								.organization.placeholder
					}
				},
				[POSITION]: {
					type: TEXT,
					label:
						languages[systemLanguageCode].cv.volunteer.position
							.label,
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
							languages[systemLanguageCode].cv.volunteer.position
								.placeholder
					}
				},
				[WEBSITE]: {
					type: URL,
					label:
						languages[systemLanguageCode].cv.volunteer.website
							.label,
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
							languages[systemLanguageCode].cv.volunteer.website
								.placeholder
					}
				},
				[START_DATE]: {
					type: DATE,
					label:
						languages[systemLanguageCode].cv.volunteer.startDate
							.label,
					defaultValue: new Date(),
					checkField: checkField([
						checkDate(
							languages[systemLanguageCode].checkFieldErrorMessage
								.date
						)
					]),
					configParam: {
						maxDate: new Date(),
						maxDateField: END_DATE,
						maxDateMessage:
							languages[systemLanguageCode].cv.maxDateMessage,
						dateFormat: languages[systemLanguageCode].cv.dateFormat,
						invalidDateMessage:
							languages[systemLanguageCode].cv.invalidDateMessage
					}
				},
				[END_DATE]: {
					type: DATE_MASKABLE,
					label:
						languages[systemLanguageCode].cv.volunteer.endDate
							.label,
					defaultValue: new Date(),
					checkField: checkField([
						checkDate(
							languages[systemLanguageCode].checkFieldErrorMessage
								.date
						)
					]),
					configParam: {
						minDateField: START_DATE,
						minDateMessage:
							languages[systemLanguageCode].cv.minDateMessage,
						dateFormat: languages[systemLanguageCode].cv.dateFormat,
						invalidDateMessage:
							languages[systemLanguageCode].cv.invalidDateMessage,
						currentLabel:
							languages[systemLanguageCode].cv.currentLabel
					}
				},
				[SUMMARY]: {
					type: TEXTAREA,
					label:
						languages[systemLanguageCode].cv.volunteer.summary
							.label,
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
							languages[systemLanguageCode].cv.volunteer.summary
								.placeholder
					}
				},
				[HIGHLIGHTS]: {
					subform: {
						[HIGHLIGHT]: {
							type: TEXT,
							label:
								languages[systemLanguageCode].cv.volunteer
									.highlight.label,
							defaultValue: '',
							checkField: checkField([
								checkMinLength(
									3,
									languages[systemLanguageCode]
										.checkFieldErrorMessage.minLength
								)
							]),
							inputParam: {
								placeholder:
									languages[systemLanguageCode].cv.volunteer
										.highlight.placeholder
							}
						}
					},
					addLabel:
						languages[systemLanguageCode].cv.volunteer
							.addHighlights,
					removeLabel:
						languages[systemLanguageCode].cv.volunteer
							.removeHighlights
				}
			},
			addLabel: languages[systemLanguageCode].cv.volunteer.addVolunteer,
			removeLabel:
				languages[systemLanguageCode].cv.volunteer.removeVolunteer
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
		/>
	);
}

export default connect(mapStateToProps)(VolunteerContainer);
