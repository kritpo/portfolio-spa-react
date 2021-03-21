import { PropTypes } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { CHECKBOX } from '../../utils/forms/Field/CheckboxField';
import { DATE, DATE_MASKABLE } from '../../utils/forms/Field/DateField';
import { TEXT, TEXTAREA, URL } from '../../utils/forms/Field/TextField';
import Form from '../../utils/forms/Form';
import checkField, {
	checkDate,
	checkMinLength
} from '../../utils/forms/checkField';
import languages from '../../utils/languages';

// setup field name constants
export const WORK = 'work';
export const IS_INTERNSHIP = 'is_internship';
export const COMPANY = 'company';
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
WorkContainer.propTypes = {
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function WorkContainer({ language: { systemLanguageCode }, ...props }) {
	// setup the form template
	const template = {
		[WORK]: {
			subform: {
				[IS_INTERNSHIP]: {
					type: CHECKBOX,
					label:
						languages[systemLanguageCode].cv.work.isInternship
							.label,
					defaultValue: false,
					checkField: checkField([])
				},
				[COMPANY]: {
					type: TEXT,
					label: languages[systemLanguageCode].cv.work.company.label,
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
							languages[systemLanguageCode].cv.work.company
								.placeholder
					}
				},
				[POSITION]: {
					type: TEXT,
					label: languages[systemLanguageCode].cv.work.position.label,
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
							languages[systemLanguageCode].cv.work.position
								.placeholder
					}
				},
				[WEBSITE]: {
					type: URL,
					label: languages[systemLanguageCode].cv.work.website.label,
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
							languages[systemLanguageCode].cv.work.website
								.placeholder
					}
				},
				[START_DATE]: {
					type: DATE,
					label:
						languages[systemLanguageCode].cv.work.startDate.label,
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
					label: languages[systemLanguageCode].cv.work.endDate.label,
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
					label: languages[systemLanguageCode].cv.work.summary.label,
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
							languages[systemLanguageCode].cv.work.summary
								.placeholder
					}
				},
				[HIGHLIGHTS]: {
					subform: {
						[HIGHLIGHT]: {
							type: TEXT,
							label:
								languages[systemLanguageCode].cv.work.highlight
									.label,
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
									languages[systemLanguageCode].cv.work
										.highlight.placeholder
							}
						}
					},
					addLabel:
						languages[systemLanguageCode].cv.work.addHighlights,
					removeLabel:
						languages[systemLanguageCode].cv.work.removeHighlights
				}
			},
			addLabel: languages[systemLanguageCode].cv.work.addWork,
			removeLabel: languages[systemLanguageCode].cv.work.removeWork
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

export default connect(mapStateToProps)(WorkContainer);
