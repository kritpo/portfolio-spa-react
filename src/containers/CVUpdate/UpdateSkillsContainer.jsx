import { PropTypes } from 'prop-types';
import React, { useCallback } from 'react';
import { connect } from 'react-redux';

import { updateResume } from '../../actions';
import * as cvUtils from '../../utils/cvUtils';
import languages from '../../utils/languages';
import SkillsContainer, { LEVEL, NAME, SKILLS } from '../CV/SkillsContainer';

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
UpdateSkillsContainer.propTypes = {
	skills: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			level: PropTypes.string.isRequired
		})
	).isRequired,
	updateResume: PropTypes.func.isRequired,
	setForm: PropTypes.func.isRequired,
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function UpdateSkillsContainer({
	skills,
	updateResume,
	setForm,
	language: { systemLanguageCode }
}) {
	// setup the fields data
	const data = [
		{
			name: SKILLS,
			payload: skills.map(({ name, level }) => [
				{ name: NAME, payload: name },
				{ name: LEVEL, payload: level }
			])
		}
	];

	// setup the onSubmit callback
	const onSubmit = useCallback(
		(form, reCaptchaToken, unlock) =>
			updateResume({
				skills: cvUtils.mapSkillsFormToObject(form)
			}).then(() => {
				// call setForm to change the update status to false
				setForm();

				// unlock the form
				unlock();
			}),
		[setForm, updateResume]
	);

	return (
		<SkillsContainer
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
)(UpdateSkillsContainer);
