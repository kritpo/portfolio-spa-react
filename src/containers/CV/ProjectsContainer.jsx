import React from 'react';

import checkField, {
	checkMinLength,
	checkDate
} from '../../utils/forms/checkField';
import {
	TEXT,
	TEXTAREA,
	DATE,
	DATE_MASKABLE,
	URL as URL_TYPE
} from '../../utils/forms/Field';

import Form from '../../utils/forms/Form';

// setup field name constants
export const PROJECTS = 'projects';
export const NAME = 'name';
export const SUMMARY = 'summary';
export const PICTURE = 'picture';
export const URL = 'url';
export const START_DATE = 'start_date';
export const END_DATE = 'end_date';
export const TECHNOLOGIES = 'technologies';
export const TECHNOLOGY = 'technology';

function ProjectsContainer({ ...props }) {
	// setup the form template
	const template = {
		[PROJECTS]: {
			subform: {
				[NAME]: {
					type: TEXT,
					label: 'Nom du projet',
					defaultValue: '',
					checkField: checkField([checkMinLength(3)]),
					inputParam: {
						placeholder: 'Projet'
					}
				},
				[SUMMARY]: {
					type: TEXTAREA,
					label: 'Description',
					defaultValue: '',
					checkField: checkField([checkMinLength(3)]),
					inputParam: {
						placeholder: 'Description du projet'
					}
				},
				[PICTURE]: {
					type: URL_TYPE,
					label: 'Illustration',
					defaultValue: '',
					checkField: checkField([checkMinLength(8)]),
					inputParam: {
						placeholder: 'https://jean-dupont.fr/mon-projet.jpg'
					}
				},
				[URL]: {
					type: URL_TYPE,
					label: 'Adresse URL du projet',
					defaultValue: '',
					checkField: checkField([checkMinLength(8)]),
					inputParam: {
						placeholder: 'https://github.com/dupont/projet/'
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
				[TECHNOLOGIES]: {
					subform: {
						[TECHNOLOGY]: {
							type: TEXT,
							label: 'Technologie',
							defaultValue: '',
							checkField: checkField([checkMinLength(3)]),
							inputParam: {
								placeholder: 'Javascript'
							}
						}
					},
					addLabel: 'Ajouter une technologie',
					removeLabel: 'Supprimer la technologie'
				}
			},
			addLabel: 'Ajouter un projet',
			removeLabel: 'Supprimer le projet'
		}
	};

	return <Form template={template} errorMessage="Erreur" {...props} />;
}

export default ProjectsContainer;
