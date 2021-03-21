import { PropTypes } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { CV_LIST } from '../../routes';
import CustomLink from '../../utils/CustomLink';
import { TEXT, TEXTAREA } from '../../utils/forms/Field/TextField';
import Form from '../../utils/forms/Form';
import checkField, {
	checkMinLength,
	checkUpdated
} from '../../utils/forms/checkField';
import languages from '../../utils/languages';

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
		>
			<CustomLink to={CV_LIST}>
				{languages[systemLanguageCode].cv.goToCVList}
			</CustomLink>
		</Form>
	);
}

export default connect(mapStateToProps)(ReferencesContainer);
