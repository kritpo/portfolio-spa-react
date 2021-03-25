import { PropTypes } from 'prop-types';
import React, { useCallback, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import { updateResume } from '../../actions';
import * as cvUtils from '../../utils/cvUtils';
import { MAX_DATE } from '../../utils/forms/Field/DateField';
import languages from '../../utils/languages';
import WorkContainer, {
	COMPANY,
	END_DATE,
	HIGHLIGHT,
	HIGHLIGHTS,
	IS_INTERNSHIP,
	POSITION,
	START_DATE,
	SUMMARY,
	WEBSITE,
	WORK
} from '../CV/WorkContainer';

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
	// setup the mounting status checker hook
	let _isMounted = useRef(true);

	// auto unsubscribe
	useEffect(
		// config the willUnmount cleanup
		() => () => {
			_isMounted.current = false;
		},
		[]
	);

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
					{
						name: END_DATE,
						payload:
							endDate !== undefined ? new Date(endDate) : MAX_DATE
					},
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
					// check if the component is still mounted
					if (_isMounted.current) {
						// call setForm to change the update status to false
						setForm();
					}

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
		/>
	);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UpdateWorkContainer);
