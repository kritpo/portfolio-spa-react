import React, { useCallback } from 'react';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';

import { CV_LIST } from '../../routes';
import { updateResume } from '../../actions';
import * as cvUtils from '../../utils/cvUtils';

import WorkContainer, {
	WORK,
	IS_INTERNSHIP,
	COMPANY,
	POSITION,
	WEBSITE,
	START_DATE,
	END_DATE,
	SUMMARY,
	HIGHLIGHTS,
	HIGHLIGHT
} from '../CV/WorkContainer';
import CustomLink from '../../utils/CustomLink';

// configure the actions to pass as props to the component
const mapDispatchToProps = {
	updateResume
};

// configure the prop types validation
UpdateWorkContainer.propTypes = {
	work: PropTypes.arrayOf(
		PropTypes.shape({
			isInternship: PropTypes.bool,
			company: PropTypes.string.isRequired,
			position: PropTypes.string.isRequired,
			website: PropTypes.string.isRequired,
			startDate: PropTypes.string.isRequired,
			endDate: PropTypes.string,
			summary: PropTypes.string.isRequired,
			highlights: PropTypes.arrayOf(PropTypes.string).isRequired
		})
	).isRequired,
	updateResume: PropTypes.func.isRequired,
	setForm: PropTypes.func.isRequired
};

function UpdateWorkContainer({ work, updateResume, setForm }) {
	// setup the fields data
	const data = [
		{
			name: WORK,
			payload: work.map(
				({
					isInternship,
					company,
					position,
					website,
					startDate,
					endDate,
					summary,
					highlights
				}) => [
					{ name: IS_INTERNSHIP, payload: isInternship },
					{ name: COMPANY, payload: company },
					{ name: POSITION, payload: position },
					{ name: WEBSITE, payload: website },
					{ name: START_DATE, payload: new Date(startDate) },
					{ name: END_DATE, payload: new Date(endDate) },
					{ name: SUMMARY, payload: summary },
					{
						name: HIGHLIGHTS,
						payload: highlights.map(highlight => [
							{ name: HIGHLIGHT, payload: highlight }
						])
					}
				]
			)
		}
	];

	// setup the onSubmit callback
	const onSubmit = useCallback(
		(form, reCaptchaToken, unlock) =>
			updateResume({ work: cvUtils.mapWorkFormToObject(form) }).then(
				() => {
					// call setForm to change the update status to false
					setForm();

					// unlock the form
					unlock();
				}
			),
		[setForm, updateResume]
	);

	return (
		<WorkContainer
			data={data}
			onSubmit={onSubmit}
			action="Modifier"
			setForm={setForm}
		>
			<CustomLink to={CV_LIST}>Revenir à la liste des CVs</CustomLink>
		</WorkContainer>
	);
}

export default connect(null, mapDispatchToProps)(UpdateWorkContainer);
