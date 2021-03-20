import { PropTypes } from 'prop-types';
import React, { useCallback } from 'react';
import { connect } from 'react-redux';

import { updateResume } from '../../actions';
import { CV_LIST } from '../../routes';
import CustomLink from '../../utils/CustomLink';
import * as cvUtils from '../../utils/cvUtils';
import languages from '../../utils/languages';
import WorkContainer, { COMPANY, END_DATE, HIGHLIGHT, HIGHLIGHTS, IS_INTERNSHIP, POSITION, START_DATE, SUMMARY, WEBSITE, WORK } from '../CV/WorkContainer';

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
	setForm: PropTypes.func.isRequired,
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function UpdateWorkContainer({
	work,
	updateResume,
	setForm,
	language: { systemLanguageCode }
}) {
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
			action={languages[systemLanguageCode].cvUpdate.action}
			setForm={setForm}
		>
			<CustomLink to={CV_LIST}>
				{languages[systemLanguageCode].cv.goToCVList}
			</CustomLink>
		</WorkContainer>
	);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UpdateWorkContainer);
