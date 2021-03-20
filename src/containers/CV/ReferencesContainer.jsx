import React from 'react';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';

import checkField, { checkMinLength } from '../../utils/forms/checkField';
import { TEXT, TEXTAREA } from '../../utils/forms/Field/TextField';
import languages from '../../utils/languages';

import Form from '../../utils/forms/Form';

// setup field name constants
export const REFERENCES = 'references';
export const NAME = 'name';
export const REFERENCE = 'reference';

// configure the states to pass as props to the component
const mapStateToProps = ({ language }, ...props) => ({
	language,
	...props
});

// configure the prop types validation
ReferencesContainer.propTypes = {
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function ReferencesContainer({ language: { systemLanguageCode }, ...props }) {
	// setup the form template
	const template = {
		[REFERENCES]: {
			subform: {
				[NAME]: {
					type: TEXT,
					label:
						languages[systemLanguageCode].cv.references.name.label,
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
							languages[systemLanguageCode].cv.references.name
								.placeholder
					}
				},
				[REFERENCE]: {
					type: TEXTAREA,
					label:
						languages[systemLanguageCode].cv.references.reference
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
							languages[systemLanguageCode].cv.references
								.reference.placeholder
					}
				}
			},
			addLabel: languages[systemLanguageCode].cv.references.addReferences,
			removeLabel:
				languages[systemLanguageCode].cv.references.removeReferences
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

export default connect(mapStateToProps)(ReferencesContainer);
