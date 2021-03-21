import { API } from 'aws-amplify';
import { PropTypes } from 'prop-types';
import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { fetchResumeLanguages } from '../actions';
import CVCreate from '../components/CVCreate';
import {
	ADDRESS,
	BASICS,
	CITY,
	COUNTRY_CODE,
	EMAIL,
	LABEL,
	NAME,
	PHONE,
	PICTURE,
	POSTAL_CODE,
	PROFILES,
	REGION,
	SUMMARY,
	WEBSITE
} from '../containers/CV/BasicsContainer';
import { EDUCATION } from '../containers/CV/EducationContainer';
import { INTERESTS } from '../containers/CV/InterestsContainer';
import { LANGUAGES } from '../containers/CV/LanguagesContainer';
import { PROJECTS } from '../containers/CV/ProjectsContainer';
import { REFERENCES } from '../containers/CV/ReferencesContainer';
import { SKILLS } from '../containers/CV/SkillsContainer';
import { VOLUNTEER } from '../containers/CV/VolunteerContainer';
import { WORK } from '../containers/CV/WorkContainer';
import { CV_LIST } from '../routes';
import * as cvUtils from '../utils/cvUtils';
import { LANGUAGE_CODE as LANGUAGE_CODE_TYPE } from '../utils/forms/Field/LanguageCodeField';
import { decryptForm, encryptForm } from '../utils/forms/Form';
import checkField, { checkUpdated } from '../utils/forms/checkField';
import languages from '../utils/languages';

// setup field name constants
const LANGUAGE_CODE = 'language_code';

// configure the states to pass as props to the component
const mapStateToProps = ({ username, language }, ...props) => ({
	username,
	language,
	...props
});

// configure the actions to pass as props to the component
const mapDispatchToProps = {
	fetchResumeLanguages
};

// configure the prop types validation
CVCreateContainer.propTypes = {
	username: PropTypes.string.isRequired,
	fetchResumeLanguages: PropTypes.func.isRequired,
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function CVCreateContainer({
	username,
	fetchResumeLanguages,
	language: { systemLanguageCode },
	...props
}) {
	// setup the history hook
	const history = useHistory();

	// setup the current active step hook
	const [currentStep, setCurrentStep] = useState(0);

	// setup the fields data hook
	const [data, setData] = useState({
		[BASICS]: [
			{ name: NAME, payload: '' },
			{ name: LABEL, payload: '' },
			{ name: SUMMARY, payload: '' },
			{ name: PICTURE, payload: '' },
			{ name: EMAIL, payload: '' },
			{ name: PHONE, payload: '' },
			{ name: WEBSITE, payload: '' },
			{ name: ADDRESS, payload: '' },
			{ name: POSTAL_CODE, payload: '' },
			{ name: CITY, payload: '' },
			{ name: REGION, payload: '' },
			{ name: COUNTRY_CODE, payload: '' },
			{ name: PROFILES, payload: [] }
		],
		[WORK]: [{ name: WORK, payload: [] }],
		[VOLUNTEER]: [{ name: VOLUNTEER, payload: [] }],
		[EDUCATION]: [{ name: EDUCATION, payload: [] }],
		[PROJECTS]: [{ name: PROJECTS, payload: [] }],
		[SKILLS]: [{ name: SKILLS, payload: [] }],
		[LANGUAGES]: [{ name: LANGUAGES, payload: [] }],
		[INTERESTS]: [{ name: INTERESTS, payload: [] }],
		[REFERENCES]: [{ name: REFERENCES, payload: [] }]
	});

	// setup the next step callback
	const handleNext = useCallback(
		subform => async form => {
			// update the current step to go to the next one
			setCurrentStep(prev => prev + 1);

			// update the fields data
			setData(prev => {
				// compute the new subform data
				const subformData = decryptForm(form);

				return { ...prev, [subform]: subformData };
			});
		},
		[]
	);

	// setup the set step callback
	const handleSetStep = useCallback(
		step => () => {
			// update the current step to go to the wanted one
			setCurrentStep(step);
		},
		[]
	);

	// setup the language code field data
	const languageCodeData = [{ name: LANGUAGE_CODE, payload: '' }];

	// setup the form template
	const languageCodeTemplate = {
		[LANGUAGE_CODE]: {
			type: LANGUAGE_CODE_TYPE,
			label: languages[systemLanguageCode].cvCreate.languageCode.label,
			checkField: checkField([
				checkUpdated(
					'',
					languages[systemLanguageCode].checkFieldErrorMessage.updated
				)
			]),
			inputParam: {
				placeholder:
					languages[systemLanguageCode].cvCreate.languageCode
						.placeholder
			}
		}
	};

	// setup the onSubmit callback
	const onSubmit = useCallback(
		form => {
			// retrieve the final body
			const body = {
				languageCode: form[LANGUAGE_CODE].value,
				basics: cvUtils.mapBasicsFormToObject(
					encryptForm(data[BASICS])
				),
				work: cvUtils.mapWorkFormToObject(encryptForm(data[WORK])),
				volunteer: cvUtils.mapVolunteerFormToObject(
					encryptForm(data[VOLUNTEER])
				),
				education: cvUtils.mapEducationFormToObject(
					encryptForm(data[EDUCATION])
				),
				projects: cvUtils.mapProjectsFormToObject(
					encryptForm(data[PROJECTS])
				),
				skills: cvUtils.mapSkillsFormToObject(
					encryptForm(data[SKILLS])
				),
				languages: cvUtils.mapLanguagesFormToObject(
					encryptForm(data[LANGUAGES])
				),
				interests: cvUtils.mapInterestsFormToObject(
					encryptForm(data[INTERESTS])
				),
				references: cvUtils.mapReferencesFormToObject(
					encryptForm(data[REFERENCES])
				)
			};

			return API.post('PortfolioAPIServerless', '/resumes/', {
				body
			}).then(() => {
				// reload the resume languages
				fetchResumeLanguages(false, username);

				// redirect the user to the CVs page
				history.push(CV_LIST);
			});
		},
		[data, fetchResumeLanguages, history, username]
	);

	return (
		<CVCreate
			currentStep={currentStep}
			handleNext={handleNext}
			handleSetStep={handleSetStep}
			data={data}
			languageCodeData={languageCodeData}
			languageCodeTemplate={languageCodeTemplate}
			onSubmit={onSubmit}
			language={{ systemLanguageCode }}
			{...props}
		/>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(CVCreateContainer);
