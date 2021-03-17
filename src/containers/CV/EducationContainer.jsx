import React from 'react';

import checkField, {
	checkMinLength,
	checkDate
} from '../../utils/forms/checkField';
import { TEXT, NUMBER_2, DATE, DATE_MASKABLE } from '../../utils/forms/Field';

import Form from '../../utils/forms/Form';

// setup field name constants
export const EDUCATION = 'education';
export const GPA = 'gpa';
export const INSTITUTION = 'institution';
export const AREA = 'area';
export const STUDY_TYPE = 'study_type';
export const START_DATE = 'start_date';
export const END_DATE = 'end_date';
export const COURSES = 'courses';
export const CATEGORY = 'category';
export const COURSES_COURSES = 'courses_courses';
export const COURSE = 'course';

function VolunteerContainer({ ...props }) {
	// setup the form template
	const template = {
		[EDUCATION]: {
			subform: {
				[INSTITUTION]: {
					type: TEXT,
					label: 'Établissement',
					defaultValue: '',
					checkField: checkField([checkMinLength(3)]),
					inputParam: {
						placeholder: 'Ecole'
					}
				},
				[GPA]: {
					type: NUMBER_2,
					label: 'GPA',
					defaultValue: '',
					checkField: checkField([checkMinLength(1)]),
					inputParam: {
						placeholder: '3.5'
					}
				},
				[AREA]: {
					type: TEXT,
					label: 'Domaine',
					defaultValue: '',
					checkField: checkField([checkMinLength(3)]),
					inputParam: {
						placeholder: 'Ingénierie informatique'
					}
				},
				[STUDY_TYPE]: {
					type: TEXT,
					label: 'Type',
					defaultValue: '',
					checkField: checkField([checkMinLength(3)]),
					inputParam: {
						placeholder: "Diplôme d'ingénieur"
					}
				},
				[START_DATE]: {
					type: DATE,
					label: 'Date de début',
					defaultValue: new Date(),
					checkField: checkField([checkDate()]),
					configParam: {
						maxDate: new Date(),
						maxDateField: END_DATE,
						maxDateMessage:
							'La date de début devrait être avant la date de fin'
					}
				},
				[END_DATE]: {
					type: DATE_MASKABLE,
					label: 'Date de fin',
					defaultValue: new Date(),
					checkField: checkField([checkDate()]),
					configParam: {
						minDateField: START_DATE,
						minDateMessage:
							'La date de fin devrait être après la date de début'
					}
				},
				[COURSES]: {
					subform: {
						[CATEGORY]: {
							type: TEXT,
							label: 'Catégorie',
							defaultValue: '',
							checkField: checkField([checkMinLength(1)]),
							inputParam: {
								placeholder: 'S1'
							}
						},
						[COURSES_COURSES]: {
							subform: {
								[COURSE]: {
									type: TEXT,
									label: 'Cours',
									defaultValue: '',
									checkField: checkField([checkMinLength(3)]),
									inputParam: {
										placeholder: 'TS1001 - Algorithmique'
									}
								}
							},
							addLabel: 'Ajouter un cours',
							removeLabel: 'Supprimer le cours'
						}
					},
					addLabel: 'Ajouter une catégorie de cours',
					removeLabel: 'Supprimer la catégorie'
				}
			},
			addLabel: 'Ajouter une formation',
			removeLabel: 'Supprimer la formation'
		}
	};

	return <Form template={template} errorMessage="Erreur" {...props} />;
}

export default VolunteerContainer;
