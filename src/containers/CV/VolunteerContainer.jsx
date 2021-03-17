import React from 'react';

import checkField, {
	checkMinLength,
	checkDate
} from '../../utils/forms/checkField';
import {
	TEXT,
	TEXTAREA,
	URL,
	DATE,
	DATE_MASKABLE
} from '../../utils/forms/Field';

import Form from '../../utils/forms/Form';

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

function VolunteerContainer({ ...props }) {
	// setup the form template
	const template = {
		[VOLUNTEER]: {
			subform: {
				[ORGANIZATION]: {
					type: TEXT,
					label: 'Association',
					defaultValue: '',
					checkField: checkField([checkMinLength(3)]),
					inputParam: {
						placeholder: 'Association'
					}
				},
				[POSITION]: {
					type: TEXT,
					label: 'Poste',
					defaultValue: '',
					checkField: checkField([checkMinLength(3)]),
					inputParam: {
						placeholder: 'Responsable technique'
					}
				},
				[WEBSITE]: {
					type: URL,
					label: 'Site internet',
					defaultValue: '',
					checkField: checkField([checkMinLength(8)]),
					inputParam: {
						placeholder: 'https://association.fr/'
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
				[SUMMARY]: {
					type: TEXTAREA,
					label: 'Résumé',
					defaultValue: '',
					checkField: checkField([checkMinLength(3)]),
					inputParam: {
						placeholder: "Une petite description de l'expérience"
					}
				},
				[HIGHLIGHTS]: {
					subform: {
						[HIGHLIGHT]: {
							type: TEXT,
							label: 'Réalisation',
							defaultValue: '',
							checkField: checkField([checkMinLength(3)]),
							inputParam: {
								placeholder:
									"Réalisation du site de l'association"
							}
						}
					},
					addLabel: 'Ajouter une réalisation',
					removeLabel: 'Supprimer la réalisation'
				}
			},
			addLabel: 'Ajouter une expérience associative',
			removeLabel: "Supprimer l'expérience"
		}
	};

	return <Form template={template} errorMessage="Erreur" {...props} />;
}

export default VolunteerContainer;
