import React, { useCallback } from 'react';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';

import { CVS } from '../../routes';
import { updateResume } from '../../actions';
import * as cvUtils from '../../utils/cvUtils';

import SkillsContainer, { SKILLS, NAME, LEVEL } from '../CV/SkillsContainer';
import CustomLink from '../../utils/CustomLink';

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
	setForm: PropTypes.func.isRequired
};

function UpdateSkillsContainer({ skills, updateResume, setForm }) {
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
				// unlock the form
				unlock();
			}),
		[updateResume]
	);

	return (
		<SkillsContainer
			data={data}
			onSubmit={onSubmit}
			action="Modifier"
			setForm={setForm}
		>
			<CustomLink to={CVS}>Revenir à la liste des CVs</CustomLink>
		</SkillsContainer>
	);
}

export default connect(null, mapDispatchToProps)(UpdateSkillsContainer);
