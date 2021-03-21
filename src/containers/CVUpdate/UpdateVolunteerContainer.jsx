import { PropTypes } from 'prop-types';
import React, { useCallback } from 'react';
import { connect } from 'react-redux';

import { updateResume } from '../../actions';
import * as cvUtils from '../../utils/cvUtils';
import languages from '../../utils/languages';
import VolunteerContainer, {
	END_DATE,
	HIGHLIGHT,
	HIGHLIGHTS,
	ORGANIZATION,
	POSITION,
	START_DATE,
	SUMMARY,
	VOLUNTEER,
	WEBSITE
} from '../CV/VolunteerContainer';

// configure the states to pass as props to the component
const mapStateToProps = ({ language }, ...props) => ({
	language,
	...props
});

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
	setForm: PropTypes.func.isRequired,
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function UpdateVolunteerContainer({
	volunteer,
	updateResume,
	setForm,
	language: { systemLanguageCode }
}) {
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
			updateResume({
				volunteer: cvUtils.mapVolunteerFormToObject(form)
			}).then(() => {
				// call setForm to change the update status to false
				setForm();

				// unlock the form
				unlock();
			}),
		[setForm, updateResume]
	);

	return (
		<VolunteerContainer
			data={data}
			onSubmit={onSubmit}
			action={languages[systemLanguageCode].cvUpdate.action}
			setForm={setForm}
		/>
	);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UpdateVolunteerContainer);
