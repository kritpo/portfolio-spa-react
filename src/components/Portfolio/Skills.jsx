import { PropTypes } from 'prop-types';
import React from 'react';

import { Box, Grid } from '@material-ui/core';

import HobbiesContainer from '../../containers/Portfolio/Skills/HobbiesContainer';
import LanguagesContainer from '../../containers/Portfolio/Skills/LanguagesContainer';
import SkillContainer from '../../containers/Portfolio/Skills/SkillContainer';

// configure the prop types validation
Skills.propTypes = {
	skills: PropTypes.arrayOf(PropTypes.object).isRequired,
	languages: PropTypes.arrayOf(PropTypes.object).isRequired,
	interests: PropTypes.arrayOf(PropTypes.object).isRequired
};

function Skills({ skills, languages, interests }) {
	return (
		<Box textAlign="center" clone>
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<SkillContainer skills={skills} />
				</Grid>
				<Grid item xs={12} md={6}>
					<LanguagesContainer languages={languages} />
				</Grid>
				<Grid item xs={12} md={6}>
					<HobbiesContainer interests={interests} />
				</Grid>
			</Grid>
		</Box>
	);
}

export default Skills;
