import { PropTypes } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { CV_LIST } from '../../routes';
import CustomLink from '../../utils/CustomLink';
import { HOBBY } from '../../utils/forms/Field/IconSetField';
import { TEXT } from '../../utils/forms/Field/TextField';
import Form from '../../utils/forms/Form';
import checkField, {
	checkMinLength,
	checkUpdated
} from '../../utils/forms/checkField';
import languages from '../../utils/languages';

// setup field name constants
export const INTERESTS = 'interests';
export const NAME = 'name';
export const KEYWORDS = 'keywords';
export const KEYWORD = 'keyword';

// configure the states to pass as props to the component
const mapStateToProps = ({ language }, ...props) => ({
	language,
	...props
});

// configure the prop types validation
InterestsContainer.propTypes = {
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function InterestsContainer({ language: { systemLanguageCode }, ...props }) {
	// setup the form template
	const template = {
		[INTERESTS]: {
			subform: {
				[NAME]: {
					type: HOBBY,
					label:
						languages[systemLanguageCode].cv.interests.name.label,
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
							languages[systemLanguageCode].cv.interests.name
								.placeholder
					}
				},
				[KEYWORDS]: {
					subform: {
						[KEYWORD]: {
							type: TEXT,
							label:
								languages[systemLanguageCode].cv.interests
									.keyword.label,
							defaultValue: '',
							checkField: checkField([
								checkUpdated(
									'',
									languages[systemLanguageCode]
										.checkFieldErrorMessage.updated
								),
								checkMinLength(
									3,
									languages[systemLanguageCode]
										.checkFieldErrorMessage.minLength
								)
							]),
							inputParam: {
								placeholder:
									languages[systemLanguageCode].cv.interests
										.keyword.placeholder
							}
						}
					},
					addLabel:
						languages[systemLanguageCode].cv.interests.addKeywords,
					removeLabel:
						languages[systemLanguageCode].cv.interests
							.removeKeywords
				}
			},
			addLabel: languages[systemLanguageCode].cv.interests.addInterests,
			removeLabel:
				languages[systemLanguageCode].cv.interests.removeInterests
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

export default connect(mapStateToProps)(InterestsContainer);
