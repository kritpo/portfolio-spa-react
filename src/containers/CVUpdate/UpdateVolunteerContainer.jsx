import React, { useCallback } from 'react';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';

import { CVS } from '../../routes';
import { updateResume } from '../../actions';
import * as cvUtils from '../../utils/cvUtils';

import VolunteerContainer, {
	VOLUNTEER,
	ORGANIZATION,
	POSITION,
	WEBSITE,
	START_DATE,
	END_DATE,
	SUMMARY,
	HIGHLIGHTS,
	HIGHLIGHT
} from '../CV/VolunteerContainer';
import CustomLink from '../../utils/CustomLink';

// configure the actions to pass as props to the component
const mapDispatchToProps = {
	updateResume
};

// configure the prop types validation
UpdateVolunteerContainer.propTypes = {
	volunteer: PropTypes.arrayOf(
		PropTypes.shape({
			organization: PropTypes.string.isRequired,
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

function UpdateVolunteerContainer({ volunteer, updateResume, setForm }) {
	// setup the fields data
	const data = [
		{
			name: VOLUNTEER,
			payload: volunteer.map(
				({
					organization,
					position,
					website,
					startDate,
					endDate,
					summary,
					highlights
				}) => [
					{ name: ORGANIZATION, payload: organization },
					{ name: POSITION, payload: position },
					{ name: WEBSITE, payload: website },
					{ name: START_DATE, payload: startDate },
					{ name: END_DATE, payload: endDate },
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
			updateResume({
				volunteer: cvUtils.mapVolunteerFormToObject(form)
			}).then(() => {
				// unlock the form
				unlock();
			}),
		[updateResume]
	);

	return (
		<VolunteerContainer
			data={data}
			onSubmit={onSubmit}
			action="Modifier"
			setForm={setForm}
		>
			<CustomLink to={CVS}>Revenir à la liste des CVs</CustomLink>
		</VolunteerContainer>
	);
}

export default connect(null, mapDispatchToProps)(UpdateVolunteerContainer);
