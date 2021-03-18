import React, { useCallback, useState } from 'react';

import { useHistory } from 'react-router-dom';

import { API } from 'aws-amplify';

import {
	NAME,
	LABEL,
	SUMMARY,
	PICTURE,
	EMAIL,
	PHONE,
	WEBSITE,
	ADDRESS,
	POSTAL_CODE,
	CITY,
	REGION,
	COUNTRY_CODE,
	PROFILES,
	BASICS
} from '../containers/CV/BasicsContainer';
import { WORK } from '../containers/CV/WorkContainer';
import { VOLUNTEER } from '../containers/CV/VolunteerContainer';
import { EDUCATION } from '../containers/CV/EducationContainer';
import { PROJECTS } from '../containers/CV/ProjectsContainer';
import { SKILLS } from '../containers/CV/SkillsContainer';
import { LANGUAGES } from '../containers/CV/LanguagesContainer';
import { INTERESTS } from '../containers/CV/InterestsContainer';
import { REFERENCES } from '../containers/CV/ReferencesContainer';
import { encryptForm, decryptForm } from '../utils/forms/Form';
import checkField, { checkMinLength } from '../utils/forms/checkField';
import { TEXT } from '../utils/forms/Field';
import { CVS } from '../routes';
import * as cvUtils from '../utils/cvUtils';

import CVCreate from '../components/CVCreate';

// setup field name constants
const LANGUAGE_CODE = 'language_code';

function CVCreateContainer({ ...props }) {
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
			type: TEXT,
			label: 'Code langue',
			checkField: checkField([checkMinLength(2)]),
			inputParam: { placeholder: 'fr' }
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
				// redirect the user to the CVs page
				history.push(CVS);
			});
		},
		[data, history]
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
			{...props}
		/>
	);
}

export default CVCreateContainer;
